import React from "react";
import { Route } from "react-router-dom";
import { AddressesLoadingDialog } from "./addresses-loading-dialog/AddressesLoadingDialog";
import { AddressDeleteDialog } from "./address-delete-dialog/AddressDeleteDialog";
import { AddressesCard } from "./AddressesCard";
import { AddressesUIProvider } from "./AddressesUIContext";
export function AddressesPage({ history }) {
  const addressesUIEvents = {
    newAddressButtonClick: () => {
      history.push("/Core/addresses/new");
    },
    openEditAddressPage: (id) => {
      history.push(`/Core/addresses/${id}/edit`);
    },
    openDeleteAddressDialog: (id) => {
      history.push(`/Core/addresses/${id}/delete`);
    },
    openDeleteAddressesDialog: () => {
      history.push(`/Core/addresses/deleteAddresses`);
    },
    openFetchAddressesDialog: () => {
      history.push(`/Core/addresses/fetch`);
    },
    openUpdateAddressesStatusDialog: () => {
      history.push("/Core/addresses/updateStatus");
    },
  };
  return (
    <AddressesUIProvider addressesUIEvents={addressesUIEvents}>
      <AddressesLoadingDialog />
      <Route path="/Core/addresses/:id/delete">
        {({ history, match }) => (
          <AddressDeleteDialog  
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/Core/addresses");
            }}
          />
        )}
      </Route>
      <AddressesCard />
    </AddressesUIProvider>
  );
}
