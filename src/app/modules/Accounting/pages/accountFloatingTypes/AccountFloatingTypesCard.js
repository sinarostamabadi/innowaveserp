import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { AccountFloatingTypesTable } from "./accountFloatingTypes-table/AccountFloatingTypesTable";
import {
  useAccountFloatingTypesUIContext,
  AccountFloatingTypesUIConsumer,
} from "./AccountFloatingTypesUIContext";
import { useTranslation } from "react-i18next";

export function AccountFloatingTypesCard() {
  const { t } = useTranslation();

  const accountFloatingTypesUIContext = useAccountFloatingTypesUIContext();

  const accountFloatingTypesUIProps = useMemo(() => {
    return {
      ids: accountFloatingTypesUIContext.ids,
      queryParams: accountFloatingTypesUIContext.queryParams,
      setQueryParams: accountFloatingTypesUIContext.setQueryParams,
      newAccountFloatingTypeButtonClick:
        accountFloatingTypesUIContext.newAccountFloatingTypeButtonClick,
      openDeleteAccountFloatingTypesDialog:
        accountFloatingTypesUIContext.openDeleteAccountFloatingTypesDialog,
      openEditAccountFloatingTypePage:
        accountFloatingTypesUIContext.openEditAccountFloatingTypePage,
      openUpdateAccountFloatingTypesStatusDialog:
        accountFloatingTypesUIContext.openUpdateAccountFloatingTypesStatusDialog,
      openFetchAccountFloatingTypesDialog:
        accountFloatingTypesUIContext.openFetchAccountFloatingTypesDialog,
    };
  }, [accountFloatingTypesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("AccountFloatingType.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              accountFloatingTypesUIProps.newAccountFloatingTypeButtonClick
            }
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AccountFloatingTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </AccountFloatingTypesUIConsumer>
        <AccountFloatingTypesTable />
      </CardBody>
    </Card>
  );
}
