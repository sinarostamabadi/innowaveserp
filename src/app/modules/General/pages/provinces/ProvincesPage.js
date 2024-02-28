import React from "react";
import { Route } from "react-router-dom";
import { ProvincesLoadingDialog } from "./provinces-loading-dialog/ProvincesLoadingDialog";
import { ProvinceDeleteDialog } from "./province-delete-dialog/ProvinceDeleteDialog";
import { ProvincesCard } from "./ProvincesCard";
import { ProvincesUIProvider } from "./ProvincesUIContext";

export function ProvincesPage({ history }) {
  const provincesUIEvents = {
    newProvinceButtonClick: () => {
      history.push("/general/provinces/new");
    },
    openEditProvincePage: (id) => {
      history.push(`/general/provinces/${id}/edit`);
    },
    openDeleteProvinceDialog: (id) => {
      history.push(`/general/provinces/${id}/delete`);
    },
    openDeleteProvincesDialog: () => {
      history.push(`/general/provinces/deleteProvinces`);
    },
    openFetchProvincesDialog: () => {
      history.push(`/general/provinces/fetch`);
    },
    openUpdateProvincesStatusDialog: () => {
      history.push("/general/provinces/updateStatus");
    },
  };

  return (
    <ProvincesUIProvider provincesUIEvents={provincesUIEvents}>
      <ProvincesLoadingDialog />
      <Route path="/general/provinces/:id/delete">
        {({ history, match }) => (
          <ProvinceDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/provinces");
            }}
          />
        )}
      </Route>
      <ProvincesCard />
    </ProvincesUIProvider>
  );
}
