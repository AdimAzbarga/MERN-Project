import React, { useEffect, useState } from "react";
import UserList from "../componants/UserList";
import LoadingSpinner from "../../shared/componants/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/componants/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
const Users = () => {
  const { isLoading, isError, sendRequest, deleteError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={deleteError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
