
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { SellDocumentDetailsTable } from "./sellDocumentDetails-table/SellDocumentDetailsTable";
import { useSellDocumentDetailsUIContext, SellDocumentDetailsUIConsumer } from "./SellDocumentDetailsUIContext";
import { useTranslation } from 'react-i18next';

export function SellDocumentDetailsCard() {
  const { t } = useTranslation();

  const sellDocumentDetailsUIContext = useSellDocumentDetailsUIContext();

  const sellDocumentDetailsUIProps = useMemo(() => {
    return {
      ids: sellDocumentDetailsUIContext.ids,
      queryParams: sellDocumentDetailsUIContext.queryParams,
      setQueryParams: sellDocumentDetailsUIContext.setQueryParams,
      newSellDocumentDetailButtonClick: sellDocumentDetailsUIContext.newSellDocumentDetailButtonClick,
      openDeleteSellDocumentDetailsDialog: sellDocumentDetailsUIContext.openDeleteSellDocumentDetailsDialog,
      openEditSellDocumentDetailPage: sellDocumentDetailsUIContext.openEditSellDocumentDetailPage,
      openUpdateSellDocumentDetailsStatusDialog: sellDocumentDetailsUIContext.openUpdateSellDocumentDetailsStatusDialog,
      openFetchSellDocumentDetailsDialog: sellDocumentDetailsUIContext.openFetchSellDocumentDetailsDialog,
    };
  }, [sellDocumentDetailsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("SellDocumentDetail.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={sellDocumentDetailsUIProps.newSellDocumentDetailButtonClick}
          >
            {t("SellDocumentDetail.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SellDocumentDetailsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SellDocumentDetailsUIConsumer>
        <SellDocumentDetailsTable />
      </CardBody>
    </Card>
  );
}