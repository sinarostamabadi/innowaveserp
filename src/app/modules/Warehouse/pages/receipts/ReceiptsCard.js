
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { AdvancedFilter } from "src/core/_partials/custom/advanced-filter/AdvancedFilter";
import { ReceiptsTable } from "./receipts-table/ReceiptsTable";
import { useReceiptsUIContext, ReceiptsUIConsumer } from "./ReceiptsUIContext";
import { useTranslation } from 'react-i18next';

export function ReceiptsCard() {
  const { t } = useTranslation();
  const modeTrans = {
    1: "رسید",
    2: "موجودی اول دوره",
    3: "رسید بین انبار",
    4: "رسید اتوماتیک",
    5: "شمارش انبار",
  };

  const uiContext = useReceiptsUIContext();

  const uiProps = useMemo(() => {
    return {
      mode: uiContext.mode,
      ids: uiContext.ids,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      newReceiptButtonClick: uiContext.newReceiptButtonClick,
      openDeleteReceiptsDialog: uiContext.openDeleteReceiptsDialog,
      openEditReceiptPage: uiContext.openEditReceiptPage,
      openUpdateReceiptsStatusDialog: uiContext.openUpdateReceiptsStatusDialog,
      openFetchReceiptsDialog: uiContext.openFetchReceiptsDialog,
    };
  }, [uiContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " «" + (!!uiProps.mode? (modeTrans[uiProps.mode]): t("Receipt.Entity")) + "»"}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={uiProps.newReceiptButtonClick}
          >
            {t("Receipt.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ReceiptsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ReceiptsUIConsumer>
        <ReceiptsTable />
      </CardBody>
    </Card>
  );
}