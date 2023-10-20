import React from "react";
import { Route } from "react-router-dom";
import { CalendarsLoadingDialog } from "./calendars-loading-dialog/CalendarsLoadingDialog";
import { CalendarDeleteDialog } from "./calendar-delete-dialog/CalendarDeleteDialog";
import { CalendarsCard } from "./CalendarsCard";
import { CalendarsUIProvider } from "./CalendarsUIContext";
export function CalendarsPage({ history }) {
  const calendarsUIEvents = {
    newCalendarButtonClick: () => {
      history.push("/General/calendars/new");
    },
    openEditCalendarPage: (id) => {
      history.push(`/General/calendars/${id}/edit`);
    },
    openDeleteCalendarDialog: (id) => {
      history.push(`/General/calendars/${id}/delete`);
    },
    openDeleteCalendarsDialog: () => {
      history.push(`/General/calendars/deleteCalendars`);
    },
    openFetchCalendarsDialog: () => {
      history.push(`/General/calendars/fetch`);
    },
    openUpdateCalendarsStatusDialog: () => {
      history.push("/General/calendars/updateStatus");
    },
  };
  return (
    <CalendarsUIProvider calendarsUIEvents={calendarsUIEvents}>
      <CalendarsLoadingDialog />
      <Route path="/General/calendars/:id/delete">
        {({ history, match }) => (
          <CalendarDeleteDialog  
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/General/calendars");
            }}
          />
        )}
      </Route>
      <CalendarsCard />
    </CalendarsUIProvider>
  );
}
