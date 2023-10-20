import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { AdvancedFilter } from "src/core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeesTable } from "./Employees-table/EmployeesTable";
import { useEmployeesUIContext, EmployeesUIConsumer } from "./EmployeesUIContext";

export function EmployeesCard() {
  const { t } = useTranslation();

  const uiContext = useEmployeesUIContext();
  const uiProps = useMemo(() => {
    return {
      newEmployee: uiContext.newEmployeeButtonClick,
    };
  }, [uiContext]);

  return (
    <>
      <Card>
        <CardHeader
          title={t("Common.List") + " " + t("BodyBuildingEmployee.Entity")}
        >
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={uiProps.newEmployee}
            >
              <i className="fa fa-plus"></i> {t("Common.New")}
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <EmployeesUIConsumer>
            {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
          </EmployeesUIConsumer>
          <EmployeesTable />
        </CardBody>
      </Card>
    </>
  );
}
