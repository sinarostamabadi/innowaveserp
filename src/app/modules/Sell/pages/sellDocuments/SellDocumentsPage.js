import React from "react";
import { Route } from "react-router-dom";
import { SellDocumentsLoadingDialog } from "./sellDocuments-loading-dialog/SellDocumentsLoadingDialog";
import { SellDocumentDeleteDialog } from "./sellDocument-delete-dialog/SellDocumentDeleteDialog";
import { SellDocumentsCard } from "./SellDocumentsCard";
import { SellDocumentsUIProvider } from "./SellDocumentsUIContext";
import { SellDocumentCancelAndResell } from "./sellDocument-cancelAndResell/SellDocumentCancelAndResell";

export function SellDocumentsPage({ history }) {
  const sellDocumentsUIEvents = {
    newSellDocumentButtonClick: () => {
      history.push("/sell/sellDocuments/new");
    },
    openEditSellDocumentPage: (id) => {
      history.push(`/sell/sellDocuments/${id}/edit`);
    },
    openDeleteSellDocumentDialog: (id) => {
      history.push(`/sell/sellDocuments/${id}/delete`);
    },
    openDeleteSellDocumentsDialog: () => {
      history.push(`/sell/sellDocuments/deleteSellDocuments`);
    },
    openFetchSellDocumentsDialog: () => {
      history.push(`/sell/sellDocuments/fetch`);
    },
    openUpdateSellDocumentsStatusDialog: () => {
      history.push("/sell/sellDocuments/updateStatus");
    },
    openCancelAndResellDialog: (id) => {
      history.push(`/sell/sellDocuments/${id}/cancelAndResell`);
    },
  };
  
  return (
    <SellDocumentsUIProvider sellDocumentsUIEvents={sellDocumentsUIEvents}>
      <SellDocumentsLoadingDialog />
      <Route path="/sell/sellDocuments/:id/delete">
        {({ history, match }) => (
          <SellDocumentDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/sell/sellDocuments");
            }}
          />
        )}
      </Route>
      <Route path="/sell/sellDocuments/:id/cancelAndResell">
        {({ history, match }) => (
          <SellDocumentCancelAndResell
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              !!match && !!match.params.id && history.push(`/sell/sellDocuments/${match.params.id}/renew`);
            }}
          />
        )}
      </Route>
      <SellDocumentsCard history={history}/>
    </SellDocumentsUIProvider>
  );
}