import React from "react";
import { Route } from "react-router-dom";
import { RolePermissionsesLoadingDialog } from "./rolePermissionses-loading-dialog/RolePermissionsesLoadingDialog";
import { RolePermissionsDeleteDialog } from "./rolePermissions-delete-dialog/RolePermissionsDeleteDialog";
import { RolePermissionsesCard } from "./RolePermissionsesCard";
import { RolePermissionsesUIProvider } from "./RolePermissionsesUIContext";

export function RolePermissionsesPage({ history }) {
  const rolePermissionsesUIEvents = {
    newRolePermissionsButtonClick: () => {
      history.push("/security/rolePermissionses/new");
    },
    openEditRolePermissionsPage: (id) => {
      history.push(`/security/rolePermissionses/${id}/edit`);
    },
    openDeleteRolePermissionsDialog: (id) => {
      history.push(`/security/rolePermissionses/${id}/delete`);
    },
    openDeleteRolePermissionsesDialog: () => {
      history.push(`/security/rolePermissionses/deleteRolePermissionses`);
    },
    openFetchRolePermissionsesDialog: () => {
      history.push(`/security/rolePermissionses/fetch`);
    },
    openUpdateRolePermissionsesStatusDialog: () => {
      history.push("/security/rolePermissionses/updateStatus");
    },
  };

  return (
    <RolePermissionsesUIProvider
      rolePermissionsesUIEvents={rolePermissionsesUIEvents}
    >
      <RolePermissionsesLoadingDialog />
      <Route path="/security/rolePermissionses/:id/delete">
        {({ history, match }) => (
          <RolePermissionsDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/security/rolePermissionses");
            }}
          />
        )}
      </Route>
      <RolePermissionsesCard />
    </RolePermissionsesUIProvider>
  );
}
