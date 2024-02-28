import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeePromissoryNotesTable } from "./employeePromissoryNotes-table/EmployeePromissoryNotesTable";
import {
  useEmployeePromissoryNotesUIContext,
  EmployeePromissoryNotesUIConsumer,
} from "./EmployeePromissoryNotesUIContext";
import { useTranslation } from "react-i18next";

export function EmployeePromissoryNotesCard() {
  const { t } = useTranslation();

  const employeePromissoryNotesUIContext =
    useEmployeePromissoryNotesUIContext();

  const employeePromissoryNotesUIProps = useMemo(() => {
    return {
      ids: employeePromissoryNotesUIContext.ids,
      queryParams: employeePromissoryNotesUIContext.queryParams,
      setQueryParams: employeePromissoryNotesUIContext.setQueryParams,
      newEmployeePromissoryNoteButtonClick:
        employeePromissoryNotesUIContext.newEmployeePromissoryNoteButtonClick,
      openDeleteEmployeePromissoryNotesDialog:
        employeePromissoryNotesUIContext.openDeleteEmployeePromissoryNotesDialog,
      openEditEmployeePromissoryNotePage:
        employeePromissoryNotesUIContext.openEditEmployeePromissoryNotePage,
      openUpdateEmployeePromissoryNotesStatusDialog:
        employeePromissoryNotesUIContext.openUpdateEmployeePromissoryNotesStatusDialog,
      openFetchEmployeePromissoryNotesDialog:
        employeePromissoryNotesUIContext.openFetchEmployeePromissoryNotesDialog,
    };
  }, [employeePromissoryNotesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("EmployeePromissoryNote.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              employeePromissoryNotesUIProps.newEmployeePromissoryNoteButtonClick
            }
          >
            {t("EmployeePromissoryNote.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeePromissoryNotesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeePromissoryNotesUIConsumer>
        <EmployeePromissoryNotesTable />
      </CardBody>
    </Card>
  );
}
