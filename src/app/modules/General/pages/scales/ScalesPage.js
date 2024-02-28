import React from "react";
import { Route } from "react-router-dom";
import { ScalesLoadingDialog } from "./scales-loading-dialog/ScalesLoadingDialog";
import { ScaleDeleteDialog } from "./scale-delete-dialog/ScaleDeleteDialog";
import { ScalesCard } from "./ScalesCard";
import { ScalesUIProvider } from "./ScalesUIContext";

export function ScalesPage({ history }) {
  const scalesUIEvents = {
    newScaleButtonClick: () => {
      history.push("/general/scales/new");
    },
    openEditScalePage: (id) => {
      history.push(`/general/scales/${id}/edit`);
    },
    openDeleteScaleDialog: (id) => {
      history.push(`/general/scales/${id}/delete`);
    },
    openDeleteScalesDialog: () => {
      history.push(`/general/scales/deleteScales`);
    },
    openFetchScalesDialog: () => {
      history.push(`/general/scales/fetch`);
    },
    openUpdateScalesStatusDialog: () => {
      history.push("/general/scales/updateStatus");
    },
  };

  return (
    <ScalesUIProvider scalesUIEvents={scalesUIEvents}>
      <ScalesLoadingDialog />
      <Route path="/general/scales/:id/delete">
        {({ history, match }) => (
          <ScaleDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/scales");
            }}
          />
        )}
      </Route>
      <ScalesCard />
    </ScalesUIProvider>
  );
}
