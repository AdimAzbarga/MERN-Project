import React, { useContext, useState } from "react";

import Card from "../../shared/componants/UIElements/Card";
import Input from "../../shared/componants/FormElements/Input";
import Button from "../../shared/componants/FormElements/Button";
import LoadingSpinner from "../../shared/componants/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/componants/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { LoginContext } from "../../shared/context/LoginContext";
import UploadImage from "../../shared/componants/FormElements/UploadImage";
import "./Authenticate.css";

const Authenticate = () => {
  const auth = useContext(LoginContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, isError, sendRequest, deleteError } = useHttpClient();
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
          image: undefined,
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
          image: {
            value: null,
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
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.Login(responseData.user.id, responseData.user.name);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData(); //browser api
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          formData
        );

        auth.Login(responseData.user.id, responseData.user.name);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={deleteError} />
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
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <UploadImage
              center
              id="image"
              onInput={inputHandler}
              errorText="Please provide an image. "
            />
          )}
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
