import React from "react";
import { Route } from "react-router-dom";
import { EmployeeInIODevicesLoadingDialog } from "./employeeInIODevices-loading-dialog/EmployeeInIODevicesLoadingDialog";
import { EmployeeInIODeviceDeleteDialog } from "./employeeInIODevice-delete-dialog/EmployeeInIODeviceDeleteDialog";
import { EmployeeInIODevicesCard } from "./EmployeeInIODevicesCard";
import { EmployeeInIODevicesUIProvider } from "./EmployeeInIODevicesUIContext";

export function EmployeeInIODevicesPage({ history }) {
  const employeeInIODevicesUIEvents = {
    newEmployeeInIODeviceButtonClick: () => {
      history.push("/employment/employeeInIODevices/new");
    },
    openEditEmployeeInIODevicePage: (id) => {
      history.push(`/employment/employeeInIODevices/${id}/edit`);
    },
    openDeleteEmployeeInIODeviceDialog: (id) => {
      history.push(`/employment/employeeInIODevices/${id}/delete`);
    },
    openDeleteEmployeeInIODevicesDialog: () => {
      history.push(`/employment/employeeInIODevices/deleteEmployeeInIODevices`);
    },
    openFetchEmployeeInIODevicesDialog: () => {
      history.push(`/employment/employeeInIODevices/fetch`);
    },
    openUpdateEmployeeInIODevicesStatusDialog: () => {
      history.push("/employment/employeeInIODevices/updateStatus");
    },
  };

  return (
    <EmployeeInIODevicesUIProvider
      employeeInIODevicesUIEvents={employeeInIODevicesUIEvents}
    >
      <EmployeeInIODevicesLoadingDialog />
      <Route path="/employment/employeeInIODevices/:id/delete">
        {({ history, match }) => (
          <EmployeeInIODeviceDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employeeInIODevices");
            }}
          />
        )}
      </Route>
      <EmployeeInIODevicesCard />
    </EmployeeInIODevicesUIProvider>
  );
}
