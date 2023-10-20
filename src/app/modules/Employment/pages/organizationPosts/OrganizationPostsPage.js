import React from "react";
import { Route } from "react-router-dom";
import { OrganizationPostsLoadingDialog } from "./organizationPosts-loading-dialog/OrganizationPostsLoadingDialog";
import { OrganizationPostDeleteDialog } from "./organizationPost-delete-dialog/OrganizationPostDeleteDialog";
import { OrganizationPostsCard } from "./OrganizationPostsCard";
import { OrganizationPostsUIProvider } from "./OrganizationPostsUIContext";

export function OrganizationPostsPage({ history }) {
  const organizationPostsUIEvents = {
    newOrganizationPostButtonClick: () => {
      history.push("/employment/organizationPosts/new");
    },
    openEditOrganizationPostPage: (id) => {
      history.push(`/employment/organizationPosts/${id}/edit`);
    },
    openDeleteOrganizationPostDialog: (id) => {
      history.push(`/employment/organizationPosts/${id}/delete`);
    },
    openDeleteOrganizationPostsDialog: () => {
      history.push(`/employment/organizationPosts/deleteOrganizationPosts`);
    },
    openFetchOrganizationPostsDialog: () => {
      history.push(`/employment/organizationPosts/fetch`);
    },
    openUpdateOrganizationPostsStatusDialog: () => {
      history.push("/employment/organizationPosts/updateStatus");
    },
  };
  
  return (
    <OrganizationPostsUIProvider organizationPostsUIEvents={organizationPostsUIEvents}>
      <OrganizationPostsLoadingDialog />
      <Route path="/employment/organizationPosts/:id/delete">
        {({ history, match }) => (
          <OrganizationPostDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/organizationPosts");
            }}
          />
        )}
      </Route>
      <OrganizationPostsCard />
    </OrganizationPostsUIProvider>
  );
}