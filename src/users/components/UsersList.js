import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElement/Card";

import "./UsersList.css";

const UsersList = (props) => {
  if (props.item.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Users!</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {props.item.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places.length}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
