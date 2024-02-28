import React from "react";
import { Route } from "react-router-dom";
import { SettingLoadingDialog } from "./setting-loading-dialog/SettingLoadingDialog";
import { SettingDeleteDialog } from "./setting-delete-dialog/SettingDeleteDialog";
import { SettingCard } from "./SettingCard";
import { SettingUIProvider } from "./SettingUIContext";

export function SettingPage({ history }) {
  const settingUIEvents = {
    newSettingButtonClick: () => {
      history.push("/general/setting/new");
    },
    openEditSettingPage: (id) => {
      history.push(`/general/setting/${id}/edit`);
    },
    openDeleteSettingDialog: (id) => {
      history.push(`/general/setting/${id}/delete`);
    },
    openDeleteSettingDialog: () => {
      history.push(`/general/setting/deleteSetting`);
    },
    openFetchSettingDialog: () => {
      history.push(`/general/setting/fetch`);
    },
    openUpdateSettingStatusDialog: () => {
      history.push("/general/setting/updateStatus");
    },
  };

  return (
    <SettingUIProvider settingUIEvents={settingUIEvents}>
      <SettingLoadingDialog />
      <Route path="/general/setting/:id/delete">
        {({ history, match }) => (
          <SettingDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/setting");
            }}
          />
        )}
      </Route>
      <SettingCard />
    </SettingUIProvider>
  );
}
