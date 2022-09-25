import React from "react";

import Button from "../../shared/componants/FormElements/Button";
import Card from "../../shared/componants/UIElements/Card";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => {
        return (
          <PlaceItem
            key={place.id}
            id={place._id}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creatorId}
            coordinates={place.location}
            onDelete={props.onDelete}
          />
        );
      })}
    </ul>
  );
};

export default PlaceList;
