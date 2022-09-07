import React from "react";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/componants/FormElements/Button";
import Input from "../../shared/componants/FormElements/Input";
import "./Pform.css";

const NewPlace = () => {
  const [formState, InputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

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
        errorText="Please ENTER a valid title."
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
