import React from "react";
import { Route } from "react-router-dom";
import { InquiryDetailsLoadingDialog } from "./inquiryDetails-loading-dialog/InquiryDetailsLoadingDialog";
import { InquiryDetailDeleteDialog } from "./inquiryDetail-delete-dialog/InquiryDetailDeleteDialog";
import { InquiryDetailsCard } from "./InquiryDetailsCard";
import { InquiryDetailsUIProvider } from "./InquiryDetailsUIContext";

export function InquiryDetailsPage({ history }) {
  const inquiryDetailsUIEvents = {
    newInquiryDetailButtonClick: () => {
      history.push("/purchaseOrder/inquiryDetails/new");
    },
    openEditInquiryDetailPage: (id) => {
      history.push(`/purchaseOrder/inquiryDetails/${id}/edit`);
    },
    openDeleteInquiryDetailDialog: (id) => {
      history.push(`/purchaseOrder/inquiryDetails/${id}/delete`);
    },
    openDeleteInquiryDetailsDialog: () => {
      history.push(`/purchaseOrder/inquiryDetails/deleteInquiryDetails`);
    },
    openFetchInquiryDetailsDialog: () => {
      history.push(`/purchaseOrder/inquiryDetails/fetch`);
    },
    openUpdateInquiryDetailsStatusDialog: () => {
      history.push("/purchaseOrder/inquiryDetails/updateStatus");
    },
  };
  
  return (
    <InquiryDetailsUIProvider inquiryDetailsUIEvents={inquiryDetailsUIEvents}>
      <InquiryDetailsLoadingDialog />
      <Route path="/purchaseOrder/inquiryDetails/:id/delete">
        {({ history, match }) => (
          <InquiryDetailDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/purchaseOrder/inquiryDetails");
            }}
          />
        )}
      </Route>
      <InquiryDetailsCard />
    </InquiryDetailsUIProvider>
  );
}