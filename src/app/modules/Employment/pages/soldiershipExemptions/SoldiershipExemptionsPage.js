import React from "react";
import { Route } from "react-router-dom";
import { SoldiershipExemptionsLoadingDialog } from "./soldiershipExemptions-loading-dialog/SoldiershipExemptionsLoadingDialog";
import { SoldiershipExemptionDeleteDialog } from "./soldiershipExemption-delete-dialog/SoldiershipExemptionDeleteDialog";
import { SoldiershipExemptionsCard } from "./SoldiershipExemptionsCard";
import { SoldiershipExemptionsUIProvider } from "./SoldiershipExemptionsUIContext";

export function SoldiershipExemptionsPage({ history }) {
  const soldiershipExemptionsUIEvents = {
    newSoldiershipExemptionButtonClick: () => {
      history.push("/employment/soldiershipExemptions/new");
    },
    openEditSoldiershipExemptionPage: (id) => {
      history.push(`/employment/soldiershipExemptions/${id}/edit`);
    },
    openDeleteSoldiershipExemptionDialog: (id) => {
      history.push(`/employment/soldiershipExemptions/${id}/delete`);
    },
    openDeleteSoldiershipExemptionsDialog: () => {
      history.push(
        `/employment/soldiershipExemptions/deleteSoldiershipExemptions`
      );
    },
    openFetchSoldiershipExemptionsDialog: () => {
      history.push(`/employment/soldiershipExemptions/fetch`);
    },
    openUpdateSoldiershipExemptionsStatusDialog: () => {
      history.push("/employment/soldiershipExemptions/updateStatus");
    },
  };

  return (
    <SoldiershipExemptionsUIProvider
      soldiershipExemptionsUIEvents={soldiershipExemptionsUIEvents}
    >
      <SoldiershipExemptionsLoadingDialog />
      <Route path="/employment/soldiershipExemptions/:id/delete">
        {({ history, match }) => (
          <SoldiershipExemptionDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/soldiershipExemptions");
            }}
          />
        )}
      </Route>
      <SoldiershipExemptionsCard />
    </SoldiershipExemptionsUIProvider>
  );
}
