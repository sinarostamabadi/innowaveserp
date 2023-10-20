import React from "react";
import { Route } from "react-router-dom";
import { PhoneTypesLoadingDialog } from "./phoneTypes-loading-dialog/PhoneTypesLoadingDialog";
import { PhoneTypeDeleteDialog } from "./phoneType-delete-dialog/PhoneTypeDeleteDialog";
import { PhoneTypesCard } from "./PhoneTypesCard";
import { PhoneTypesUIProvider } from "./PhoneTypesUIContext";

export function PhoneTypesPage({ history }) {
  const phoneTypesUIEvents = {
    newPhoneTypeButtonClick: () => {
      history.push("/general/phoneTypes/new");
    },
    openEditPhoneTypePage: (id) => {
      history.push(`/general/phoneTypes/${id}/edit`);
    },
    openDeletePhoneTypeDialog: (id) => {
      history.push(`/general/phoneTypes/${id}/delete`);
    },
    openDeletePhoneTypesDialog: () => {
      history.push(`/general/phoneTypes/deletePhoneTypes`);
    },
    openFetchPhoneTypesDialog: () => {
      history.push(`/general/phoneTypes/fetch`);
    },
    openUpdatePhoneTypesStatusDialog: () => {
      history.push("/general/phoneTypes/updateStatus");
    },
  };
  
  return (
    <PhoneTypesUIProvider phoneTypesUIEvents={phoneTypesUIEvents}>
      <PhoneTypesLoadingDialog />
      <Route path="/general/phoneTypes/:id/delete">
        {({ history, match }) => (
          <PhoneTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/phoneTypes");
            }}
          />
        )}
      </Route>
      <PhoneTypesCard />
    </PhoneTypesUIProvider>
  );
}