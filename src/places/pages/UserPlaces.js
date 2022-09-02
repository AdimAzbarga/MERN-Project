import React from "react";

import { useParams } from "react-router-dom";
import PlaceList from "../componants/PlaceList";

const PLACES = [
  {
    id: "p1",
    image: "https://media.timeout.com/images/101705309/image.jpg",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world -.-",
    address: " 20 w 34th St , New York , NY 10001",
    creatorId: "u1",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
  },
  {
    id: "p2",
    image:
      "https://www.findingtheuniverse.com/wp-content/uploads/2020/07/Empire-State-Building-view-from-uptown_by_Laurence-Norah-2.jpg",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    address: " 20 w 34th St , New York , NY 10001",
    creatorId: "u2",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
  },
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const filterlist = PLACES.filter((place) => place.creatorId == userId);
  return <PlaceList items={filterlist} />;
};

export default UserPlaces;
