import React from "react";
import { Route } from "react-router-dom";
import { MassageCentersLoadingDialog } from "./massageCenters-loading-dialog/MassageCentersLoadingDialog";
import { MassageCenterDeleteDialog } from "./massageCenter-delete-dialog/MassageCenterDeleteDialog";
import { MassageCentersCard } from "./MassageCentersCard";
import { MassageCentersUIProvider } from "./MassageCentersUIContext";

export function MassageCentersPage({ history }) {
  const massageCentersUIEvents = {
    newMassageCenterButtonClick: () => {
      history.push("/massage/massageCenters/new");
    },
    openEditMassageCenterPage: (id) => {
      history.push(`/massage/massageCenters/${id}/edit`);
    },
    openDeleteMassageCenterDialog: (id) => {
      history.push(`/massage/massageCenters/${id}/delete`);
    },
    openDeleteMassageCentersDialog: () => {
      history.push(`/massage/massageCenters/deleteMassageCenters`);
    },
    openFetchMassageCentersDialog: () => {
      history.push(`/massage/massageCenters/fetch`);
    },
    openUpdateMassageCentersStatusDialog: () => {
      history.push("/massage/massageCenters/updateStatus");
    },
  };
  
  return (
    <MassageCentersUIProvider massageCentersUIEvents={massageCentersUIEvents}>
      <MassageCentersLoadingDialog />
      <Route path="/massage/massageCenters/:id/delete">
        {({ history, match }) => (
          <MassageCenterDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/massage/massageCenters");
            }}
          />
        )}
      </Route>
      <MassageCentersCard />
    </MassageCentersUIProvider>
  );
}