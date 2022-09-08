import React from "react";
import UserList from "../componants/UserList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Moana",
      image:
        "https://cdn.vox-cdn.com/thumbor/hg2HVKjv7THSbdHc71PoNJJNnnY=/0x0:1920x800/920x613/filters:focal(506x118:812x424):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/52005641/MoanaPortrait.0.jpeg",
      place: "3",
    },
  ];
  return <UserList items={USERS} />;
};

export default Users;
