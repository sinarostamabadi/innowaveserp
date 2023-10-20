import React from "react";
import { Route } from "react-router-dom";
import { SellDiscountDetailInfosLoadingDialog } from "./sellDiscountDetailInfos-loading-dialog/SellDiscountDetailInfosLoadingDialog";
import { SellDiscountDetailInfoDeleteDialog } from "./sellDiscountDetailInfo-delete-dialog/SellDiscountDetailInfoDeleteDialog";
import { SellDiscountDetailInfosCard } from "./SellDiscountDetailInfosCard";
import { SellDiscountDetailInfosUIProvider } from "./SellDiscountDetailInfosUIContext";

export function SellDiscountDetailInfosPage({ history }) {
  const sellDiscountDetailInfosUIEvents = {
    newSellDiscountDetailInfoButtonClick: () => {
      history.push("/sell/sellDiscountDetailInfos/new");
    },
    openEditSellDiscountDetailInfoPage: (id) => {
      history.push(`/sell/sellDiscountDetailInfos/${id}/edit`);
    },
    openDeleteSellDiscountDetailInfoDialog: (id) => {
      history.push(`/sell/sellDiscountDetailInfos/${id}/delete`);
    },
    openDeleteSellDiscountDetailInfosDialog: () => {
      history.push(`/sell/sellDiscountDetailInfos/deleteSellDiscountDetailInfos`);
    },
    openFetchSellDiscountDetailInfosDialog: () => {
      history.push(`/sell/sellDiscountDetailInfos/fetch`);
    },
    openUpdateSellDiscountDetailInfosStatusDialog: () => {
      history.push("/sell/sellDiscountDetailInfos/updateStatus");
    },
  };
  
  return (
    <SellDiscountDetailInfosUIProvider sellDiscountDetailInfosUIEvents={sellDiscountDetailInfosUIEvents}>
      <SellDiscountDetailInfosLoadingDialog />
      <Route path="/sell/sellDiscountDetailInfos/:id/delete">
        {({ history, match }) => (
          <SellDiscountDetailInfoDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/sell/sellDiscountDetailInfos");
            }}
          />
        )}
      </Route>
      <SellDiscountDetailInfosCard />
    </SellDiscountDetailInfosUIProvider>
  );
}