import React from "react";
import { Route } from "react-router-dom";
import { PersonGroupsLoadingDialog } from "./personGroups-loading-dialog/PersonGroupsLoadingDialog";
import { PersonGroupDeleteDialog } from "./personGroup-delete-dialog/PersonGroupDeleteDialog";
import { PersonGroupsCard } from "./PersonGroupsCard";
import { PersonGroupsUIProvider } from "./PersonGroupsUIContext";

export function PersonGroupsPage({ history }) {
  const personGroupsUIEvents = {
    newPersonGroupButtonClick: () => {
      history.push("/general/personGroups/new");
    },
    openEditPersonGroupPage: (id) => {
      history.push(`/general/personGroups/${id}/edit`);
    },
    openDeletePersonGroupDialog: (id) => {
      history.push(`/general/personGroups/${id}/delete`);
    },
    openDeletePersonGroupsDialog: () => {
      history.push(`/general/personGroups/deletePersonGroups`);
    },
    openFetchPersonGroupsDialog: () => {
      history.push(`/general/personGroups/fetch`);
    },
    openUpdatePersonGroupsStatusDialog: () => {
      history.push("/general/personGroups/updateStatus");
    },
  };

  return (
    <PersonGroupsUIProvider personGroupsUIEvents={personGroupsUIEvents}>
      <PersonGroupsLoadingDialog />
      <Route path="/general/personGroups/:id/delete">
        {({ history, match }) => (
          <PersonGroupDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/personGroups");
            }}
          />
        )}
      </Route>
      <PersonGroupsCard />
    </PersonGroupsUIProvider>
  );
}
