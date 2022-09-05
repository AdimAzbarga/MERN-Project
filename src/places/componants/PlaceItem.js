import React, { useState } from "react";

import Map from "../../shared/componants/UIElements/Map";
import Modal from "../../shared/componants/UIElements/Modal";
import Button from "../../shared/componants/FormElements/Button";
import Card from "../../shared/componants/UIElements/Card";
import "./PlaceItem.css";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);

  const showMapHandler = () => {
    setShowMap(true);
  };
  const hideMapHandler = () => {
    setShowMap(false);
  };

  return (
    <React.Fragment>
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
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
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
            <Button to={`/places/${props.id}`}>Edit</Button>
            <Button danger>Delete</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
