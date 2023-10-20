
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeeWorkExperiencesTable } from "./employeeWorkExperiences-table/EmployeeWorkExperiencesTable";
import { useEmployeeWorkExperiencesUIContext, EmployeeWorkExperiencesUIConsumer } from "./EmployeeWorkExperiencesUIContext";
import { useTranslation } from 'react-i18next';

export function EmployeeWorkExperiencesCard() {
  const { t } = useTranslation();

  const employeeWorkExperiencesUIContext = useEmployeeWorkExperiencesUIContext();

  const employeeWorkExperiencesUIProps = useMemo(() => {
    return {
      ids: employeeWorkExperiencesUIContext.ids,
      queryParams: employeeWorkExperiencesUIContext.queryParams,
      setQueryParams: employeeWorkExperiencesUIContext.setQueryParams,
      newEmployeeWorkExperienceButtonClick: employeeWorkExperiencesUIContext.newEmployeeWorkExperienceButtonClick,
      openDeleteEmployeeWorkExperiencesDialog: employeeWorkExperiencesUIContext.openDeleteEmployeeWorkExperiencesDialog,
      openEditEmployeeWorkExperiencePage: employeeWorkExperiencesUIContext.openEditEmployeeWorkExperiencePage,
      openUpdateEmployeeWorkExperiencesStatusDialog: employeeWorkExperiencesUIContext.openUpdateEmployeeWorkExperiencesStatusDialog,
      openFetchEmployeeWorkExperiencesDialog: employeeWorkExperiencesUIContext.openFetchEmployeeWorkExperiencesDialog,
    };
  }, [employeeWorkExperiencesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("EmployeeWorkExperience.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={employeeWorkExperiencesUIProps.newEmployeeWorkExperienceButtonClick}
          >
            {t("EmployeeWorkExperience.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeeWorkExperiencesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeeWorkExperiencesUIConsumer>
        <EmployeeWorkExperiencesTable />
      </CardBody>
    </Card>
  );
}