import React from "react";
import { Route } from "react-router-dom";
import { InsuranceJobsLoadingDialog } from "./insuranceJobs-loading-dialog/InsuranceJobsLoadingDialog";
import { InsuranceJobDeleteDialog } from "./insuranceJob-delete-dialog/InsuranceJobDeleteDialog";
import { InsuranceJobsCard } from "./InsuranceJobsCard";
import { InsuranceJobsUIProvider } from "./InsuranceJobsUIContext";

export function InsuranceJobsPage({ history }) {
  const insuranceJobsUIEvents = {
    newInsuranceJobButtonClick: () => {
      history.push("/employment/insuranceJobs/new");
    },
    openEditInsuranceJobPage: (id) => {
      history.push(`/employment/insuranceJobs/${id}/edit`);
    },
    openDeleteInsuranceJobDialog: (id) => {
      history.push(`/employment/insuranceJobs/${id}/delete`);
    },
    openDeleteInsuranceJobsDialog: () => {
      history.push(`/employment/insuranceJobs/deleteInsuranceJobs`);
    },
    openFetchInsuranceJobsDialog: () => {
      history.push(`/employment/insuranceJobs/fetch`);
    },
    openUpdateInsuranceJobsStatusDialog: () => {
      history.push("/employment/insuranceJobs/updateStatus");
    },
  };
  
  return (
    <InsuranceJobsUIProvider insuranceJobsUIEvents={insuranceJobsUIEvents}>
      <InsuranceJobsLoadingDialog />
      <Route path="/employment/insuranceJobs/:id/delete">
        {({ history, match }) => (
          <InsuranceJobDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/insuranceJobs");
            }}
          />
        )}
      </Route>
      <InsuranceJobsCard />
    </InsuranceJobsUIProvider>
  );
}