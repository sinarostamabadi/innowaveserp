import React from "react";
import { Route } from "react-router-dom";
import { MajorsLoadingDialog } from "./majors-loading-dialog/MajorsLoadingDialog";
import { MajorDeleteDialog } from "./major-delete-dialog/MajorDeleteDialog";
import { MajorsCard } from "./MajorsCard";
import { MajorsUIProvider } from "./MajorsUIContext";

export function MajorsPage({ history }) {
  const majorsUIEvents = {
    newMajorButtonClick: () => {
      history.push("/general/majors/new");
    },
    openEditMajorPage: (id) => {
      history.push(`/general/majors/${id}/edit`);
    },
    openDeleteMajorDialog: (id) => {
      history.push(`/general/majors/${id}/delete`);
    },
    openDeleteMajorsDialog: () => {
      history.push(`/general/majors/deleteMajors`);
    },
    openFetchMajorsDialog: () => {
      history.push(`/general/majors/fetch`);
    },
    openUpdateMajorsStatusDialog: () => {
      history.push("/general/majors/updateStatus");
    },
  };
  
  return (
    <MajorsUIProvider majorsUIEvents={majorsUIEvents}>
      <MajorsLoadingDialog />
      <Route path="/general/majors/:id/delete">
        {({ history, match }) => (
          <MajorDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/majors");
            }}
          />
        )}
      </Route>
      <MajorsCard />
    </MajorsUIProvider>
  );
}