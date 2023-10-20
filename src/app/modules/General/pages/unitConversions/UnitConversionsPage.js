import React from "react";
import { Route } from "react-router-dom";
import { UnitConversionsLoadingDialog } from "./unitConversions-loading-dialog/UnitConversionsLoadingDialog";
import { UnitConversionDeleteDialog } from "./unitConversion-delete-dialog/UnitConversionDeleteDialog";
import { UnitConversionsCard } from "./UnitConversionsCard";
import { UnitConversionsUIProvider } from "./UnitConversionsUIContext";

export function UnitConversionsPage({ history }) {
  const unitConversionsUIEvents = {
    newUnitConversionButtonClick: () => {
      history.push("/general/unitConversions/new");
    },
    openEditUnitConversionPage: (id) => {
      history.push(`/general/unitConversions/${id}/edit`);
    },
    openDeleteUnitConversionDialog: (id) => {
      history.push(`/general/unitConversions/${id}/delete`);
    },
    openDeleteUnitConversionsDialog: () => {
      history.push(`/general/unitConversions/deleteUnitConversions`);
    },
    openFetchUnitConversionsDialog: () => {
      history.push(`/general/unitConversions/fetch`);
    },
    openUpdateUnitConversionsStatusDialog: () => {
      history.push("/general/unitConversions/updateStatus");
    },
  };
  
  return (
    <UnitConversionsUIProvider unitConversionsUIEvents={unitConversionsUIEvents}>
      <UnitConversionsLoadingDialog />
      <Route path="/general/unitConversions/:id/delete">
        {({ history, match }) => (
          <UnitConversionDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/unitConversions");
            }}
          />
        )}
      </Route>
      <UnitConversionsCard />
    </UnitConversionsUIProvider>
  );
}