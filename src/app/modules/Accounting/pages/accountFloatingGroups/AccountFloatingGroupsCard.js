import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { AccountFloatingGroupsTable } from "./accountFloatingGroups-table/AccountFloatingGroupsTable";
import {
  useAccountFloatingGroupsUIContext,
  AccountFloatingGroupsUIConsumer,
} from "./AccountFloatingGroupsUIContext";
import { useTranslation } from "react-i18next";

export function AccountFloatingGroupsCard() {
  const { t } = useTranslation();

  const accountFloatingGroupsUIContext = useAccountFloatingGroupsUIContext();

  const accountFloatingGroupsUIProps = useMemo(() => {
    return {
      ids: accountFloatingGroupsUIContext.ids,
      queryParams: accountFloatingGroupsUIContext.queryParams,
      setQueryParams: accountFloatingGroupsUIContext.setQueryParams,
      newAccountFloatingGroupButtonClick:
        accountFloatingGroupsUIContext.newAccountFloatingGroupButtonClick,
      openDeleteAccountFloatingGroupsDialog:
        accountFloatingGroupsUIContext.openDeleteAccountFloatingGroupsDialog,
      openEditAccountFloatingGroupPage:
        accountFloatingGroupsUIContext.openEditAccountFloatingGroupPage,
      openUpdateAccountFloatingGroupsStatusDialog:
        accountFloatingGroupsUIContext.openUpdateAccountFloatingGroupsStatusDialog,
      openFetchAccountFloatingGroupsDialog:
        accountFloatingGroupsUIContext.openFetchAccountFloatingGroupsDialog,
    };
  }, [accountFloatingGroupsUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("AccountFloatingGroup.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              accountFloatingGroupsUIProps.newAccountFloatingGroupButtonClick
            }
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AccountFloatingGroupsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </AccountFloatingGroupsUIConsumer>
        <AccountFloatingGroupsTable />
      </CardBody>
    </Card>
  );
}
