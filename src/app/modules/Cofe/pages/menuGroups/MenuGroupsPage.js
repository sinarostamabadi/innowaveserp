import React from "react";
import { Route } from "react-router-dom";
import { MenuGroupsLoadingDialog } from "./menuGroups-loading-dialog/MenuGroupsLoadingDialog";
import { MenuGroupDeleteDialog } from "./menuGroup-delete-dialog/MenuGroupDeleteDialog";
import { MenuGroupsCard } from "./MenuGroupsCard";
import { MenuGroupsUIProvider } from "./MenuGroupsUIContext";

export function MenuGroupsPage({ history }) {
  const menuGroupsUIEvents = {
    newMenuGroupButtonClick: () => {
      history.push("/cofe/menuGroups/new");
    },
    openEditMenuGroupPage: (id) => {
      history.push(`/cofe/menuGroups/${id}/edit`);
    },
    openDeleteMenuGroupDialog: (id) => {
      history.push(`/cofe/menuGroups/${id}/delete`);
    },
    openDeleteMenuGroupsDialog: () => {
      history.push(`/cofe/menuGroups/deleteMenuGroups`);
    },
    openFetchMenuGroupsDialog: () => {
      history.push(`/cofe/menuGroups/fetch`);
    },
    openUpdateMenuGroupsStatusDialog: () => {
      history.push("/cofe/menuGroups/updateStatus");
    },
  };

  return (
    <MenuGroupsUIProvider menuGroupsUIEvents={menuGroupsUIEvents}>
      <MenuGroupsLoadingDialog />
      <Route path="/cofe/menuGroups/:id/delete">
        {({ history, match }) => (
          <MenuGroupDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cofe/menuGroups");
            }}
          />
        )}
      </Route>
      <MenuGroupsCard />
    </MenuGroupsUIProvider>
  );
}
