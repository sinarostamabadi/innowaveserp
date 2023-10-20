
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { OperationTypesTable } from "./operationTypes-table/OperationTypesTable";
import { useOperationTypesUIContext, OperationTypesUIConsumer } from "./OperationTypesUIContext";
import { useTranslation } from 'react-i18next';

export function OperationTypesCard() {
  const { t } = useTranslation();

  const operationTypesUIContext = useOperationTypesUIContext();

  const operationTypesUIProps = useMemo(() => {
    return {
      ids: operationTypesUIContext.ids,
      queryParams: operationTypesUIContext.queryParams,
      setQueryParams: operationTypesUIContext.setQueryParams,
      newOperationTypeButtonClick: operationTypesUIContext.newOperationTypeButtonClick,
      openDeleteOperationTypesDialog: operationTypesUIContext.openDeleteOperationTypesDialog,
      openEditOperationTypePage: operationTypesUIContext.openEditOperationTypePage,
      openUpdateOperationTypesStatusDialog: operationTypesUIContext.openUpdateOperationTypesStatusDialog,
      openFetchOperationTypesDialog: operationTypesUIContext.openFetchOperationTypesDialog,
    };
  }, [operationTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("OperationType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={operationTypesUIProps.newOperationTypeButtonClick}
          >
            {t("OperationType.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <OperationTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </OperationTypesUIConsumer>
        <OperationTypesTable />
      </CardBody>
    </Card>
  );
}