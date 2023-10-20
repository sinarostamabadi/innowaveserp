import React from "react";
import { Route } from "react-router-dom";
import { EmployeeRewardPenaltiesLoadingDialog } from "./employeeRewardPenalties-loading-dialog/EmployeeRewardPenaltiesLoadingDialog";
import { EmployeeRewardPenaltyDeleteDialog } from "./employeeRewardPenalty-delete-dialog/EmployeeRewardPenaltyDeleteDialog";
import { EmployeeRewardPenaltiesCard } from "./EmployeeRewardPenaltiesCard";
import { EmployeeRewardPenaltiesUIProvider } from "./EmployeeRewardPenaltiesUIContext";

export function EmployeeRewardPenaltiesPage({ history }) {
  const employeeRewardPenaltiesUIEvents = {
    newEmployeeRewardPenaltyButtonClick: () => {
      history.push("/employment/employeeRewardPenalties/new");
    },
    openEditEmployeeRewardPenaltyPage: (id) => {
      history.push(`/employment/employeeRewardPenalties/${id}/edit`);
    },
    openDeleteEmployeeRewardPenaltyDialog: (id) => {
      history.push(`/employment/employeeRewardPenalties/${id}/delete`);
    },
    openDeleteEmployeeRewardPenaltiesDialog: () => {
      history.push(`/employment/employeeRewardPenalties/deleteEmployeeRewardPenalties`);
    },
    openFetchEmployeeRewardPenaltiesDialog: () => {
      history.push(`/employment/employeeRewardPenalties/fetch`);
    },
    openUpdateEmployeeRewardPenaltiesStatusDialog: () => {
      history.push("/employment/employeeRewardPenalties/updateStatus");
    },
  };
  
  return (
    <EmployeeRewardPenaltiesUIProvider employeeRewardPenaltiesUIEvents={employeeRewardPenaltiesUIEvents}>
      <EmployeeRewardPenaltiesLoadingDialog />
      <Route path="/employment/employeeRewardPenalties/:id/delete">
        {({ history, match }) => (
          <EmployeeRewardPenaltyDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employeeRewardPenalties");
            }}
          />
        )}
      </Route>
      <EmployeeRewardPenaltiesCard />
    </EmployeeRewardPenaltiesUIProvider>
  );
}