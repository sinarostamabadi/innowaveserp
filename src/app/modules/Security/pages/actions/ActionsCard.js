
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ActionsTable } from "./actions-table/ActionsTable";
import { useActionsUIContext, ActionsUIConsumer } from "./ActionsUIContext";
import { useTranslation } from 'react-i18next';

export function ActionsCard() {
  const { t } = useTranslation();

  const actionsUIContext = useActionsUIContext();

  const actionsUIProps = useMemo(() => {
    return {
      ids: actionsUIContext.ids,
      queryParams: actionsUIContext.queryParams,
      setQueryParams: actionsUIContext.setQueryParams,
      newActionButtonClick: actionsUIContext.newActionButtonClick,
      openDeleteActionsDialog: actionsUIContext.openDeleteActionsDialog,
      openEditActionPage: actionsUIContext.openEditActionPage,
      openUpdateActionsStatusDialog: actionsUIContext.openUpdateActionsStatusDialog,
      openFetchActionsDialog: actionsUIContext.openFetchActionsDialog,
    };
  }, [actionsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("Action.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={actionsUIProps.newActionButtonClick}
          >
            {t("Action.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ActionsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ActionsUIConsumer>
        <ActionsTable />
      </CardBody>
    </Card>
  );
}