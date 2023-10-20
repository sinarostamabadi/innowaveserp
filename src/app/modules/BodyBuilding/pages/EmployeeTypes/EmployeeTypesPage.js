import { Route } from "react-router-dom";
import { EmployeeTypesLoadingDialog } from "./EmployeeTypes-loading-dialog/EmployeeTypesLoadingDialog";
import { EmployeeTypeDeleteDialog } from "./EmployeeType-delete-dialog/EmployeeTypeDeleteDialog";
import { EmployeeTypesCard } from "./EmployeeTypesCard";
import { EmployeeTypesUIProvider } from "./EmployeeTypesUIContext";

export function EmployeeTypesPage({ history }) {
  const employeeTypesUIEvents = {
    newEmployeeTypeButtonClick: () => {
      history.push("/BodyBuilding/EmployeeTypes/new");
    },
    openEditEmployeeTypePage: (id) => {
      history.push(`/BodyBuilding/EmployeeTypes/${id}/edit`);
    },
    openDeleteEmployeeTypeDialog: (id) => {
      history.push(`/BodyBuilding/EmployeeTypes/${id}/delete`);
    },
    openDeleteEmployeeTypesDialog: () => {
      history.push(`/BodyBuilding/EmployeeTypes/deleteEmployeeTypes`);
    },
    openFetchEmployeeTypesDialog: () => {
      history.push(`/BodyBuilding/EmployeeTypes/fetch`);
    },
    openUpdateEmployeeTypesStatusDialog: () => {
      history.push("/BodyBuilding/EmployeeTypes/updateStatus");
    },
  };
  
  return (
    <EmployeeTypesUIProvider employeeTypesUIEvents={employeeTypesUIEvents}>
      <EmployeeTypesLoadingDialog />
      <Route path="/BodyBuilding/EmployeeTypes/:id/delete">
        {({ history, match }) => (
          <EmployeeTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/BodyBuilding/EmployeeTypes");
            }}
          />
        )}
      </Route>
      <EmployeeTypesCard />
    </EmployeeTypesUIProvider>
  );
}