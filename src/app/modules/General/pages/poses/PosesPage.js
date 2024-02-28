import React from "react";
import { Route } from "react-router-dom";
import { PosesLoadingDialog } from "./poses-loading-dialog/PosesLoadingDialog";
import { PosDeleteDialog } from "./pos-delete-dialog/PosDeleteDialog";
import { PosesCard } from "./PosesCard";
import { PosesUIProvider } from "./PosesUIContext";

export function PosesPage({ history }) {
  const posesUIEvents = {
    newPosButtonClick: () => {
      history.push("/general/poses/new");
    },
    openEditPosPage: (id) => {
      history.push(`/general/poses/${id}/edit`);
    },
    openDeletePosDialog: (id) => {
      history.push(`/general/poses/${id}/delete`);
    },
    openDeletePosesDialog: () => {
      history.push(`/general/poses/deletePoses`);
    },
    openFetchPosesDialog: () => {
      history.push(`/general/poses/fetch`);
    },
    openUpdatePosesStatusDialog: () => {
      history.push("/general/poses/updateStatus");
    },
  };

  return (
    <PosesUIProvider posesUIEvents={posesUIEvents}>
      <PosesLoadingDialog />
      <Route path="/general/poses/:id/delete">
        {({ history, match }) => (
          <PosDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/poses");
            }}
          />
        )}
      </Route>
      <PosesCard />
    </PosesUIProvider>
  );
}
