import React, { useContext, useState } from "react";

import Card from "../../shared/componants/UIElements/Card";
import Input from "../../shared/componants/FormElements/Input";
import Button from "../../shared/componants/FormElements/Button";
import LoadingSpinner from "../../shared/componants/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/componants/UIElements/ErrorModal";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { LoginContext } from "../../shared/context/LoginContext";
import "./Authenticate.css";

const Authenticate = () => {
  const auth = useContext(LoginContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const switchLoginMode = () => {
    if (!isLoginMode) {
      setFormData(
        {
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.Login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setIsError(err.message);
      }
    } else {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.Login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setIsError(err.message);
      }
    }
  };

  const errorHandler =()=>{
    setIsError(null);
  }

  return (
    <React.Fragment>

   <ErrorModal error ={isError} onClear={errorHandler}/>
    <Card className="authentication">
      {isLoading && <LoadingSpinner asOverlay />}
      <h2>{isLoginMode ? "Login Required" : "Register Required"}</h2>
      <hr />

      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="User Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a UserName."
            onInput={inputHandler}
          />
        )}

        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "Login" : "Signup"}
        </Button>
      </form>
      <p>Don't have an account?</p>
      <Button type="submit" inverse onClick={switchLoginMode}>
        {isLoginMode ? "REGISTER" : "LOGIN"}
      </Button>
    </Card>
    </React.Fragment>
  );
};

export default Authenticate;
