import React from "react";
import { Route } from "react-router-dom";
import { RewardOrPenaltyTypesLoadingDialog } from "./rewardOrPenaltyTypes-loading-dialog/RewardOrPenaltyTypesLoadingDialog";
import { RewardOrPenaltyTypeDeleteDialog } from "./rewardOrPenaltyType-delete-dialog/RewardOrPenaltyTypeDeleteDialog";
import { RewardOrPenaltyTypesCard } from "./RewardOrPenaltyTypesCard";
import { RewardOrPenaltyTypesUIProvider } from "./RewardOrPenaltyTypesUIContext";

export function RewardOrPenaltyTypesPage({ history }) {
  const rewardOrPenaltyTypesUIEvents = {
    newRewardOrPenaltyTypeButtonClick: () => {
      history.push("/employment/rewardOrPenaltyTypes/new");
    },
    openEditRewardOrPenaltyTypePage: (id) => {
      history.push(`/employment/rewardOrPenaltyTypes/${id}/edit`);
    },
    openDeleteRewardOrPenaltyTypeDialog: (id) => {
      history.push(`/employment/rewardOrPenaltyTypes/${id}/delete`);
    },
    openDeleteRewardOrPenaltyTypesDialog: () => {
      history.push(`/employment/rewardOrPenaltyTypes/deleteRewardOrPenaltyTypes`);
    },
    openFetchRewardOrPenaltyTypesDialog: () => {
      history.push(`/employment/rewardOrPenaltyTypes/fetch`);
    },
    openUpdateRewardOrPenaltyTypesStatusDialog: () => {
      history.push("/employment/rewardOrPenaltyTypes/updateStatus");
    },
  };
  
  return (
    <RewardOrPenaltyTypesUIProvider rewardOrPenaltyTypesUIEvents={rewardOrPenaltyTypesUIEvents}>
      <RewardOrPenaltyTypesLoadingDialog />
      <Route path="/employment/rewardOrPenaltyTypes/:id/delete">
        {({ history, match }) => (
          <RewardOrPenaltyTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/rewardOrPenaltyTypes");
            }}
          />
        )}
      </Route>
      <RewardOrPenaltyTypesCard />
    </RewardOrPenaltyTypesUIProvider>
  );
}