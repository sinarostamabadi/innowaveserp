import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { AccountFloatingTable } from "./accountFloating-table/AccountFloatingTable";
import {
  useAccountFloatingUIContext,
  AccountFloatingUIConsumer,
} from "./AccountFloatingUIContext";
import { useTranslation } from "react-i18next";

export function AccountFloatingCard() {
  const { t } = useTranslation();

  const accountFloatingUIContext = useAccountFloatingUIContext();

  const accountFloatingUIProps = useMemo(() => {
    return {
      ids: accountFloatingUIContext.ids,
      queryParams: accountFloatingUIContext.queryParams,
      setQueryParams: accountFloatingUIContext.setQueryParams,
      newAccountFloatingButtonClick:
        accountFloatingUIContext.newAccountFloatingButtonClick,
      openDeleteAccountFloatingDialog:
        accountFloatingUIContext.openDeleteAccountFloatingDialog,
      openEditAccountFloatingPage:
        accountFloatingUIContext.openEditAccountFloatingPage,
      openUpdateAccountFloatingStatusDialog:
        accountFloatingUIContext.openUpdateAccountFloatingStatusDialog,
      openFetchAccountFloatingDialog:
        accountFloatingUIContext.openFetchAccountFloatingDialog,
    };
  }, [accountFloatingUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("AccountFloating.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={accountFloatingUIProps.newAccountFloatingButtonClick}
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AccountFloatingUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </AccountFloatingUIConsumer>
        <AccountFloatingTable />
      </CardBody>
    </Card>
  );
}
