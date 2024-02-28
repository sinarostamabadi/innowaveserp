import React from "react";
import { Route } from "react-router-dom";
import { PersonSpecialDaysLoadingDialog } from "./personSpecialDays-loading-dialog/PersonSpecialDaysLoadingDialog";
import { PersonSpecialDayDeleteDialog } from "./personSpecialDay-delete-dialog/PersonSpecialDayDeleteDialog";
import { PersonSpecialDaysCard } from "./PersonSpecialDaysCard";
import { PersonSpecialDaysUIProvider } from "./PersonSpecialDaysUIContext";
export function PersonSpecialDaysPage({ history }) {
  const personSpecialDaysUIEvents = {
    newPersonSpecialDayButtonClick: () => {
      history.push("/General/personSpecialDays/new");
    },
    openEditPersonSpecialDayPage: (id) => {
      history.push(`/General/personSpecialDays/${id}/edit`);
    },
    openDeletePersonSpecialDayDialog: (id) => {
      history.push(`/General/personSpecialDays/${id}/delete`);
    },
    openDeletePersonSpecialDaysDialog: () => {
      history.push(`/General/personSpecialDays/deletePersonSpecialDays`);
    },
    openFetchPersonSpecialDaysDialog: () => {
      history.push(`/General/personSpecialDays/fetch`);
    },
    openUpdatePersonSpecialDaysStatusDialog: () => {
      history.push("/General/personSpecialDays/updateStatus");
    },
  };
  return (
    <PersonSpecialDaysUIProvider
      personSpecialDaysUIEvents={personSpecialDaysUIEvents}
    >
      <PersonSpecialDaysLoadingDialog />
      <Route path="/General/personSpecialDays/:id/delete">
        {({ history, match }) => (
          <PersonSpecialDayDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/General/personSpecialDays");
            }}
          />
        )}
      </Route>
      <PersonSpecialDaysCard />
    </PersonSpecialDaysUIProvider>
  );
}
