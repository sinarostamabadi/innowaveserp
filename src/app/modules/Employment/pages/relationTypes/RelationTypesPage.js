import React from "react";
import { Route } from "react-router-dom";
import { RelationTypesLoadingDialog } from "./relationTypes-loading-dialog/RelationTypesLoadingDialog";
import { RelationTypeDeleteDialog } from "./relationType-delete-dialog/RelationTypeDeleteDialog";
import { RelationTypesCard } from "./RelationTypesCard";
import { RelationTypesUIProvider } from "./RelationTypesUIContext";

export function RelationTypesPage({ history }) {
  const relationTypesUIEvents = {
    newRelationTypeButtonClick: () => {
      history.push("/employment/relationTypes/new");
    },
    openEditRelationTypePage: (id) => {
      history.push(`/employment/relationTypes/${id}/edit`);
    },
    openDeleteRelationTypeDialog: (id) => {
      history.push(`/employment/relationTypes/${id}/delete`);
    },
    openDeleteRelationTypesDialog: () => {
      history.push(`/employment/relationTypes/deleteRelationTypes`);
    },
    openFetchRelationTypesDialog: () => {
      history.push(`/employment/relationTypes/fetch`);
    },
    openUpdateRelationTypesStatusDialog: () => {
      history.push("/employment/relationTypes/updateStatus");
    },
  };

  return (
    <RelationTypesUIProvider relationTypesUIEvents={relationTypesUIEvents}>
      <RelationTypesLoadingDialog />
      <Route path="/employment/relationTypes/:id/delete">
        {({ history, match }) => (
          <RelationTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/relationTypes");
            }}
          />
        )}
      </Route>
      <RelationTypesCard />
    </RelationTypesUIProvider>
  );
}
