import React from "react";
import { Route } from "react-router-dom";
import { ClosetsLoadingDialog } from "./closets-loading-dialog/ClosetsLoadingDialog";
import { ClosetDeleteDialog } from "./closet-delete-dialog/ClosetDeleteDialog";
import { ClosetOpenDialog } from "./closet-open-dialog/ClosetOpenDialog";
import { ClosetFreeDialog } from "./closet-free-dialog/ClosetFreeDialog";
import { ClosetsCard } from "./ClosetsCard";
import { ClosetsUIProvider } from "./ClosetsUIContext";

export function ClosetsPage({ history }) {
  const closetsUIEvents = {
    newClosetButtonClick: () => {
      history.push("/BodyBuilding/closets/new");
    },
    openEditClosetPage: (id) => {
      history.push(`/BodyBuilding/closets/${id}/edit`);
    },
    openClosetOpenDialog: (id) => {
      history.push(`/BodyBuilding/closets/${id}/open`);
    },
    openClosetFreeDialog: (id) => {
      history.push(`/BodyBuilding/closets/${id}/free`);
    },
    openDeleteClosetDialog: (id) => {
      history.push(`/BodyBuilding/closets/${id}/delete`);
    },
    openDeleteClosetsDialog: () => {
      history.push(`/BodyBuilding/closets/deleteClosets`);
    },
    openFetchClosetsDialog: () => {
      history.push(`/BodyBuilding/closets/fetch`);
    },
    openUpdateClosetsStatusDialog: () => {
      history.push("/BodyBuilding/closets/updateStatus");
    },
  };
  
  return (
    <ClosetsUIProvider closetsUIEvents={closetsUIEvents}>
      <ClosetsLoadingDialog />
      <Route path="/BodyBuilding/closets/:id/delete">
        {({ history, match }) => (
          <ClosetDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/BodyBuilding/closets");
            }}
          />
        )}
      </Route>
      <Route path="/BodyBuilding/closets/:id/open">
        {({ history, match }) => (
          <ClosetOpenDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/BodyBuilding/closets");
            }}
          />
        )}
      </Route>
      <Route path="/BodyBuilding/closets/:id/free">
        {({ history, match }) => (
          <ClosetFreeDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/BodyBuilding/closets");
            }}
          />
        )}
      </Route>
      <ClosetsCard />
    </ClosetsUIProvider>
  );
}