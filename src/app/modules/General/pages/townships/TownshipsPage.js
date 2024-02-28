import React from "react";
import { Route } from "react-router-dom";
import { TownshipsLoadingDialog } from "./townships-loading-dialog/TownshipsLoadingDialog";
import { TownshipDeleteDialog } from "./township-delete-dialog/TownshipDeleteDialog";
import { TownshipsCard } from "./TownshipsCard";
import { TownshipsUIProvider } from "./TownshipsUIContext";

export function TownshipsPage({ history }) {
  const townshipsUIEvents = {
    newTownshipButtonClick: () => {
      history.push("/general/townships/new");
    },
    openEditTownshipPage: (id) => {
      history.push(`/general/townships/${id}/edit`);
    },
    openDeleteTownshipDialog: (id) => {
      history.push(`/general/townships/${id}/delete`);
    },
    openDeleteTownshipsDialog: () => {
      history.push(`/general/townships/deleteTownships`);
    },
    openFetchTownshipsDialog: () => {
      history.push(`/general/townships/fetch`);
    },
    openUpdateTownshipsStatusDialog: () => {
      history.push("/general/townships/updateStatus");
    },
  };

  return (
    <TownshipsUIProvider townshipsUIEvents={townshipsUIEvents}>
      <TownshipsLoadingDialog />
      <Route path="/general/townships/:id/delete">
        {({ history, match }) => (
          <TownshipDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/townships");
            }}
          />
        )}
      </Route>
      <TownshipsCard />
    </TownshipsUIProvider>
  );
}
