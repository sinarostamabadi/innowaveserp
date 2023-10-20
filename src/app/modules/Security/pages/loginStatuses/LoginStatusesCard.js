
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { LoginStatusesTable } from "./loginStatuses-table/LoginStatusesTable";
import { useLoginStatusesUIContext, LoginStatusesUIConsumer } from "./LoginStatusesUIContext";
import { useTranslation } from 'react-i18next';

export function LoginStatusesCard() {
  const { t } = useTranslation();

  const loginStatusesUIContext = useLoginStatusesUIContext();

  const loginStatusesUIProps = useMemo(() => {
    return {
      ids: loginStatusesUIContext.ids,
      queryParams: loginStatusesUIContext.queryParams,
      setQueryParams: loginStatusesUIContext.setQueryParams,
      newLoginStatusButtonClick: loginStatusesUIContext.newLoginStatusButtonClick,
      openDeleteLoginStatusesDialog: loginStatusesUIContext.openDeleteLoginStatusesDialog,
      openEditLoginStatusPage: loginStatusesUIContext.openEditLoginStatusPage,
      openUpdateLoginStatusesStatusDialog: loginStatusesUIContext.openUpdateLoginStatusesStatusDialog,
      openFetchLoginStatusesDialog: loginStatusesUIContext.openFetchLoginStatusesDialog,
    };
  }, [loginStatusesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("LoginStatus.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={loginStatusesUIProps.newLoginStatusButtonClick}
          >
            {t("LoginStatus.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <LoginStatusesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </LoginStatusesUIConsumer>
        <LoginStatusesTable />
      </CardBody>
    </Card>
  );
}