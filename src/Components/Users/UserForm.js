import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as api from "./usersApi";

function UserForm({ user, setisEditing }) {
  const [fields, setFields] = useState({ ...user });

  // query client to update cache and invalidate query to fetch the data again..
  const queryClient = useQueryClient();

  // for updating user details
  const { isLoading: isLoadingDuringUpdate, mutate } = useMutation(
    api.updateUser,
    {
      // Optimistic update i.e. update will happen as soon as user save the data, no server fetching instead get it from cache which is faster

      // updateduser param coming from mutate(fields) function
      onMutate: (updatedUser) => {
        queryClient.setQueryData(["user", user.id], updatedUser);

        // Toggle edit and cancel button
        setisEditing(false);
      },

      onSuccess: (data) => {
        console.log({ data });
        queryClient.invalidateQueries(["user", user.id]);
      },
    }
  );

  // syncing props with state
  useEffect(() => {
    setFields({ ...user });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(fields);
  };

  if (isLoadingDuringUpdate) {
    return "Saving your changes";
  }

  return (
    <div style={{ paddingTop: 20 }}>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            type="text"
            value={fields.name}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "20px" }}
          ></input>
        </label>

        <label>
          Details:{" "}
          <textarea
            name="details"
            type="text"
            value={fields.details}
            onChange={handleChange}
            style={{ width: "100%", height: 100 }}
          ></textarea>
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UserForm;
