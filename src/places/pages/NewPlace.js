import React, { useContext, useState } from "react";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/componants/FormElements/Button";
import Input from "../../shared/componants/FormElements/Input";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/componants/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/componants/UIElements/ErrorModal";
import { LoginContext } from "../../shared/context/LoginContext";
import { useHistory } from "react-router-dom";
import "./Pform.css";

const NewPlace = () => {
  const auth = useContext(LoginContext);
  const { isLoading, isError, sendRequest, deleteError } = useHttpClient();
  const [isClicked, setIsClick] = useState(false);
  const [isDesClicked , setIsClicked]=useState(false);
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

  const history = useHistory();

  const placeSubminHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push(`/${auth.userId}/places`);
    } catch (err) {}
  };

  const ClickedHandler = () => {
    setIsClick(true);
  };
  const DesClickeHandler = () => {
    setIsClicked(true);
  };


  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={deleteError} />
      <form className="place-form" onSubmit={placeSubminHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        {isClicked && (
          <Input
            id="title"
            onInput={InputHandler}
            element="input"
            //label="Title"
            type="text"
            placeholder="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please ENTER a valid title."
          />
        )}

        {isClicked && (
          <Input
            id="description"
            onClick ={DesClickeHandler}
            onInput={InputHandler}
            element="textarea"
            //label="Description"
            placeholder="Add a Description..."
            rows={isDesClicked ? 3 : 1}
            type="text"
            validators={[VALIDATOR_MINLENGTH(7)]}
            errorText="Please ENTER a valid descripeion (at least 7 characters)."
          />
        )}
        <Input
          id="address"
          onInput={InputHandler}
          element="input"
          //label="Address"
          placeholder="Share an address"
          onClick={ClickedHandler}
          type="text"
          validators={[VALIDATOR_REQUIRE]}
          errorText="Please ENTER a valid address."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
