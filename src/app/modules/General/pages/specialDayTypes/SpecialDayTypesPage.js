import React from "react";
import { Route } from "react-router-dom";
import { SpecialDayTypesLoadingDialog } from "./specialDayTypes-loading-dialog/SpecialDayTypesLoadingDialog";
import { SpecialDayTypeDeleteDialog } from "./specialDayType-delete-dialog/SpecialDayTypeDeleteDialog";
import { SpecialDayTypesCard } from "./SpecialDayTypesCard";
import { SpecialDayTypesUIProvider } from "./SpecialDayTypesUIContext";

export function SpecialDayTypesPage({ history }) {
  const specialDayTypesUIEvents = {
    newSpecialDayTypeButtonClick: () => {
      history.push("/general/specialDayTypes/new");
    },
    openEditSpecialDayTypePage: (id) => {
      history.push(`/general/specialDayTypes/${id}/edit`);
    },
    openDeleteSpecialDayTypeDialog: (id) => {
      history.push(`/general/specialDayTypes/${id}/delete`);
    },
    openDeleteSpecialDayTypesDialog: () => {
      history.push(`/general/specialDayTypes/deleteSpecialDayTypes`);
    },
    openFetchSpecialDayTypesDialog: () => {
      history.push(`/general/specialDayTypes/fetch`);
    },
    openUpdateSpecialDayTypesStatusDialog: () => {
      history.push("/general/specialDayTypes/updateStatus");
    },
  };
  
  return (
    <SpecialDayTypesUIProvider specialDayTypesUIEvents={specialDayTypesUIEvents}>
      <SpecialDayTypesLoadingDialog />
      <Route path="/general/specialDayTypes/:id/delete">
        {({ history, match }) => (
          <SpecialDayTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/specialDayTypes");
            }}
          />
        )}
      </Route>
      <SpecialDayTypesCard />
    </SpecialDayTypesUIProvider>
  );
}