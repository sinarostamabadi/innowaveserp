
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { IOTransactionTypesTable } from "./iOTransactionTypes-table/IOTransactionTypesTable";
import { useIOTransactionTypesUIContext, IOTransactionTypesUIConsumer } from "./IOTransactionTypesUIContext";
import { useTranslation } from 'react-i18next';

export function IOTransactionTypesCard() {
  const { t } = useTranslation();

  const iOTransactionTypesUIContext = useIOTransactionTypesUIContext();

  const iOTransactionTypesUIProps = useMemo(() => {
    return {
      ids: iOTransactionTypesUIContext.ids,
      queryParams: iOTransactionTypesUIContext.queryParams,
      setQueryParams: iOTransactionTypesUIContext.setQueryParams,
      newIOTransactionTypeButtonClick: iOTransactionTypesUIContext.newIOTransactionTypeButtonClick,
      openDeleteIOTransactionTypesDialog: iOTransactionTypesUIContext.openDeleteIOTransactionTypesDialog,
      openEditIOTransactionTypePage: iOTransactionTypesUIContext.openEditIOTransactionTypePage,
      openUpdateIOTransactionTypesStatusDialog: iOTransactionTypesUIContext.openUpdateIOTransactionTypesStatusDialog,
      openFetchIOTransactionTypesDialog: iOTransactionTypesUIContext.openFetchIOTransactionTypesDialog,
    };
  }, [iOTransactionTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("IOTransactionType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={iOTransactionTypesUIProps.newIOTransactionTypeButtonClick}
          >
            {t("IOTransactionType.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <IOTransactionTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </IOTransactionTypesUIConsumer>
        <IOTransactionTypesTable />
      </CardBody>
    </Card>
  );
}