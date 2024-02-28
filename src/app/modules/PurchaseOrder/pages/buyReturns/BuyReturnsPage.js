import React from "react";
import { Route } from "react-router-dom";
import { BuyReturnsLoadingDialog } from "./buyReturns-loading-dialog/BuyReturnsLoadingDialog";
import { BuyReturnDeleteDialog } from "./buyReturn-delete-dialog/BuyReturnDeleteDialog";
import { BuyReturnsCard } from "./BuyReturnsCard";
import { BuyReturnsUIProvider } from "./BuyReturnsUIContext";
import { BuyReturnCancelAndReturn } from "./buyReturns-cancelAndReturn/BuyReturnCancelAndReturn";
import { BuyReturnAttachments } from "./buyReturns-attachments/BuyReturnAttachments";

export function BuyReturnsPage({ history }) {
  const buyReturnsUIEvents = {
    newBuyReturnButtonClick: () => {
      history.push("/PurchaseOrder/buyReturns/new");
    },
    openEditBuyReturnPage: (id) => {
      history.push(`/PurchaseOrder/buyReturns/${id}/edit`);
    },
    openDeleteBuyReturnDialog: (id) => {
      history.push(`/PurchaseOrder/buyReturns/${id}/delete`);
    },
    openDeleteBuyReturnsDialog: () => {
      history.push(`/PurchaseOrder/buyReturns/deleteBuyReturns`);
    },
    openFetchBuyReturnsDialog: () => {
      history.push(`/PurchaseOrder/buyReturns/fetch`);
    },
    openUpdateBuyReturnsStatusDialog: () => {
      history.push("/PurchaseOrder/buyReturns/updateStatus");
    },
    openCancelAndReturnDialog: (id) => {
      history.push(`/PurchaseOrder/buyReturns/${id}/cancelAndReturn`);
    },
    openAttachmentsDialog: (id) => {
      history.push(`/PurchaseOrder/buyReturns/${id}/attachments`);
    },
  };

  return (
    <BuyReturnsUIProvider buyReturnsUIEvents={buyReturnsUIEvents}>
      <BuyReturnsLoadingDialog />
      <Route path="/PurchaseOrder/buyReturns/:id/delete">
        {({ history, match }) => (
          <BuyReturnDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/PurchaseOrder/buyReturns");
            }}
          />
        )}
      </Route>
      <Route path="/PurchaseOrder/buyReturns/:id/cancelAndReturn">
        {({ history, match }) => (
          <BuyReturnCancelAndReturn
            show={match != null}
            id={match && match.params.id}
            onHide={(isCanceled) => {
              if (isCanceled == true)
                !!match &&
                  !!match.params.id &&
                  history.push(
                    `/PurchaseOrder/buyReturns/${match.params.id}/new`
                  );
              else history.push("/PurchaseOrder/buyReturns");
            }}
          />
        )}
      </Route>
      <Route path="/PurchaseOrder/buyReturns/:id/attachments">
        {({ history, match }) => (
          <BuyReturnAttachments
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/PurchaseOrder/buyReturns");
            }}
          />
        )}
      </Route>
      <BuyReturnsCard />
    </BuyReturnsUIProvider>
  );
}
