import React from "react";
import { Route } from "react-router-dom";
import { RealPersonsLoadingDialog } from "./realPersons-loading-dialog/RealPersonsLoadingDialog";
import { RealPersonDeleteDialog } from "./realPerson-delete-dialog/RealPersonDeleteDialog";
import { RealPersonsCard } from "./RealPersonsCard";
import { RealPersonsUIProvider } from "./RealPersonsUIContext";

export function RealPersonsPage({ history }) {
  const realPersonsUIEvents = {
    newRealPersonButtonClick: () => {
      history.push("/core/realPersons/new");
    },
    openEditRealPersonPage: (id) => {
      history.push(`/core/realPersons/${id}/edit`);
    },
    openDeleteRealPersonDialog: (id) => {
      history.push(`/core/realPersons/${id}/delete`);
    },
    openDeleteRealPersonsDialog: () => {
      history.push(`/core/realPersons/deleteRealPersons`);
    },
    openFetchRealPersonsDialog: () => {
      history.push(`/core/realPersons/fetch`);
    },
    openUpdateRealPersonsStatusDialog: () => {
      history.push("/core/realPersons/updateStatus");
    },
  };

  return (
    <RealPersonsUIProvider realPersonsUIEvents={realPersonsUIEvents}>
      <RealPersonsLoadingDialog />
      <Route path="/core/realPersons/:id/delete">
        {({ history, match }) => (
          <RealPersonDeleteDialog  
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/core/realPersons");
            }}
          />
        )}
      </Route>
      <RealPersonsCard />
    </RealPersonsUIProvider>
  );
}
