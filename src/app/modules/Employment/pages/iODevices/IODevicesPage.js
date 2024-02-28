import React from "react";
import { Route } from "react-router-dom";
import { IODevicesLoadingDialog } from "./iODevices-loading-dialog/IODevicesLoadingDialog";
import { IODeviceDeleteDialog } from "./iODevice-delete-dialog/IODeviceDeleteDialog";
import { IODevicesCard } from "./IODevicesCard";
import { IODevicesUIProvider } from "./IODevicesUIContext";

export function IODevicesPage({ history }) {
  const iODevicesUIEvents = {
    newIODeviceButtonClick: () => {
      history.push("/employment/iODevices/new");
    },
    openEditIODevicePage: (id) => {
      history.push(`/employment/iODevices/${id}/edit`);
    },
    openDeleteIODeviceDialog: (id) => {
      history.push(`/employment/iODevices/${id}/delete`);
    },
    openDeleteIODevicesDialog: () => {
      history.push(`/employment/iODevices/deleteIODevices`);
    },
    openFetchIODevicesDialog: () => {
      history.push(`/employment/iODevices/fetch`);
    },
    openUpdateIODevicesStatusDialog: () => {
      history.push("/employment/iODevices/updateStatus");
    },
  };

  return (
    <IODevicesUIProvider iODevicesUIEvents={iODevicesUIEvents}>
      <IODevicesLoadingDialog />
      <Route path="/employment/iODevices/:id/delete">
        {({ history, match }) => (
          <IODeviceDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/iODevices");
            }}
          />
        )}
      </Route>
      <IODevicesCard />
    </IODevicesUIProvider>
  );
}
