import React from "react";
import { Route } from "react-router-dom";
import { JobsLoadingDialog } from "./jobs-loading-dialog/JobsLoadingDialog";
import { JobDeleteDialog } from "./job-delete-dialog/JobDeleteDialog";
import { JobsCard } from "./JobsCard";
import { JobsUIProvider } from "./JobsUIContext";

export function JobsPage({ history }) {
  const jobsUIEvents = {
    newJobButtonClick: () => {
      history.push("/employment/jobs/new");
    },
    openEditJobPage: (id) => {
      history.push(`/employment/jobs/${id}/edit`);
    },
    openDeleteJobDialog: (id) => {
      history.push(`/employment/jobs/${id}/delete`);
    },
    openDeleteJobsDialog: () => {
      history.push(`/employment/jobs/deleteJobs`);
    },
    openFetchJobsDialog: () => {
      history.push(`/employment/jobs/fetch`);
    },
    openUpdateJobsStatusDialog: () => {
      history.push("/employment/jobs/updateStatus");
    },
  };

  return (
    <JobsUIProvider jobsUIEvents={jobsUIEvents}>
      <JobsLoadingDialog />
      <Route path="/employment/jobs/:id/delete">
        {({ history, match }) => (
          <JobDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/jobs");
            }}
          />
        )}
      </Route>
      <JobsCard />
    </JobsUIProvider>
  );
}
