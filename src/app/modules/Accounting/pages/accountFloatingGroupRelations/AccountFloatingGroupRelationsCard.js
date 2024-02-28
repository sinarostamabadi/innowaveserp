import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { AccountFloatingGroupRelationsTable } from "./accountFloatingGroupRelations-table/AccountFloatingGroupRelationsTable";
import {
  useAccountFloatingGroupRelationsUIContext,
  AccountFloatingGroupRelationsUIConsumer,
} from "./AccountFloatingGroupRelationsUIContext";
import { useTranslation } from "react-i18next";

export function AccountFloatingGroupRelationsCard() {
  const { t } = useTranslation();

  const accountFloatingGroupRelationsUIContext =
    useAccountFloatingGroupRelationsUIContext();

  const accountFloatingGroupRelationsUIProps = useMemo(() => {
    return {
      ids: accountFloatingGroupRelationsUIContext.ids,
      queryParams: accountFloatingGroupRelationsUIContext.queryParams,
      setQueryParams: accountFloatingGroupRelationsUIContext.setQueryParams,
      newAccountFloatingGroupRelationButtonClick:
        accountFloatingGroupRelationsUIContext.newAccountFloatingGroupRelationButtonClick,
      openDeleteAccountFloatingGroupRelationsDialog:
        accountFloatingGroupRelationsUIContext.openDeleteAccountFloatingGroupRelationsDialog,
      openEditAccountFloatingGroupRelationPage:
        accountFloatingGroupRelationsUIContext.openEditAccountFloatingGroupRelationPage,
      openUpdateAccountFloatingGroupRelationsStatusDialog:
        accountFloatingGroupRelationsUIContext.openUpdateAccountFloatingGroupRelationsStatusDialog,
      openFetchAccountFloatingGroupRelationsDialog:
        accountFloatingGroupRelationsUIContext.openFetchAccountFloatingGroupRelationsDialog,
    };
  }, [accountFloatingGroupRelationsUIContext]);

  return (
    <Card>
      <CardHeader
        title={
          t("Common.List") + " " + t("AccountFloatingGroupRelation.Entity")
        }
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              accountFloatingGroupRelationsUIProps.newAccountFloatingGroupRelationButtonClick
            }
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <AccountFloatingGroupRelationsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </AccountFloatingGroupRelationsUIConsumer>
        <AccountFloatingGroupRelationsTable />
      </CardBody>
    </Card>
  );
}
