import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeeContractsTable } from "./employeeContracts-table/EmployeeContractsTable";
import {
  useEmployeeContractsUIContext,
  EmployeeContractsUIConsumer,
} from "./EmployeeContractsUIContext";
import { useTranslation } from "react-i18next";

export function EmployeeContractsCard() {
  const { t } = useTranslation();

  const employeeContractsUIContext = useEmployeeContractsUIContext();

  const employeeContractsUIProps = useMemo(() => {
    return {
      ids: employeeContractsUIContext.ids,
      queryParams: employeeContractsUIContext.queryParams,
      setQueryParams: employeeContractsUIContext.setQueryParams,
      newEmployeeContractButtonClick:
        employeeContractsUIContext.newEmployeeContractButtonClick,
      openDeleteEmployeeContractsDialog:
        employeeContractsUIContext.openDeleteEmployeeContractsDialog,
      openEditEmployeeContractPage:
        employeeContractsUIContext.openEditEmployeeContractPage,
      openUpdateEmployeeContractsStatusDialog:
        employeeContractsUIContext.openUpdateEmployeeContractsStatusDialog,
      openFetchEmployeeContractsDialog:
        employeeContractsUIContext.openFetchEmployeeContractsDialog,
    };
  }, [employeeContractsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("EmployeeContract.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={employeeContractsUIProps.newEmployeeContractButtonClick}
          >
            {t("EmployeeContract.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeeContractsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeeContractsUIConsumer>
        <EmployeeContractsTable />
      </CardBody>
    </Card>
  );
}
