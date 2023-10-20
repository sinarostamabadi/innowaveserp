
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { LoginHistoriesTable } from "./loginHistories-table/LoginHistoriesTable";
import { useLoginHistoriesUIContext, LoginHistoriesUIConsumer } from "./LoginHistoriesUIContext";
import { useTranslation } from 'react-i18next';

export function LoginHistoriesCard() {
  const { t } = useTranslation();

  const loginHistoriesUIContext = useLoginHistoriesUIContext();

  const loginHistoriesUIProps = useMemo(() => {
    return {
      ids: loginHistoriesUIContext.ids,
      queryParams: loginHistoriesUIContext.queryParams,
      setQueryParams: loginHistoriesUIContext.setQueryParams,
      newLoginHistoryButtonClick: loginHistoriesUIContext.newLoginHistoryButtonClick,
      openDeleteLoginHistoriesDialog: loginHistoriesUIContext.openDeleteLoginHistoriesDialog,
      openEditLoginHistoryPage: loginHistoriesUIContext.openEditLoginHistoryPage,
      openUpdateLoginHistoriesStatusDialog: loginHistoriesUIContext.openUpdateLoginHistoriesStatusDialog,
      openFetchLoginHistoriesDialog: loginHistoriesUIContext.openFetchLoginHistoriesDialog,
    };
  }, [loginHistoriesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("LoginHistory.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={loginHistoriesUIProps.newLoginHistoryButtonClick}
          >
            {t("LoginHistory.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <LoginHistoriesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </LoginHistoriesUIConsumer>
        <LoginHistoriesTable />
      </CardBody>
    </Card>
  );
}