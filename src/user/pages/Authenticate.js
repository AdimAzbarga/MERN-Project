import React, { useContext, useState } from "react";

import Card from "../../shared/componants/UIElements/Card";
import Input from "../../shared/componants/FormElements/Input";
import Button from "../../shared/componants/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { LoginContext } from "../../shared/context/LoginContext";
import "./Authenticate.css";

const Login = () => {
  const auth = useContext(LoginContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
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

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.Login();
  };

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

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
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
        <p>Don't have an account?</p>
        <Button type="submit" inverse onClick={switchLoginMode}>
          {isLoginMode ? "REGISTER" : "LOGIN"}
        </Button>
      </form>
    </Card>
  );
};

export default Login;
