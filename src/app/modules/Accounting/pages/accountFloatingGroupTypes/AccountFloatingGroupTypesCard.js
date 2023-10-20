
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { AccountFloatingGroupTypesTable } from "./accountFloatingGroupTypes-table/AccountFloatingGroupTypesTable";
import { useAccountFloatingGroupTypesUIContext, AccountFloatingGroupTypesUIConsumer } from "./AccountFloatingGroupTypesUIContext";
import { useTranslation } from 'react-i18next';

export function AccountFloatingGroupTypesCard() {
  const { t } = useTranslation();

  const accountFloatingGroupTypesUIContext = useAccountFloatingGroupTypesUIContext();

  const accountFloatingGroupTypesUIProps = useMemo(() => {
    return {
      ids: accountFloatingGroupTypesUIContext.ids,
      queryParams: accountFloatingGroupTypesUIContext.queryParams,
      setQueryParams: accountFloatingGroupTypesUIContext.setQueryParams,
      newAccountFloatingGroupTypeButtonClick: accountFloatingGroupTypesUIContext.newAccountFloatingGroupTypeButtonClick,
      openDeleteAccountFloatingGroupTypesDialog: accountFloatingGroupTypesUIContext.openDeleteAccountFloatingGroupTypesDialog,
      openEditAccountFloatingGroupTypePage: accountFloatingGroupTypesUIContext.openEditAccountFloatingGroupTypePage,
      openUpdateAccountFloatingGroupTypesStatusDialog: accountFloatingGroupTypesUIContext.openUpdateAccountFloatingGroupTypesStatusDialog,
      openFetchAccountFloatingGroupTypesDialog: accountFloatingGroupTypesUIContext.openFetchAccountFloatingGroupTypesDialog,
    };
  }, [accountFloatingGroupTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("AccountFloatingGroupType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={accountFloatingGroupTypesUIProps.newAccountFloatingGroupTypeButtonClick}
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AccountFloatingGroupTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </AccountFloatingGroupTypesUIConsumer>
        <AccountFloatingGroupTypesTable />
      </CardBody>
    </Card>
  );
}