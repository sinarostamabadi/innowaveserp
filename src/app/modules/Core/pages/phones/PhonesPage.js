import React from "react";
import { Route } from "react-router-dom";
import { PhonesLoadingDialog } from "./phones-loading-dialog/PhonesLoadingDialog";
import { PhoneDeleteDialog } from "./phone-delete-dialog/PhoneDeleteDialog";
import { PhonesCard } from "./PhonesCard";
import { PhonesUIProvider } from "./PhonesUIContext";
export function PhonesPage({ history }) {
  const phonesUIEvents = {
    newPhoneButtonClick: () => {
      history.push("/Core/phones/new");
    },
    openEditPhonePage: (id) => {
      history.push(`/Core/phones/${id}/edit`);
    },
    openDeletePhoneDialog: (id) => {
      history.push(`/Core/phones/${id}/delete`);
    },
    openDeletePhonesDialog: () => {
      history.push(`/Core/phones/deletePhones`);
    },
    openFetchPhonesDialog: () => {
      history.push(`/Core/phones/fetch`);
    },
    openUpdatePhonesStatusDialog: () => {
      history.push("/Core/phones/updateStatus");
    },
  };
  return (
    <PhonesUIProvider phonesUIEvents={phonesUIEvents}>
      <PhonesLoadingDialog />
      <Route path="/Core/phones/:id/delete">
        {({ history, match }) => (
          <PhoneDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/Core/phones");
            }}
          />
        )}
      </Route>
      <PhonesCard />
    </PhonesUIProvider>
  );
}
