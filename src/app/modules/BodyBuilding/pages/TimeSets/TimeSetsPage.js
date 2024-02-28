import { Route } from "react-router-dom";
import { TimeSetsLoadingDialog } from "./TimeSets-loading-dialog/TimeSetsLoadingDialog";
import { TimeSetDeleteDialog } from "./TimeSet-delete-dialog/TimeSetDeleteDialog";
import { TimeSetsCard } from "./TimeSetsCard";
import { TimeSetsUIProvider } from "./TimeSetsUIContext";

export function TimeSetsPage({ history }) {
  const timeSetsUIEvents = {
    newTimeSetButtonClick: () => {
      history.push("/BodyBuilding/TimeSets/new");
    },
    openEditTimeSetPage: (id) => {
      history.push(`/BodyBuilding/TimeSets/${id}/edit`);
    },
    openDeleteTimeSetDialog: (id) => {
      history.push(`/BodyBuilding/TimeSets/${id}/delete`);
    },
    openDeleteTimeSetsDialog: () => {
      history.push(`/BodyBuilding/TimeSets/deleteTimeSets`);
    },
    openFetchTimeSetsDialog: () => {
      history.push(`/BodyBuilding/TimeSets/fetch`);
    },
    openUpdateTimeSetsStatusDialog: () => {
      history.push("/BodyBuilding/TimeSets/updateStatus");
    },
  };

  return (
    <TimeSetsUIProvider timeSetsUIEvents={timeSetsUIEvents}>
      <TimeSetsLoadingDialog />
      <Route path="/BodyBuilding/TimeSets/:id/delete">
        {({ history, match }) => (
          <TimeSetDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/BodyBuilding/TimeSets");
            }}
          />
        )}
      </Route>
      <TimeSetsCard />
    </TimeSetsUIProvider>
  );
}
