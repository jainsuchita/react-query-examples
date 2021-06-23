import React from "react";
import { useQuery } from "react-query";
import * as api from "./usersApi";

const Users = ({ setUserId }) => {
  const { data: users, isLoading, isError } = useQuery("users", api.getUsers);

  if (isLoading) return "Loading...";
  if (isError) return "Error in fetching";

  return (
    <ul className={"user-list"}>
      {users?.map((user) => (
        <div className="user-button">
          <li key={user.id}>{user.name}</li>
          <button onClick={() => setUserId(user.id)}>View</button>
        </div>
      ))}
    </ul>
  );
};

export default Users;
