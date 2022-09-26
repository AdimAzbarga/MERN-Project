import React, { useState, useContext } from "react";

import Map from "../../shared/componants/UIElements/Map";
import Modal from "../../shared/componants/UIElements/Modal";
import Button from "../../shared/componants/FormElements/Button";
import Card from "../../shared/componants/UIElements/Card";
import ErrorModal from "../../shared/componants/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/componants/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { LoginContext } from "../../shared/context/LoginContext";
import "./PlaceItem.css";

//show map
const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const { isLoading, isError, sendRequest, deleteError } = useHttpClient();
  const auth = useContext(LoginContext);

  const showMapHandler = () => {
    setShowMap(true);
  };
  const hideMapHandler = () => {
    setShowMap(false);
  };

  //show delete werning modal
  const [showConfirmModal, setConfirmModal] = useState(false);

  const showDeletwWrningHandler = () => {
    setConfirmModal(true);
  };
  const hideDeletwWrningHandler = () => {
    setConfirmModal(false);
  };

  const confirmDeleteHandel = async () => {
    setConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`,
        "DELETE"
      );
      await props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={deleteError} />
      <Modal
        show={showMap}
        onCancel={hideMapHandler}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        header={props.address}
        footer={<Button onClick={hideMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={hideDeletwWrningHandler}
        header="ARE YOU SURE?"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={hideDeletwWrningHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandel}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to delete this place ? Please notr that it can't be undone
          thereafter.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={showMapHandler}>
              View On Map
            </Button>
            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>Edit</Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeletwWrningHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
