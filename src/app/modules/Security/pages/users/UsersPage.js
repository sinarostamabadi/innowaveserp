import React from "react";
import { Route } from "react-router-dom";
import { UsersLoadingDialog } from "./users-loading-dialog/UsersLoadingDialog";
import { UserDeleteDialog } from "./user-delete-dialog/UserDeleteDialog";
import { UsersCard } from "./UsersCard";
import { UsersUIProvider } from "./UsersUIContext";

export function UsersPage({ history }) {
  const usersUIEvents = {
    newUserButtonClick: () => {
      history.push("/security/users/new");
    },
    openEditUserPage: (id) => {
      history.push(`/security/users/${id}/edit`);
    },
    openDeleteUserDialog: (id) => {
      history.push(`/security/users/${id}/delete`);
    },
    openDeleteUsersDialog: () => {
      history.push(`/security/users/deleteUsers`);
    },
    openFetchUsersDialog: () => {
      history.push(`/security/users/fetch`);
    },
    openUpdateUsersStatusDialog: () => {
      history.push("/security/users/updateStatus");
    },
  };
  
  return (
    <UsersUIProvider usersUIEvents={usersUIEvents}>
      <UsersLoadingDialog />
      <Route path="/security/users/:id/delete">
        {({ history, match }) => (
          <UserDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/security/users");
            }}
          />
        )}
      </Route>
      <UsersCard />
    </UsersUIProvider>
  );
}