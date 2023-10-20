import React from "react";
import { Route } from "react-router-dom";
import { BowlingTeamsLoadingDialog } from "./bowlingTeams-loading-dialog/BowlingTeamsLoadingDialog";
import { BowlingTeamDeleteDialog } from "./bowlingTeam-delete-dialog/BowlingTeamDeleteDialog";
import { BowlingTeamsCard } from "./BowlingTeamsCard";
import { BowlingTeamsUIProvider } from "./BowlingTeamsUIContext";

export function BowlingTeamsPage({ history }) {
  const bowlingTeamsUIEvents = {
    newBowlingTeamButtonClick: () => {
      history.push("/bowling/bowlingTeams/new");
    },
    openEditBowlingTeamPage: (id) => {
      history.push(`/bowling/bowlingTeams/${id}/edit`);
    },
    openDeleteBowlingTeamDialog: (id) => {
      history.push(`/bowling/bowlingTeams/${id}/delete`);
    },
    openDeleteBowlingTeamsDialog: () => {
      history.push(`/bowling/bowlingTeams/deleteBowlingTeams`);
    },
    openFetchBowlingTeamsDialog: () => {
      history.push(`/bowling/bowlingTeams/fetch`);
    },
    openUpdateBowlingTeamsStatusDialog: () => {
      history.push("/bowling/bowlingTeams/updateStatus");
    },
  };

  return (
    <BowlingTeamsUIProvider bowlingTeamsUIEvents={bowlingTeamsUIEvents}>
      <BowlingTeamsLoadingDialog />
      <Route path="/bowling/bowlingTeams/:id/delete">
        {({ history, match }) => (
          <BowlingTeamDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bowling/bowlingTeams");
            }}
          />
        )}
      </Route>
      <BowlingTeamsCard />
    </BowlingTeamsUIProvider>
  );
}