import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { AccountsTable } from "./accounts-table/AccountsTable";
import { useAccountsUIContext, AccountsUIConsumer } from "./AccountsUIContext";
import { useTranslation } from "react-i18next";

export function AccountsCard() {
  const { t } = useTranslation();

  const accountsUIContext = useAccountsUIContext();

  const accountsUIProps = useMemo(() => {
    return {
      ids: accountsUIContext.ids,
      queryParams: accountsUIContext.queryParams,
      setQueryParams: accountsUIContext.setQueryParams,
      newAccountButtonClick: accountsUIContext.newAccountButtonClick,
      openDeleteAccountsDialog: accountsUIContext.openDeleteAccountsDialog,
      openEditDetailDialog: accountsUIContext.openEditDetailDialog,
      openFetchAccountsDialog: accountsUIContext.openFetchAccountsDialog,
    };
  }, [accountsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Account.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={accountsUIProps.openEditDetailDialog}
          >
            {t("Account.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AccountsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </AccountsUIConsumer>
        <AccountsTable />
      </CardBody>
    </Card>
  );
}
