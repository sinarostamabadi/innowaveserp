import React from "react";
import { Route } from "react-router-dom";
import { InfoAreasLoadingDialog } from "./infoAreas-loading-dialog/InfoAreasLoadingDialog";
import { InfoAreaDeleteDialog } from "./infoArea-delete-dialog/InfoAreaDeleteDialog";
import { InfoAreasCard } from "./InfoAreasCard";
import { InfoAreasUIProvider } from "./InfoAreasUIContext";

export function InfoAreasPage({ history }) {
  const infoAreasUIEvents = {
    newInfoAreaButtonClick: () => {
      history.push("/employment/infoAreas/new");
    },
    openEditInfoAreaPage: (id) => {
      history.push(`/employment/infoAreas/${id}/edit`);
    },
    openDeleteInfoAreaDialog: (id) => {
      history.push(`/employment/infoAreas/${id}/delete`);
    },
    openDeleteInfoAreasDialog: () => {
      history.push(`/employment/infoAreas/deleteInfoAreas`);
    },
    openFetchInfoAreasDialog: () => {
      history.push(`/employment/infoAreas/fetch`);
    },
    openUpdateInfoAreasStatusDialog: () => {
      history.push("/employment/infoAreas/updateStatus");
    },
  };
  
  return (
    <InfoAreasUIProvider infoAreasUIEvents={infoAreasUIEvents}>
      <InfoAreasLoadingDialog />
      <Route path="/employment/infoAreas/:id/delete">
        {({ history, match }) => (
          <InfoAreaDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/infoAreas");
            }}
          />
        )}
      </Route>
      <InfoAreasCard />
    </InfoAreasUIProvider>
  );
}