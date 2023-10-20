import React from "react";
import { Route } from "react-router-dom";
import { DiscountTypesLoadingDialog } from "./discountTypes-loading-dialog/DiscountTypesLoadingDialog";
import { DiscountTypeDeleteDialog } from "./discountType-delete-dialog/DiscountTypeDeleteDialog";
import { DiscountTypesCard } from "./DiscountTypesCard";
import { DiscountTypesUIProvider } from "./DiscountTypesUIContext";

export function DiscountTypesPage({ history }) {
  const discountTypesUIEvents = {
    newDiscountTypeButtonClick: () => {
      history.push("/general/discountTypes/new");
    },
    openEditDiscountTypePage: (id) => {
      history.push(`/general/discountTypes/${id}/edit`);
    },
    openDeleteDiscountTypeDialog: (id) => {
      history.push(`/general/discountTypes/${id}/delete`);
    },
    openDeleteDiscountTypesDialog: () => {
      history.push(`/general/discountTypes/deleteDiscountTypes`);
    },
    openFetchDiscountTypesDialog: () => {
      history.push(`/general/discountTypes/fetch`);
    },
    openUpdateDiscountTypesStatusDialog: () => {
      history.push("/general/discountTypes/updateStatus");
    },
  };
  
  return (
    <DiscountTypesUIProvider discountTypesUIEvents={discountTypesUIEvents}>
      <DiscountTypesLoadingDialog />
      <Route path="/general/discountTypes/:id/delete">
        {({ history, match }) => (
          <DiscountTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/discountTypes");
            }}
          />
        )}
      </Route>
      <DiscountTypesCard />
    </DiscountTypesUIProvider>
  );
}