
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { AccountTypesTable } from "./accountTypes-table/AccountTypesTable";
import { useAccountTypesUIContext, AccountTypesUIConsumer } from "./AccountTypesUIContext";
import { useTranslation } from 'react-i18next';

export function AccountTypesCard() {
  const { t } = useTranslation();

  const accountTypesUIContext = useAccountTypesUIContext();

  const accountTypesUIProps = useMemo(() => {
    return {
      ids: accountTypesUIContext.ids,
      queryParams: accountTypesUIContext.queryParams,
      setQueryParams: accountTypesUIContext.setQueryParams,
      newAccountTypeButtonClick: accountTypesUIContext.newAccountTypeButtonClick,
      openDeleteAccountTypesDialog: accountTypesUIContext.openDeleteAccountTypesDialog,
      openEditAccountTypePage: accountTypesUIContext.openEditAccountTypePage,
      openUpdateAccountTypesStatusDialog: accountTypesUIContext.openUpdateAccountTypesStatusDialog,
      openFetchAccountTypesDialog: accountTypesUIContext.openFetchAccountTypesDialog,
    };
  }, [accountTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("AccountType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={accountTypesUIProps.newAccountTypeButtonClick}
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AccountTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </AccountTypesUIConsumer>
        <AccountTypesTable />
      </CardBody>
    </Card>
  );
}