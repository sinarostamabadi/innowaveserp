import React from "react";
import { Route } from "react-router-dom";
import { SoldiershipTypesLoadingDialog } from "./soldiershipTypes-loading-dialog/SoldiershipTypesLoadingDialog";
import { SoldiershipTypeDeleteDialog } from "./soldiershipType-delete-dialog/SoldiershipTypeDeleteDialog";
import { SoldiershipTypesCard } from "./SoldiershipTypesCard";
import { SoldiershipTypesUIProvider } from "./SoldiershipTypesUIContext";

export function SoldiershipTypesPage({ history }) {
  const soldiershipTypesUIEvents = {
    newSoldiershipTypeButtonClick: () => {
      history.push("/employment/soldiershipTypes/new");
    },
    openEditSoldiershipTypePage: (id) => {
      history.push(`/employment/soldiershipTypes/${id}/edit`);
    },
    openDeleteSoldiershipTypeDialog: (id) => {
      history.push(`/employment/soldiershipTypes/${id}/delete`);
    },
    openDeleteSoldiershipTypesDialog: () => {
      history.push(`/employment/soldiershipTypes/deleteSoldiershipTypes`);
    },
    openFetchSoldiershipTypesDialog: () => {
      history.push(`/employment/soldiershipTypes/fetch`);
    },
    openUpdateSoldiershipTypesStatusDialog: () => {
      history.push("/employment/soldiershipTypes/updateStatus");
    },
  };

  return (
    <SoldiershipTypesUIProvider
      soldiershipTypesUIEvents={soldiershipTypesUIEvents}
    >
      <SoldiershipTypesLoadingDialog />
      <Route path="/employment/soldiershipTypes/:id/delete">
        {({ history, match }) => (
          <SoldiershipTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/soldiershipTypes");
            }}
          />
        )}
      </Route>
      <SoldiershipTypesCard />
    </SoldiershipTypesUIProvider>
  );
}
