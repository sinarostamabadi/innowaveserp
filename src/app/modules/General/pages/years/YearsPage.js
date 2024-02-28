import React from "react";
import { Route } from "react-router-dom";
import { YearsLoadingDialog } from "./years-loading-dialog/YearsLoadingDialog";
import { YearDeleteDialog } from "./year-delete-dialog/YearDeleteDialog";
import { YearsCard } from "./YearsCard";
import { YearsUIProvider } from "./YearsUIContext";

export function YearsPage({ history }) {
  const yearsUIEvents = {
    newYearButtonClick: () => {
      history.push("/general/years/new");
    },
    openEditYearPage: (id) => {
      history.push(`/general/years/${id}/edit`);
    },
    openDeleteYearDialog: (id) => {
      history.push(`/general/years/${id}/delete`);
    },
    openDeleteYearsDialog: () => {
      history.push(`/general/years/deleteYears`);
    },
    openFetchYearsDialog: () => {
      history.push(`/general/years/fetch`);
    },
    openUpdateYearsStatusDialog: () => {
      history.push("/general/years/updateStatus");
    },
  };

  return (
    <YearsUIProvider yearsUIEvents={yearsUIEvents}>
      <YearsLoadingDialog />
      <Route path="/general/years/:id/delete">
        {({ history, match }) => (
          <YearDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/years");
            }}
          />
        )}
      </Route>
      <YearsCard />
    </YearsUIProvider>
  );
}
