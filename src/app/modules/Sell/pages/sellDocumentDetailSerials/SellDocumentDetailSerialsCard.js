
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { SellDocumentDetailSerialsTable } from "./sellDocumentDetailSerials-table/SellDocumentDetailSerialsTable";
import { useSellDocumentDetailSerialsUIContext, SellDocumentDetailSerialsUIConsumer } from "./SellDocumentDetailSerialsUIContext";
import { useTranslation } from 'react-i18next';

export function SellDocumentDetailSerialsCard() {
  const { t } = useTranslation();

  const sellDocumentDetailSerialsUIContext = useSellDocumentDetailSerialsUIContext();

  const sellDocumentDetailSerialsUIProps = useMemo(() => {
    return {
      ids: sellDocumentDetailSerialsUIContext.ids,
      queryParams: sellDocumentDetailSerialsUIContext.queryParams,
      setQueryParams: sellDocumentDetailSerialsUIContext.setQueryParams,
      newSellDocumentDetailSerialButtonClick: sellDocumentDetailSerialsUIContext.newSellDocumentDetailSerialButtonClick,
      openDeleteSellDocumentDetailSerialsDialog: sellDocumentDetailSerialsUIContext.openDeleteSellDocumentDetailSerialsDialog,
      openEditSellDocumentDetailSerialPage: sellDocumentDetailSerialsUIContext.openEditSellDocumentDetailSerialPage,
      openUpdateSellDocumentDetailSerialsStatusDialog: sellDocumentDetailSerialsUIContext.openUpdateSellDocumentDetailSerialsStatusDialog,
      openFetchSellDocumentDetailSerialsDialog: sellDocumentDetailSerialsUIContext.openFetchSellDocumentDetailSerialsDialog,
    };
  }, [sellDocumentDetailSerialsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("SellDocumentDetailSerial.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={sellDocumentDetailSerialsUIProps.newSellDocumentDetailSerialButtonClick}
          >
            {t("SellDocumentDetailSerial.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SellDocumentDetailSerialsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SellDocumentDetailSerialsUIConsumer>
        <SellDocumentDetailSerialsTable />
      </CardBody>
    </Card>
  );
}