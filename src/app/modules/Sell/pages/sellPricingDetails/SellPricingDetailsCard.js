
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { SellPricingDetailsTable } from "./sellPricingDetails-table/SellPricingDetailsTable";
import { useSellPricingDetailsUIContext, SellPricingDetailsUIConsumer } from "./SellPricingDetailsUIContext";
import { useTranslation } from 'react-i18next';

export function SellPricingDetailsCard() {
  const { t } = useTranslation();

  const sellPricingDetailsUIContext = useSellPricingDetailsUIContext();

  const sellPricingDetailsUIProps = useMemo(() => {
    return {
      ids: sellPricingDetailsUIContext.ids,
      queryParams: sellPricingDetailsUIContext.queryParams,
      setQueryParams: sellPricingDetailsUIContext.setQueryParams,
      newSellPricingDetailButtonClick: sellPricingDetailsUIContext.newSellPricingDetailButtonClick,
      openDeleteSellPricingDetailsDialog: sellPricingDetailsUIContext.openDeleteSellPricingDetailsDialog,
      openEditSellPricingDetailPage: sellPricingDetailsUIContext.openEditSellPricingDetailPage,
      openUpdateSellPricingDetailsStatusDialog: sellPricingDetailsUIContext.openUpdateSellPricingDetailsStatusDialog,
      openFetchSellPricingDetailsDialog: sellPricingDetailsUIContext.openFetchSellPricingDetailsDialog,
    };
  }, [sellPricingDetailsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("SellPricingDetail.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={sellPricingDetailsUIProps.newSellPricingDetailButtonClick}
          >
            {t("SellPricingDetail.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SellPricingDetailsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SellPricingDetailsUIConsumer>
        <SellPricingDetailsTable />
      </CardBody>
    </Card>
  );
}