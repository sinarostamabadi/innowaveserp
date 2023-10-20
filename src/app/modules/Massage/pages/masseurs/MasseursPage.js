import React from "react";
import { Route } from "react-router-dom";
import { MasseursLoadingDialog } from "./masseurs-loading-dialog/MasseursLoadingDialog";
import { MasseurDeleteDialog } from "./masseur-delete-dialog/MasseurDeleteDialog";
import { MasseursCard } from "./MasseursCard";
import { MasseursUIProvider } from "./MasseursUIContext";

export function MasseursPage({ history }) {
  const masseursUIEvents = {
    newMasseurButtonClick: () => {
      history.push("/massage/masseurs/new");
    },
    openEditMasseurPage: (id) => {
      history.push(`/massage/masseurs/${id}/edit`);
    },
    openDeleteMasseurDialog: (id) => {
      history.push(`/massage/masseurs/${id}/delete`);
    },
    openDeleteMasseursDialog: () => {
      history.push(`/massage/masseurs/deleteMasseurs`);
    },
    openFetchMasseursDialog: () => {
      history.push(`/massage/masseurs/fetch`);
    },
    openUpdateMasseursStatusDialog: () => {
      history.push("/massage/masseurs/updateStatus");
    },
  };
  
  return (
    <MasseursUIProvider masseursUIEvents={masseursUIEvents}>
      <MasseursLoadingDialog />
      <Route path="/massage/masseurs/:id/delete">
        {({ history, match }) => (
          <MasseurDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/massage/masseurs");
            }}
          />
        )}
      </Route>
      <MasseursCard />
    </MasseursUIProvider>
  );
}