
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ReceiptSerialsTable } from "./receiptSerials-table/ReceiptSerialsTable";
import { useReceiptSerialsUIContext, ReceiptSerialsUIConsumer } from "./ReceiptSerialsUIContext";
import { useTranslation } from 'react-i18next';

export function ReceiptSerialsCard() {
  const { t } = useTranslation();

  const receiptSerialsUIContext = useReceiptSerialsUIContext();

  const receiptSerialsUIProps = useMemo(() => {
    return {
      ids: receiptSerialsUIContext.ids,
      queryParams: receiptSerialsUIContext.queryParams,
      setQueryParams: receiptSerialsUIContext.setQueryParams,
      newReceiptSerialButtonClick: receiptSerialsUIContext.newReceiptSerialButtonClick,
      openDeleteReceiptSerialsDialog: receiptSerialsUIContext.openDeleteReceiptSerialsDialog,
      openEditReceiptSerialPage: receiptSerialsUIContext.openEditReceiptSerialPage,
      openUpdateReceiptSerialsStatusDialog: receiptSerialsUIContext.openUpdateReceiptSerialsStatusDialog,
      openFetchReceiptSerialsDialog: receiptSerialsUIContext.openFetchReceiptSerialsDialog,
    };
  }, [receiptSerialsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("ReceiptSerial.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={receiptSerialsUIProps.newReceiptSerialButtonClick}
          >
            {t("ReceiptSerial.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ReceiptSerialsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ReceiptSerialsUIConsumer>
        <ReceiptSerialsTable />
      </CardBody>
    </Card>
  );
}