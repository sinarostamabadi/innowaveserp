
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { AssignmentSerialsTable } from "./assignmentSerials-table/AssignmentSerialsTable";
import { useAssignmentSerialsUIContext, AssignmentSerialsUIConsumer } from "./AssignmentSerialsUIContext";
import { useTranslation } from 'react-i18next';

export function AssignmentSerialsCard() {
  const { t } = useTranslation();

  const assignmentSerialsUIContext = useAssignmentSerialsUIContext();

  const assignmentSerialsUIProps = useMemo(() => {
    return {
      ids: assignmentSerialsUIContext.ids,
      queryParams: assignmentSerialsUIContext.queryParams,
      setQueryParams: assignmentSerialsUIContext.setQueryParams,
      newAssignmentSerialButtonClick: assignmentSerialsUIContext.newAssignmentSerialButtonClick,
      openDeleteAssignmentSerialsDialog: assignmentSerialsUIContext.openDeleteAssignmentSerialsDialog,
      openEditAssignmentSerialPage: assignmentSerialsUIContext.openEditAssignmentSerialPage,
      openUpdateAssignmentSerialsStatusDialog: assignmentSerialsUIContext.openUpdateAssignmentSerialsStatusDialog,
      openFetchAssignmentSerialsDialog: assignmentSerialsUIContext.openFetchAssignmentSerialsDialog,
    };
  }, [assignmentSerialsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("AssignmentSerial.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={assignmentSerialsUIProps.newAssignmentSerialButtonClick}
          >
            {t("AssignmentSerial.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AssignmentSerialsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </AssignmentSerialsUIConsumer>
        <AssignmentSerialsTable />
      </CardBody>
    </Card>
  );
}