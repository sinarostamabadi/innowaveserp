import { Route } from "react-router-dom";
import { PacksLoadingDialog } from "./Packs-loading-dialog/PacksLoadingDialog";
import { PackDeleteDialog } from "./Pack-delete-dialog/PackDeleteDialog";
import { PacksCard } from "./PacksCard";
import { PacksUIProvider } from "./PacksUIContext";

export function PacksPage({ history }) {
  const packsUIEvents = {
    newPackButtonClick: () => {
      history.push("/BodyBuilding/Packs/new");
    },
    openEditPackPage: (id) => {
      history.push(`/BodyBuilding/Packs/${id}/edit`);
    },
    openDeletePackDialog: (id) => {
      history.push(`/BodyBuilding/Packs/${id}/delete`);
    },
    openDeletePacksDialog: () => {
      history.push(`/BodyBuilding/Packs/deletePacks`);
    },
    openFetchPacksDialog: () => {
      history.push(`/BodyBuilding/Packs/fetch`);
    },
    openUpdatePacksStatusDialog: () => {
      history.push("/BodyBuilding/Packs/updateStatus");
    },
  };

  return (
    <PacksUIProvider packsUIEvents={packsUIEvents}>
      <PacksLoadingDialog />
      <Route path="/BodyBuilding/Packs/:id/delete">
        {({ history, match }) => (
          <PackDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/BodyBuilding/Packs");
            }}
          />
        )}
      </Route>
      <PacksCard />
    </PacksUIProvider>
  );
}
