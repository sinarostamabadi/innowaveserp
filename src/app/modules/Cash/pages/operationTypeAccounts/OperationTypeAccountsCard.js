import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { OperationTypeAccountsTable } from "./operationTypeAccounts-table/OperationTypeAccountsTable";
import {
  useOperationTypeAccountsUIContext,
  OperationTypeAccountsUIConsumer,
} from "./OperationTypeAccountsUIContext";
import { useTranslation } from "react-i18next";

export function OperationTypeAccountsCard() {
  const { t } = useTranslation();

  const operationTypeAccountsUIContext = useOperationTypeAccountsUIContext();

  const operationTypeAccountsUIProps = useMemo(() => {
    return {
      ids: operationTypeAccountsUIContext.ids,
      queryParams: operationTypeAccountsUIContext.queryParams,
      setQueryParams: operationTypeAccountsUIContext.setQueryParams,
      newOperationTypeAccountButtonClick:
        operationTypeAccountsUIContext.newOperationTypeAccountButtonClick,
      openDeleteOperationTypeAccountsDialog:
        operationTypeAccountsUIContext.openDeleteOperationTypeAccountsDialog,
      openEditOperationTypeAccountPage:
        operationTypeAccountsUIContext.openEditOperationTypeAccountPage,
      openUpdateOperationTypeAccountsStatusDialog:
        operationTypeAccountsUIContext.openUpdateOperationTypeAccountsStatusDialog,
      openFetchOperationTypeAccountsDialog:
        operationTypeAccountsUIContext.openFetchOperationTypeAccountsDialog,
    };
  }, [operationTypeAccountsUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("OperationTypeAccount.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              operationTypeAccountsUIProps.newOperationTypeAccountButtonClick
            }
          >
            {t("OperationTypeAccount.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <OperationTypeAccountsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </OperationTypeAccountsUIConsumer>
        <OperationTypeAccountsTable />
      </CardBody>
    </Card>
  );
}
