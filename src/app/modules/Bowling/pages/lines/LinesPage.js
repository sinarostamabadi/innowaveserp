import React from "react";
import { Route } from "react-router-dom";
import { LinesLoadingDialog } from "./lines-loading-dialog/LinesLoadingDialog";
import { LineDeleteDialog } from "./line-delete-dialog/LineDeleteDialog";
import { LinesCard } from "./LinesCard";
import { LinesUIProvider } from "./LinesUIContext";

export function LinesPage({ history }) {
  const linesUIEvents = {
    newLineButtonClick: () => {
      history.push("/bowling/lines/new");
    },
    openEditLinePage: (id) => {
      history.push(`/bowling/lines/${id}/edit`);
    },
    openDeleteLineDialog: (id) => {
      history.push(`/bowling/lines/${id}/delete`);
    },
    openDeleteLinesDialog: () => {
      history.push(`/bowling/lines/deleteLines`);
    },
    openFetchLinesDialog: () => {
      history.push(`/bowling/lines/fetch`);
    },
    openUpdateLinesStatusDialog: () => {
      history.push("/bowling/lines/updateStatus");
    },
  };

  return (
    <LinesUIProvider linesUIEvents={linesUIEvents}>
      <LinesLoadingDialog />
      <Route path="/bowling/lines/:id/delete">
        {({ history, match }) => (
          <LineDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bowling/lines");
            }}
          />
        )}
      </Route>
      <LinesCard />
    </LinesUIProvider>
  );
}
