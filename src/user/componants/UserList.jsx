import React from "react";
import UserItem from "./UserItem";
import Card from "../../shared/componants/UIElements/Card";
import "./UserList.css"


const UserList = (props) => {
  if (props.items.length === 0) {
    return (
      <Card className="center">
        <hs>no such users</hs>
      </Card>
    );
  }
  return (
    <ul className="users-list">
      {props.items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            name={user.name}
            place={user.places.length}
            image={user.image}
          />
        );
      })}
    </ul>
  );
};

export default UserList;
