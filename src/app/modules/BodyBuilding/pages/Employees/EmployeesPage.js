import { Route } from "react-router-dom";
import { EmployeesLoadingDialog } from "./Employees-loading-dialog/EmployeesLoadingDialog";
import { EmployeeDeleteDialog } from "./Employee-delete-dialog/EmployeeDeleteDialog";
import { EmployeesCard } from "./EmployeesCard";
import { EmployeesUIProvider } from "./EmployeesUIContext";

export function EmployeesPage({ history }) {
  const employeesUIEvents = {
    newEmployeeButtonClick: () => {
      history.push("/BodyBuilding/Employees/new");
    },
    openEditEmployeePage: (id) => {
      history.push(`/BodyBuilding/Employees/${id}/edit`);
    },
    openDeleteEmployeeDialog: (id) => {
      history.push(`/BodyBuilding/Employees/${id}/delete`);
    },
    openDeleteEmployeesDialog: () => {
      history.push(`/BodyBuilding/Employees/deleteEmployees`);
    },
    openFetchEmployeesDialog: () => {
      history.push(`/BodyBuilding/Employees/fetch`);
    },
    openUpdateEmployeesStatusDialog: () => {
      history.push("/BodyBuilding/Employees/updateStatus");
    },
  };
  
  return (
    <EmployeesUIProvider employeesUIEvents={employeesUIEvents}>
      <EmployeesLoadingDialog />
      <Route path="/BodyBuilding/Employees/:id/delete">
        {({ history, match }) => (
          <EmployeeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/BodyBuilding/Employees");
            }}
          />
        )}
      </Route>
      <EmployeesCard />
    </EmployeesUIProvider>
  );
}