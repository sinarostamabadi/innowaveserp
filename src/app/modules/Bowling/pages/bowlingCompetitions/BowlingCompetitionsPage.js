import React from "react";
import { Route } from "react-router-dom";
import { BowlingCompetitionsLoadingDialog } from "./bowlingCompetitions-loading-dialog/BowlingCompetitionsLoadingDialog";
import { BowlingCompetitionDeleteDialog } from "./bowlingCompetition-delete-dialog/BowlingCompetitionDeleteDialog";
import { BowlingCompetitionsCard } from "./BowlingCompetitionsCard";
import { BowlingCompetitionsUIProvider } from "./BowlingCompetitionsUIContext";

export function BowlingCompetitionsPage({ history }) {
  const bowlingCompetitionsUIEvents = {
    newBowlingCompetitionButtonClick: () => {
      history.push("/bowling/bowlingCompetitions/new");
    },
    openEditBowlingCompetitionPage: (id) => {
      history.push(`/bowling/bowlingCompetitions/${id}/edit`);
    },
    openDeleteBowlingCompetitionDialog: (id) => {
      history.push(`/bowling/bowlingCompetitions/${id}/delete`);
    },
    openDeleteBowlingCompetitionsDialog: () => {
      history.push(`/bowling/bowlingCompetitions/deleteBowlingCompetitions`);
    },
    openFetchBowlingCompetitionsDialog: () => {
      history.push(`/bowling/bowlingCompetitions/fetch`);
    },
    openUpdateBowlingCompetitionsStatusDialog: () => {
      history.push("/bowling/bowlingCompetitions/updateStatus");
    },
  };

  return (
    <BowlingCompetitionsUIProvider
      bowlingCompetitionsUIEvents={bowlingCompetitionsUIEvents}
    >
      <BowlingCompetitionsLoadingDialog />
      <Route path="/bowling/bowlingCompetitions/:id/delete">
        {({ history, match }) => (
          <BowlingCompetitionDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bowling/bowlingCompetitions");
            }}
          />
        )}
      </Route>
      <BowlingCompetitionsCard />
    </BowlingCompetitionsUIProvider>
  );
}
