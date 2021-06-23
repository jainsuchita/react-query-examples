import React, { useState } from "react";
import { useQuery } from "react-query";
import * as api from "./usersApi";
import UserForm from "./UserForm";

const User = ({ id }) => {
  const [isEditing, setisEditing] = useState(false);

  const {
    data: user,
    isLoading,
    isError,
    isFetching,
  } = useQuery(["user", id], () => api.getUser(id), {
    enabled: Boolean(id),
  });

  if (isLoading) return "Loading user...";
  if (isError) return "Something went wrong";

  return (
    <div className="user-details">
      {!id && "Select a User"}
      {id && (
        <>
          <button onClick={() => setisEditing((e) => !e)}>
            {isEditing ? "Cancel" : "Edit"}
          </button>

          {isEditing ? (
            <UserForm user={user} setisEditing={setisEditing} />
          ) : (
            <>
              <p>{user.name}</p>
              <p>{user.details}</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default User;
