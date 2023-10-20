import React from "react";
import { Route } from "react-router-dom";
import { ReservesLoadingDialog } from "./reserves-loading-dialog/ReservesLoadingDialog";
import { ReserveDeleteDialog } from "./reserve-delete-dialog/ReserveDeleteDialog";
import { ReserveRelocation } from "./reserves-relocation/ReserveRelocation";
import { ReserveDoneDialog } from "./reserve-done-dialog/ReserveDoneDialog";
import { ReserveAddTimeDialog } from "./reserve-addtime-dialog/ReserveAddTimeDialog";
import { ReservesCard } from "./ReservesCard";
import { ReservesUIProvider } from "./ReservesUIContext";

import { ReserveReport } from "./reserves-report/ReserveReport";

export function ReservesPage({ history }) {
  const reservesUIEvents = {
    newReserveButtonClick: () => {
      history.push("/bowling/reserves/new");
    },
    openEditReservePage: (id) => {
      history.push(`/bowling/reserves/${id}/edit`);
    },
    openDeleteReserveDialog: (id) => {
      history.push(`/bowling/reserves/${id}/delete`);
    },
    openDoneReserveDialog: (id) => {
      history.push(`/bowling/reserves/${id}/done`);
    },
    openAddTimeReserveDialog: (id) => {
      history.push(`/bowling/reserves/${id}/addTime`);
    },
    openDeleteReservesDialog: () => {
      history.push(`/bowling/reserves/deleteReserves`);
    },
    openFetchReservesDialog: () => {
      history.push(`/bowling/reserves/fetch`);
    },
    openUpdateReservesStatusDialog: () => {
      history.push("/bowling/reserves/updateStatus");
    },
    openRelocationDialog: (id) => {
      history.push(`/bowling/reserves/${id}/relocation`);
    },
  };

  return (
    <ReservesUIProvider reservesUIEvents={reservesUIEvents}>
      <ReserveReport />
      <ReservesLoadingDialog />
      <Route path="/bowling/reserves/:id/delete">
        {({ history, match }) => (
          <ReserveDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bowling/reserves");
            }}
          />
        )}
      </Route>

      <Route path="/bowling/reserves/:id/done">
        {({ history, match }) => (
          <ReserveDoneDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bowling/reserves");
            }}
          />
        )}
      </Route>

      <Route path="/bowling/reserves/:id/addTime">
        {({ history, match }) => (
          <ReserveAddTimeDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bowling/reserves");
            }}
          />
        )}
      </Route>

      <Route path="/bowling/reserves/:id/relocation">
        {({ history, match }) => (
          <ReserveRelocation
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bowling/reserves");
            }}
          />
        )}
      </Route>
      <ReservesCard history={history}/>
    </ReservesUIProvider>
  );
}