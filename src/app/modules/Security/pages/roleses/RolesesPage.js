import React from "react";
import { Route } from "react-router-dom";
import { RolesesLoadingDialog } from "./roleses-loading-dialog/RolesesLoadingDialog";
import { RolesDeleteDialog } from "./roles-delete-dialog/RolesDeleteDialog";
import { RolesesCard } from "./RolesesCard";
import { RolesesUIProvider } from "./RolesesUIContext";

export function RolesesPage({ history }) {
  const rolesesUIEvents = {
    newRolesButtonClick: () => {
      history.push("/security/roleses/new");
    },
    openEditRolesPage: (id) => {
      history.push(`/security/roleses/${id}/edit`);
    },
    openDeleteRolesDialog: (id) => {
      history.push(`/security/roleses/${id}/delete`);
    },
    openDeleteRolesesDialog: () => {
      history.push(`/security/roleses/deleteRoleses`);
    },
    openFetchRolesesDialog: () => {
      history.push(`/security/roleses/fetch`);
    },
    openUpdateRolesesStatusDialog: () => {
      history.push("/security/roleses/updateStatus");
    },
  };

  return (
    <RolesesUIProvider rolesesUIEvents={rolesesUIEvents}>
      <RolesesLoadingDialog />
      <Route path="/security/roleses/:id/delete">
        {({ history, match }) => (
          <RolesDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/security/roleses");
            }}
          />
        )}
      </Route>
      <RolesesCard />
    </RolesesUIProvider>
  );
}
