import React from "react";
import { Route } from "react-router-dom";
import { BodyBuildingAccountTypesLoadingDialog } from "./bodyBuildingAccountTypes-loading-dialog/BodyBuildingAccountTypesLoadingDialog";
import { BodyBuildingAccountTypeDeleteDialog } from "./bodyBuildingAccountType-delete-dialog/BodyBuildingAccountTypeDeleteDialog";
import { BodyBuildingAccountTypesCard } from "./BodyBuildingAccountTypesCard";
import { BodyBuildingAccountTypesUIProvider } from "./BodyBuildingAccountTypesUIContext";

export function BodyBuildingAccountTypesPage({ history }) {
  const bodyBuildingAccountTypesUIEvents = {
    newBodyBuildingAccountTypeButtonClick: () => {
      history.push("/bodyBuilding/bodyBuildingAccountTypes/new");
    },
    openEditBodyBuildingAccountTypePage: (id) => {
      history.push(`/bodyBuilding/bodyBuildingAccountTypes/${id}/edit`);
    },
    openDeleteBodyBuildingAccountTypeDialog: (id) => {
      history.push(`/bodyBuilding/bodyBuildingAccountTypes/${id}/delete`);
    },
    openDeleteBodyBuildingAccountTypesDialog: () => {
      history.push(`/bodyBuilding/bodyBuildingAccountTypes/deleteBodyBuildingAccountTypes`);
    },
    openFetchBodyBuildingAccountTypesDialog: () => {
      history.push(`/bodyBuilding/bodyBuildingAccountTypes/fetch`);
    },
    openUpdateBodyBuildingAccountTypesStatusDialog: () => {
      history.push("/bodyBuilding/bodyBuildingAccountTypes/updateStatus");
    },
  };
  
  return (
    <BodyBuildingAccountTypesUIProvider bodyBuildingAccountTypesUIEvents={bodyBuildingAccountTypesUIEvents}>
      <BodyBuildingAccountTypesLoadingDialog />
      <Route path="/bodyBuilding/bodyBuildingAccountTypes/:id/delete">
        {({ history, match }) => (
          <BodyBuildingAccountTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bodyBuilding/bodyBuildingAccountTypes");
            }}
          />
        )}
      </Route>
      <BodyBuildingAccountTypesCard />
    </BodyBuildingAccountTypesUIProvider>
  );
}