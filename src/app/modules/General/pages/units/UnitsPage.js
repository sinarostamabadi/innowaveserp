import React from "react";
import { Route } from "react-router-dom";
import { UnitsLoadingDialog } from "./units-loading-dialog/UnitsLoadingDialog";
import { UnitDeleteDialog } from "./unit-delete-dialog/UnitDeleteDialog";
import { UnitsCard } from "./UnitsCard";
import { UnitsUIProvider } from "./UnitsUIContext";

export function UnitsPage({ history }) {
  const unitsUIEvents = {
    newUnitButtonClick: () => {
      history.push("/general/units/new");
    },
    openEditUnitPage: (id) => {
      history.push(`/general/units/${id}/edit`);
    },
    openDeleteUnitDialog: (id) => {
      history.push(`/general/units/${id}/delete`);
    },
    openDeleteUnitsDialog: () => {
      history.push(`/general/units/deleteUnits`);
    },
    openFetchUnitsDialog: () => {
      history.push(`/general/units/fetch`);
    },
    openUpdateUnitsStatusDialog: () => {
      history.push("/general/units/updateStatus");
    },
  };

  return (
    <UnitsUIProvider unitsUIEvents={unitsUIEvents}>
      <UnitsLoadingDialog />
      <Route path="/general/units/:id/delete">
        {({ history, match }) => (
          <UnitDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/units");
            }}
          />
        )}
      </Route>
      <UnitsCard />
    </UnitsUIProvider>
  );
}
