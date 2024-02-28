import React from "react";
import { Route } from "react-router-dom";
import { peopleLoadingDialog } from "./people-loading-dialog/peopleLoadingDialog";
import { PersonDeleteDialog } from "./person-delete-dialog/PersonDeleteDialog";
import { peopleCard } from "./peopleCard";
import { peopleUIProvider } from "./peopleUIContext";
export function peoplePage({ history }) {
  const peopleUIEvents = {
    newPersonButtonClick: () => {
      history.push("/Core/people/new");
    },
    openEditPersonPage: (id) => {
      history.push(`/Core/people/${id}/edit`);
    },
    openDeletePersonDialog: (id) => {
      history.push(`/Core/people/${id}/delete`);
    },
    openDeletepeopleDialog: () => {
      history.push(`/Core/people/deletepeople`);
    },
    openFetchpeopleDialog: () => {
      history.push(`/Core/people/fetch`);
    },
    openUpdatepeopleStatusDialog: () => {
      history.push("/Core/people/updateStatus");
    },
  };
  return (
    <peopleUIProvider peopleUIEvents={peopleUIEvents}>
      <peopleLoadingDialog />
      <Route path="/Core/people/:id/delete">
        {({ history, match }) => (
          <PersonDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/Core/people");
            }}
          />
        )}
      </Route>
      <peopleCard />
    </peopleUIProvider>
  );
}
