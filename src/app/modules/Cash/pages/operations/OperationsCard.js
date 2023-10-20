
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { OperationsTable } from "./operations-table/OperationsTable";
import { useOperationsUIContext, OperationsUIConsumer } from "./OperationsUIContext";
import { useTranslation } from 'react-i18next';

export function OperationsCard() {
  const { t } = useTranslation();

  const operationsUIContext = useOperationsUIContext();

  const operationsUIProps = useMemo(() => {
    return {
      ids: operationsUIContext.ids,
      queryParams: operationsUIContext.queryParams,
      setQueryParams: operationsUIContext.setQueryParams,
      newOperationButtonClick: operationsUIContext.newOperationButtonClick,
      openDeleteOperationsDialog: operationsUIContext.openDeleteOperationsDialog,
      openEditOperationPage: operationsUIContext.openEditOperationPage,
      openUpdateOperationsStatusDialog: operationsUIContext.openUpdateOperationsStatusDialog,
      openFetchOperationsDialog: operationsUIContext.openFetchOperationsDialog,
    };
  }, [operationsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("Operation.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={operationsUIProps.newOperationButtonClick}
          >
            {t("Operation.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <OperationsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </OperationsUIConsumer>
        <OperationsTable />
      </CardBody>
    </Card>
  );
}