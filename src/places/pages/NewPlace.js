import React, { useCallback, useReducer } from "react";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/componants/FormElements/Button";
import Input from "../../shared/componants/FormElements/Input";
import "./NewPlace.css";

const changeReduser = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(changeReduser, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });
  const InputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const placeSubminHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); //send this later to the backend !!!
  };

  return (
    <form className="place-form" onSubmit={placeSubminHandler}>
      <Input
        id="title"
        onInput={InputHandler}
        element="input"
        label="Title"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please ENTER a valid title,"
      />

      <Input
        id="description"
        onInput={InputHandler}
        element="textarea"
        label="Description"
        type="text"
        validators={[VALIDATOR_MINLENGTH(7)]}
        errorText="Please ENTER a valid descripeion (at least 7 characters)."
      />
      <Input
        id="address"
        onInput={InputHandler}
        element="input"
        label="Address"
        type="text"
        validators={[VALIDATOR_REQUIRE]}
        errorText="Please ENTER a valid address."
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
