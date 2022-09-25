import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/componants/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/componants/UIElements/LoadingSpinner";
import { useParams } from "react-router-dom";
import PlaceList from "../componants/PlaceList";

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, isError, deleteError, sendRequest } = useHttpClient();
  
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedId) => {
    console.log(loadedPlaces);
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((p) => {
        console.log(prevPlaces);
        return p._id !== deletedId;
      })
    );
    console.log(loadedPlaces);
    console.log(deletedId);
  };

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={deleteError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDelete={placeDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
