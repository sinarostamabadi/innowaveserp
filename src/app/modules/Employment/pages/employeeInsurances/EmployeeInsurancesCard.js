import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeeInsurancesTable } from "./employeeInsurances-table/EmployeeInsurancesTable";
import {
  useEmployeeInsurancesUIContext,
  EmployeeInsurancesUIConsumer,
} from "./EmployeeInsurancesUIContext";
import { useTranslation } from "react-i18next";

export function EmployeeInsurancesCard() {
  const { t } = useTranslation();

  const employeeInsurancesUIContext = useEmployeeInsurancesUIContext();

  const employeeInsurancesUIProps = useMemo(() => {
    return {
      ids: employeeInsurancesUIContext.ids,
      queryParams: employeeInsurancesUIContext.queryParams,
      setQueryParams: employeeInsurancesUIContext.setQueryParams,
      newEmployeeInsuranceButtonClick:
        employeeInsurancesUIContext.newEmployeeInsuranceButtonClick,
      openDeleteEmployeeInsurancesDialog:
        employeeInsurancesUIContext.openDeleteEmployeeInsurancesDialog,
      openEditEmployeeInsurancePage:
        employeeInsurancesUIContext.openEditEmployeeInsurancePage,
      openUpdateEmployeeInsurancesStatusDialog:
        employeeInsurancesUIContext.openUpdateEmployeeInsurancesStatusDialog,
      openFetchEmployeeInsurancesDialog:
        employeeInsurancesUIContext.openFetchEmployeeInsurancesDialog,
    };
  }, [employeeInsurancesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("EmployeeInsurance.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={employeeInsurancesUIProps.newEmployeeInsuranceButtonClick}
          >
            {t("EmployeeInsurance.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeeInsurancesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeeInsurancesUIConsumer>
        <EmployeeInsurancesTable />
      </CardBody>
    </Card>
  );
}
