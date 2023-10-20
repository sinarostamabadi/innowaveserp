import React from "react";
import { Route } from "react-router-dom";
import { SellDiscountDetailsLoadingDialog } from "./sellDiscountDetails-loading-dialog/SellDiscountDetailsLoadingDialog";
import { SellDiscountDetailDeleteDialog } from "./sellDiscountDetail-delete-dialog/SellDiscountDetailDeleteDialog";
import { SellDiscountDetailsCard } from "./SellDiscountDetailsCard";
import { SellDiscountDetailsUIProvider } from "./SellDiscountDetailsUIContext";

export function SellDiscountDetailsPage({ history }) {
  const sellDiscountDetailsUIEvents = {
    newSellDiscountDetailButtonClick: () => {
      history.push("/sell/sellDiscountDetails/new");
    },
    openEditSellDiscountDetailPage: (id) => {
      history.push(`/sell/sellDiscountDetails/${id}/edit`);
    },
    openDeleteSellDiscountDetailDialog: (id) => {
      history.push(`/sell/sellDiscountDetails/${id}/delete`);
    },
    openDeleteSellDiscountDetailsDialog: () => {
      history.push(`/sell/sellDiscountDetails/deleteSellDiscountDetails`);
    },
    openFetchSellDiscountDetailsDialog: () => {
      history.push(`/sell/sellDiscountDetails/fetch`);
    },
    openUpdateSellDiscountDetailsStatusDialog: () => {
      history.push("/sell/sellDiscountDetails/updateStatus");
    },
  };
  
  return (
    <SellDiscountDetailsUIProvider sellDiscountDetailsUIEvents={sellDiscountDetailsUIEvents}>
      <SellDiscountDetailsLoadingDialog />
      <Route path="/sell/sellDiscountDetails/:id/delete">
        {({ history, match }) => (
          <SellDiscountDetailDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/sell/sellDiscountDetails");
            }}
          />
        )}
      </Route>
      <SellDiscountDetailsCard />
    </SellDiscountDetailsUIProvider>
  );
}