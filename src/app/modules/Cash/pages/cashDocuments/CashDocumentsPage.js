import React from "react";
import { Route } from "react-router-dom";
import { CashDocumentsLoadingDialog } from "./cashDocuments-loading-dialog/CashDocumentsLoadingDialog";
import { CashDocumentDeleteDialog } from "./cashDocument-delete-dialog/CashDocumentDeleteDialog";
import { CashDocumentsCard } from "./CashDocumentsCard";
import { CashDocumentsUIProvider } from "./CashDocumentsUIContext";
import { CloseCash } from "./cashDocumet-closeCash/CloseCash";

export function CashDocumentsPage({ history }) {
  const cashDocumentsUIEvents = {
    newCashDocumentButtonClick: () => {
      history.push("/cash/cashDocuments/new");
    },
    openEditCashDocumentPage: (id) => {
      history.push(`/cash/cashDocuments/${id}/edit`);
    },
    openDeleteCashDocumentDialog: (id) => {
      history.push(`/cash/cashDocuments/${id}/delete`);
    },
    openDeleteCashDocumentsDialog: () => {
      history.push(`/cash/cashDocuments/deleteCashDocuments`);
    },
    openFetchCashDocumentsDialog: () => {
      history.push(`/cash/cashDocuments/fetch`);
    },
    openUpdateCashDocumentsStatusDialog: () => {
      history.push("/cash/cashDocuments/updateStatus");
    },
    openCloseCashDialog: () => {
      history.push(`/cash/cashDocuments/closeCash`);
    },
  };

  return (
    <CashDocumentsUIProvider cashDocumentsUIEvents={cashDocumentsUIEvents}>
      <CashDocumentsLoadingDialog />
      <Route path="/cash/cashDocuments/:id/delete">
        {({ history, match }) => (
          <CashDocumentDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/cashDocuments");
            }}
          />
        )}
      </Route>

      <Route path="/cash/cashDocuments/closeCash">
        {({ history, match }) => (
          <CloseCash
            show={match != null}
            onHide={() => {
              history.push("/cash/cashDocuments");
            }}
          />
        )}
      </Route>
      <CashDocumentsCard />
    </CashDocumentsUIProvider>
  );
}
