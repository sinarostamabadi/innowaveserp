import React from "react";
import { Route } from "react-router-dom";
import { AddressCategoriesLoadingDialog } from "./addressCategories-loading-dialog/AddressCategoriesLoadingDialog";
import { AddressCategoryDeleteDialog } from "./addressCategory-delete-dialog/AddressCategoryDeleteDialog";
import { AddressCategoriesCard } from "./AddressCategoriesCard";
import { AddressCategoriesUIProvider } from "./AddressCategoriesUIContext";

export function AddressCategoriesPage({ history }) {
  const addressCategoriesUIEvents = {
    newAddressCategoryButtonClick: () => {
      history.push("/general/addressCategories/new");
    },
    openEditAddressCategoryPage: (id) => {
      history.push(`/general/addressCategories/${id}/edit`);
    },
    openDeleteAddressCategoryDialog: (id) => {
      history.push(`/general/addressCategories/${id}/delete`);
    },
    openDeleteAddressCategoriesDialog: () => {
      history.push(`/general/addressCategories/deleteAddressCategories`);
    },
    openFetchAddressCategoriesDialog: () => {
      history.push(`/general/addressCategories/fetch`);
    },
    openUpdateAddressCategoriesStatusDialog: () => {
      history.push("/general/addressCategories/updateStatus");
    },
  };
  
  return (
    <AddressCategoriesUIProvider addressCategoriesUIEvents={addressCategoriesUIEvents}>
      <AddressCategoriesLoadingDialog />
      <Route path="/general/addressCategories/:id/delete">
        {({ history, match }) => (
          <AddressCategoryDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/addressCategories");
            }}
          />
        )}
      </Route>
      <AddressCategoriesCard />
    </AddressCategoriesUIProvider>
  );
}
