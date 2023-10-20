import React from "react";
import { Route } from "react-router-dom";
import { UserServiceItemsLoadingDialog } from "./userServiceItems-loading-dialog/UserServiceItemsLoadingDialog";
import { UserServiceItemDeleteDialog } from "./userServiceItem-delete-dialog/UserServiceItemDeleteDialog";
import { UserServiceItemsCard } from "./UserServiceItemsCard";
import { UserServiceItemsUIProvider } from "./UserServiceItemsUIContext";

export function UserServiceItemsPage({ history }) {
  const userServiceItemsUIEvents = {
    newUserServiceItemButtonClick: () => {
      history.push("/security/userServiceItems/new");
    },
    openEditUserServiceItemPage: (id) => {
      history.push(`/security/userServiceItems/${id}/edit`);
    },
    openDeleteUserServiceItemDialog: (id) => {
      history.push(`/security/userServiceItems/${id}/delete`);
    },
    openDeleteUserServiceItemsDialog: () => {
      history.push(`/security/userServiceItems/deleteUserServiceItems`);
    },
    openFetchUserServiceItemsDialog: () => {
      history.push(`/security/userServiceItems/fetch`);
    },
    openUpdateUserServiceItemsStatusDialog: () => {
      history.push("/security/userServiceItems/updateStatus");
    },
  };
  
  return (
    <UserServiceItemsUIProvider userServiceItemsUIEvents={userServiceItemsUIEvents}>
      <UserServiceItemsLoadingDialog />
      <Route path="/security/userServiceItems/:id/delete">
        {({ history, match }) => (
          <UserServiceItemDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/security/userServiceItems");
            }}
          />
        )}
      </Route>
      <UserServiceItemsCard />
    </UserServiceItemsUIProvider>
  );
}