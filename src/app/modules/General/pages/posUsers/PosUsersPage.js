import React from "react";
import { Route } from "react-router-dom";
import { PosUsersLoadingDialog } from "./posUsers-loading-dialog/PosUsersLoadingDialog";
import { PosUserDeleteDialog } from "./posUser-delete-dialog/PosUserDeleteDialog";
import { PosUsersCard } from "./PosUsersCard";
import { PosUsersUIProvider } from "./PosUsersUIContext";

export function PosUsersPage({ history }) {
  const posUsersUIEvents = {
    newPosUserButtonClick: () => {
      history.push("/general/posUsers/new");
    },
    openEditPosUserPage: (id) => {
      history.push(`/general/posUsers/${id}/edit`);
    },
    openDeletePosUserDialog: (id) => {
      history.push(`/general/posUsers/${id}/delete`);
    },
    openDeletePosUsersDialog: () => {
      history.push(`/general/posUsers/deletePosUsers`);
    },
    openFetchPosUsersDialog: () => {
      history.push(`/general/posUsers/fetch`);
    },
    openUpdatePosUsersStatusDialog: () => {
      history.push("/general/posUsers/updateStatus");
    },
  };
  
  return (
    <PosUsersUIProvider posUsersUIEvents={posUsersUIEvents}>
      <PosUsersLoadingDialog />
      <Route path="/general/posUsers/:id/delete">
        {({ history, match }) => (
          <PosUserDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/posUsers");
            }}
          />
        )}
      </Route>
      <PosUsersCard />
    </PosUsersUIProvider>
  );
}