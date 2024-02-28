import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeeRewardPenaltiesTable } from "./employeeRewardPenalties-table/EmployeeRewardPenaltiesTable";
import {
  useEmployeeRewardPenaltiesUIContext,
  EmployeeRewardPenaltiesUIConsumer,
} from "./EmployeeRewardPenaltiesUIContext";
import { useTranslation } from "react-i18next";

export function EmployeeRewardPenaltiesCard() {
  const { t } = useTranslation();

  const employeeRewardPenaltiesUIContext =
    useEmployeeRewardPenaltiesUIContext();

  const employeeRewardPenaltiesUIProps = useMemo(() => {
    return {
      ids: employeeRewardPenaltiesUIContext.ids,
      queryParams: employeeRewardPenaltiesUIContext.queryParams,
      setQueryParams: employeeRewardPenaltiesUIContext.setQueryParams,
      newEmployeeRewardPenaltyButtonClick:
        employeeRewardPenaltiesUIContext.newEmployeeRewardPenaltyButtonClick,
      openDeleteEmployeeRewardPenaltiesDialog:
        employeeRewardPenaltiesUIContext.openDeleteEmployeeRewardPenaltiesDialog,
      openEditEmployeeRewardPenaltyPage:
        employeeRewardPenaltiesUIContext.openEditEmployeeRewardPenaltyPage,
      openUpdateEmployeeRewardPenaltiesStatusDialog:
        employeeRewardPenaltiesUIContext.openUpdateEmployeeRewardPenaltiesStatusDialog,
      openFetchEmployeeRewardPenaltiesDialog:
        employeeRewardPenaltiesUIContext.openFetchEmployeeRewardPenaltiesDialog,
    };
  }, [employeeRewardPenaltiesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("EmployeeRewardPenalty.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              employeeRewardPenaltiesUIProps.newEmployeeRewardPenaltyButtonClick
            }
          >
            {t("EmployeeRewardPenalty.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeeRewardPenaltiesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeeRewardPenaltiesUIConsumer>
        <EmployeeRewardPenaltiesTable />
      </CardBody>
    </Card>
  );
}
