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
import UploadImage from "../../shared/componants/FormElements/UploadImage";
import "./Pform.css";

const NewPlace = () => {
  const auth = useContext(LoginContext);
  const { isLoading, isError, sendRequest, deleteError } = useHttpClient();
  const [isClicked, setIsClick] = useState(false);
  const [isDesClicked, setIsClicked] = useState(false);
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
      address: {
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

  const history = useHistory();

  const placeSubminHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      formData.append("creator", auth.userId);
      await sendRequest("http://localhost:5000/api/places", "POST", formData);
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
            onClick={DesClickeHandler}
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
        {isClicked && (
          <UploadImage
            center
            id="image"
            onInput={InputHandler}
            errorText="Please provide an image"
          />
        )}
        <Button type="submit" disabled={!formState.isValid}>
          POST
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
