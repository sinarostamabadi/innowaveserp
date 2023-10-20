import React from "react";
import { Route } from "react-router-dom";
import { UserInRolesesLoadingDialog } from "./userInRoleses-loading-dialog/UserInRolesesLoadingDialog";
import { UserInRolesDeleteDialog } from "./userInRoles-delete-dialog/UserInRolesDeleteDialog";
import { UserInRolesesCard } from "./UserInRolesesCard";
import { UserInRolesesUIProvider } from "./UserInRolesesUIContext";

export function UserInRolesesPage({ history }) {
  const userInRolesesUIEvents = {
    newUserInRolesButtonClick: () => {
      history.push("/security/userInRoleses/new");
    },
    openEditUserInRolesPage: (id) => {
      history.push(`/security/userInRoleses/${id}/edit`);
    },
    openDeleteUserInRolesDialog: (id) => {
      history.push(`/security/userInRoleses/${id}/delete`);
    },
    openDeleteUserInRolesesDialog: () => {
      history.push(`/security/userInRoleses/deleteUserInRoleses`);
    },
    openFetchUserInRolesesDialog: () => {
      history.push(`/security/userInRoleses/fetch`);
    },
    openUpdateUserInRolesesStatusDialog: () => {
      history.push("/security/userInRoleses/updateStatus");
    },
  };
  
  return (
    <UserInRolesesUIProvider userInRolesesUIEvents={userInRolesesUIEvents}>
      <UserInRolesesLoadingDialog />
      <Route path="/security/userInRoleses/:id/delete">
        {({ history, match }) => (
          <UserInRolesDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/security/userInRoleses");
            }}
          />
        )}
      </Route>
      <UserInRolesesCard />
    </UserInRolesesUIProvider>
  );
}