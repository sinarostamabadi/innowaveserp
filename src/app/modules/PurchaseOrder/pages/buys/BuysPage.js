import React from "react";
import { Route } from "react-router-dom";
import { BuysLoadingDialog } from "./buys-loading-dialog/BuysLoadingDialog";
import { BuyDeleteDialog } from "./buy-delete-dialog/BuyDeleteDialog";
import { BuysCard } from "./BuysCard";
import { BuysUIProvider } from "./BuysUIContext";
import { BuyCancelAndReturn } from "./buys-cancelAndReturn/BuyCancelAndReturn";
import { BuyAttachments } from "./buys-attachments/BuyAttachments";

export function BuysPage({ history }) {
  const buysUIEvents = {
    newBuyButtonClick: () => {
      history.push("/PurchaseOrder/buys/new");
    },
    openEditBuyPage: (id) => {
      history.push(`/PurchaseOrder/buys/${id}/edit`);
    },
    openDeleteBuyDialog: (id) => {
      history.push(`/PurchaseOrder/buys/${id}/delete`);
    },
    openDeleteBuysDialog: () => {
      history.push(`/PurchaseOrder/buys/deleteBuys`);
    },
    openFetchBuysDialog: () => {
      history.push(`/PurchaseOrder/buys/fetch`);
    },
    openUpdateBuysStatusDialog: () => {
      history.push("/PurchaseOrder/buys/updateStatus");
    },
    openCancelAndReturnDialog: (id) => {
      history.push(`/PurchaseOrder/buys/${id}/cancelAndReturn`);
    },
    openAttachmentsDialog: (id) => {
      history.push(`/PurchaseOrder/buys/${id}/attachments`);
    },
  };
  
  return (
    <BuysUIProvider buysUIEvents={buysUIEvents}>
      <BuysLoadingDialog />
      <Route path="/PurchaseOrder/buys/:id/delete">
        {({ history, match }) => (
          <BuyDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/PurchaseOrder/buys");
            }}
          />
        )}
      </Route>
      <Route path="/PurchaseOrder/buys/:id/cancelAndReturn">
        {({ history, match }) => (
          <BuyCancelAndReturn
            show={match != null}
            id={match && match.params.id}
            onHide={(isCanceled) => {
              if(isCanceled == true)
                !!match && !!match.params.id && history.push(`/PurchaseOrder/buyReturns/${match.params.id}/new`);
              else
                history.push("/PurchaseOrder/buys");
            }}
          />
        )}
      </Route>
      <Route path="/PurchaseOrder/buys/:id/attachments">
        {({ history, match }) => (
          <BuyAttachments
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
                history.push("/PurchaseOrder/buys");
            }}
          />
        )}
      </Route>
      <BuysCard />
    </BuysUIProvider>
  );
}