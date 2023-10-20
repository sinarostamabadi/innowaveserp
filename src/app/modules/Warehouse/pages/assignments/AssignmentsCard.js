import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { AssignmentsTable } from "./assignments-table/AssignmentsTable";
import {
  useAssignmentsUIContext,
  AssignmentsUIConsumer,
} from "./AssignmentsUIContext";
import { useTranslation } from "react-i18next";

export function AssignmentsCard() {
  const { t } = useTranslation();
  const modeTrans = {
    1: "حواله",
    2: "حواله بین انبار",
    3: "موجودی پایان دوره",
    4: "حواله اتوماتیک",
  };
  const uiContext = useAssignmentsUIContext();

  const uiProps = useMemo(() => {
    return {
      mode: uiContext.mode,
      ids: uiContext.ids,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      newAssignmentButtonClick: uiContext.newAssignmentButtonClick,
      openDeleteAssignmentsDialog: uiContext.openDeleteAssignmentsDialog,
      openEditAssignmentPage: uiContext.openEditAssignmentPage,
      openUpdateAssignmentsStatusDialog: uiContext.openUpdateAssignmentsStatusDialog,
      openFetchAssignmentsDialog: uiContext.openFetchAssignmentsDialog,
    };
  }, [uiContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " «" + (!!uiProps.mode? (modeTrans[uiProps.mode]): t("Assignment.Entity")) + "»"}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={uiProps.newAssignmentButtonClick}
          >
            {t("Assignment.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AssignmentsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </AssignmentsUIConsumer>
        <AssignmentsTable />
      </CardBody>
    </Card>
  );
}
