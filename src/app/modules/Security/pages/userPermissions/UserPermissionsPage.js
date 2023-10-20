import React from "react";
import { Route } from "react-router-dom";
import { UserPermissionsLoadingDialog } from "./userPermissions-loading-dialog/UserPermissionsLoadingDialog";
import { UserPermissionDeleteDialog } from "./userPermission-delete-dialog/UserPermissionDeleteDialog";
import { UserPermissionsCard } from "./UserPermissionsCard";
import { UserPermissionsUIProvider } from "./UserPermissionsUIContext";

export function UserPermissionsPage({ history }) {
  const userPermissionsUIEvents = {
    newUserPermissionButtonClick: () => {
      history.push("/security/userPermissions/new");
    },
    openEditUserPermissionPage: (id) => {
      history.push(`/security/userPermissions/${id}/edit`);
    },
    openDeleteUserPermissionDialog: (id) => {
      history.push(`/security/userPermissions/${id}/delete`);
    },
    openDeleteUserPermissionsDialog: () => {
      history.push(`/security/userPermissions/deleteUserPermissions`);
    },
    openFetchUserPermissionsDialog: () => {
      history.push(`/security/userPermissions/fetch`);
    },
    openUpdateUserPermissionsStatusDialog: () => {
      history.push("/security/userPermissions/updateStatus");
    },
  };
  
  return (
    <UserPermissionsUIProvider userPermissionsUIEvents={userPermissionsUIEvents}>
      <UserPermissionsLoadingDialog />
      <Route path="/security/userPermissions/:id/delete">
        {({ history, match }) => (
          <UserPermissionDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/security/userPermissions");
            }}
          />
        )}
      </Route>
      <UserPermissionsCard />
    </UserPermissionsUIProvider>
  );
}