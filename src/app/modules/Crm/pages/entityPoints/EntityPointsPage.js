import React from "react";
import { Route } from "react-router-dom";
import { EntityPointsLoadingDialog } from "./entityPoints-loading-dialog/EntityPointsLoadingDialog";
import { EntityPointDeleteDialog } from "./entityPoint-delete-dialog/EntityPointDeleteDialog";
import { EntityPointsCard } from "./EntityPointsCard";
import { EntityPointsUIProvider } from "./EntityPointsUIContext";

export function EntityPointsPage({ history }) {
  const entityPointsUIEvents = {
    newEntityPointButtonClick: () => {
      history.push("/crm/entityPoints/new");
    },
    openEditEntityPointPage: (id) => {
      history.push(`/crm/entityPoints/${id}/edit`);
    },
    openDeleteEntityPointDialog: (id) => {
      history.push(`/crm/entityPoints/${id}/delete`);
    },
    openDeleteEntityPointsDialog: () => {
      history.push(`/crm/entityPoints/deleteEntityPoints`);
    },
    openFetchEntityPointsDialog: () => {
      history.push(`/crm/entityPoints/fetch`);
    },
    openUpdateEntityPointsStatusDialog: () => {
      history.push("/crm/entityPoints/updateStatus");
    },
  };

  return (
    <EntityPointsUIProvider entityPointsUIEvents={entityPointsUIEvents}>
      <EntityPointsLoadingDialog />
      <Route path="/crm/entityPoints/:id/delete">
        {({ history, match }) => (
          <EntityPointDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/crm/entityPoints");
            }}
          />
        )}
      </Route>
      <EntityPointsCard />
    </EntityPointsUIProvider>
  );
}
