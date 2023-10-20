import React from "react";
import { Route } from "react-router-dom";
import { HomeStatusesLoadingDialog } from "./homeStatuses-loading-dialog/HomeStatusesLoadingDialog";
import { HomeStatusDeleteDialog } from "./homeStatus-delete-dialog/HomeStatusDeleteDialog";
import { HomeStatusesCard } from "./HomeStatusesCard";
import { HomeStatusesUIProvider } from "./HomeStatusesUIContext";

export function HomeStatusesPage({ history }) {
  const homeStatusesUIEvents = {
    newHomeStatusButtonClick: () => {
      history.push("/employment/homeStatuses/new");
    },
    openEditHomeStatusPage: (id) => {
      history.push(`/employment/homeStatuses/${id}/edit`);
    },
    openDeleteHomeStatusDialog: (id) => {
      history.push(`/employment/homeStatuses/${id}/delete`);
    },
    openDeleteHomeStatusesDialog: () => {
      history.push(`/employment/homeStatuses/deleteHomeStatuses`);
    },
    openFetchHomeStatusesDialog: () => {
      history.push(`/employment/homeStatuses/fetch`);
    },
    openUpdateHomeStatusesStatusDialog: () => {
      history.push("/employment/homeStatuses/updateStatus");
    },
  };
  
  return (
    <HomeStatusesUIProvider homeStatusesUIEvents={homeStatusesUIEvents}>
      <HomeStatusesLoadingDialog />
      <Route path="/employment/homeStatuses/:id/delete">
        {({ history, match }) => (
          <HomeStatusDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/homeStatuses");
            }}
          />
        )}
      </Route>
      <HomeStatusesCard />
    </HomeStatusesUIProvider>
  );
}