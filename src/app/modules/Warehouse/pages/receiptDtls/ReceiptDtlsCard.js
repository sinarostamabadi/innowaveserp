
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ReceiptDtlsTable } from "./receiptDtls-table/ReceiptDtlsTable";
import { useReceiptDtlsUIContext, ReceiptDtlsUIConsumer } from "./ReceiptDtlsUIContext";
import { useTranslation } from 'react-i18next';

export function ReceiptDtlsCard() {
  const { t } = useTranslation();

  const receiptDtlsUIContext = useReceiptDtlsUIContext();

  const receiptDtlsUIProps = useMemo(() => {
    return {
      ids: receiptDtlsUIContext.ids,
      queryParams: receiptDtlsUIContext.queryParams,
      setQueryParams: receiptDtlsUIContext.setQueryParams,
      newReceiptDtlButtonClick: receiptDtlsUIContext.newReceiptDtlButtonClick,
      openDeleteReceiptDtlsDialog: receiptDtlsUIContext.openDeleteReceiptDtlsDialog,
      openEditReceiptDtlPage: receiptDtlsUIContext.openEditReceiptDtlPage,
      openUpdateReceiptDtlsStatusDialog: receiptDtlsUIContext.openUpdateReceiptDtlsStatusDialog,
      openFetchReceiptDtlsDialog: receiptDtlsUIContext.openFetchReceiptDtlsDialog,
    };
  }, [receiptDtlsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("ReceiptDtl.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={receiptDtlsUIProps.newReceiptDtlButtonClick}
          >
            {t("ReceiptDtl.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ReceiptDtlsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ReceiptDtlsUIConsumer>
        <ReceiptDtlsTable />
      </CardBody>
    </Card>
  );
}