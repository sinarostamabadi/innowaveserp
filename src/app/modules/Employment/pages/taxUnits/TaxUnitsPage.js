import React from "react";
import { Route } from "react-router-dom";
import { TaxUnitsLoadingDialog } from "./taxUnits-loading-dialog/TaxUnitsLoadingDialog";
import { TaxUnitDeleteDialog } from "./taxUnit-delete-dialog/TaxUnitDeleteDialog";
import { TaxUnitsCard } from "./TaxUnitsCard";
import { TaxUnitsUIProvider } from "./TaxUnitsUIContext";

export function TaxUnitsPage({ history }) {
  const taxUnitsUIEvents = {
    newTaxUnitButtonClick: () => {
      history.push("/employment/taxUnits/new");
    },
    openEditTaxUnitPage: (id) => {
      history.push(`/employment/taxUnits/${id}/edit`);
    },
    openDeleteTaxUnitDialog: (id) => {
      history.push(`/employment/taxUnits/${id}/delete`);
    },
    openDeleteTaxUnitsDialog: () => {
      history.push(`/employment/taxUnits/deleteTaxUnits`);
    },
    openFetchTaxUnitsDialog: () => {
      history.push(`/employment/taxUnits/fetch`);
    },
    openUpdateTaxUnitsStatusDialog: () => {
      history.push("/employment/taxUnits/updateStatus");
    },
  };

  return (
    <TaxUnitsUIProvider taxUnitsUIEvents={taxUnitsUIEvents}>
      <TaxUnitsLoadingDialog />
      <Route path="/employment/taxUnits/:id/delete">
        {({ history, match }) => (
          <TaxUnitDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/taxUnits");
            }}
          />
        )}
      </Route>
      <TaxUnitsCard />
    </TaxUnitsUIProvider>
  );
}
