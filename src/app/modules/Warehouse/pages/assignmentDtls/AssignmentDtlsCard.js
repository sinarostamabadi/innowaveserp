
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { AssignmentDtlsTable } from "./assignmentDtls-table/AssignmentDtlsTable";
import { useAssignmentDtlsUIContext, AssignmentDtlsUIConsumer } from "./AssignmentDtlsUIContext";
import { useTranslation } from 'react-i18next';

export function AssignmentDtlsCard() {
  const { t } = useTranslation();

  const assignmentDtlsUIContext = useAssignmentDtlsUIContext();

  const assignmentDtlsUIProps = useMemo(() => {
    return {
      ids: assignmentDtlsUIContext.ids,
      queryParams: assignmentDtlsUIContext.queryParams,
      setQueryParams: assignmentDtlsUIContext.setQueryParams,
      newAssignmentDtlButtonClick: assignmentDtlsUIContext.newAssignmentDtlButtonClick,
      openDeleteAssignmentDtlsDialog: assignmentDtlsUIContext.openDeleteAssignmentDtlsDialog,
      openEditAssignmentDtlPage: assignmentDtlsUIContext.openEditAssignmentDtlPage,
      openUpdateAssignmentDtlsStatusDialog: assignmentDtlsUIContext.openUpdateAssignmentDtlsStatusDialog,
      openFetchAssignmentDtlsDialog: assignmentDtlsUIContext.openFetchAssignmentDtlsDialog,
    };
  }, [assignmentDtlsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("AssignmentDtl.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={assignmentDtlsUIProps.newAssignmentDtlButtonClick}
          >
            {t("AssignmentDtl.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AssignmentDtlsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </AssignmentDtlsUIConsumer>
        <AssignmentDtlsTable />
      </CardBody>
    </Card>
  );
}