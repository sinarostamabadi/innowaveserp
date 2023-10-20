import React from "react";
import { Route } from "react-router-dom";
import { UnitMeasureGroupsLoadingDialog } from "./unitMeasureGroups-loading-dialog/UnitMeasureGroupsLoadingDialog";
import { UnitMeasureGroupDeleteDialog } from "./unitMeasureGroup-delete-dialog/UnitMeasureGroupDeleteDialog";
import { UnitMeasureGroupsCard } from "./UnitMeasureGroupsCard";
import { UnitMeasureGroupsUIProvider } from "./UnitMeasureGroupsUIContext";

export function UnitMeasureGroupsPage({ history }) {
  const unitMeasureGroupsUIEvents = {
    newUnitMeasureGroupButtonClick: () => {
      history.push("/general/unitMeasureGroups/new");
    },
    openEditUnitMeasureGroupPage: (id) => {
      history.push(`/general/unitMeasureGroups/${id}/edit`);
    },
    openDeleteUnitMeasureGroupDialog: (id) => {
      history.push(`/general/unitMeasureGroups/${id}/delete`);
    },
    openDeleteUnitMeasureGroupsDialog: () => {
      history.push(`/general/unitMeasureGroups/deleteUnitMeasureGroups`);
    },
    openFetchUnitMeasureGroupsDialog: () => {
      history.push(`/general/unitMeasureGroups/fetch`);
    },
    openUpdateUnitMeasureGroupsStatusDialog: () => {
      history.push("/general/unitMeasureGroups/updateStatus");
    },
  };
  
  return (
    <UnitMeasureGroupsUIProvider unitMeasureGroupsUIEvents={unitMeasureGroupsUIEvents}>
      <UnitMeasureGroupsLoadingDialog />
      <Route path="/general/unitMeasureGroups/:id/delete">
        {({ history, match }) => (
          <UnitMeasureGroupDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/unitMeasureGroups");
            }}
          />
        )}
      </Route>
      <UnitMeasureGroupsCard />
    </UnitMeasureGroupsUIProvider>
  );
}