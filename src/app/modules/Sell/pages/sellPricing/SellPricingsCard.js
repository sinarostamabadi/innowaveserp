
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { SellPricingsTable } from "./sellPricings-table/SellPricingsTable";
import { useSellPricingsUIContext, SellPricingsUIConsumer } from "./SellPricingsUIContext";
import { useTranslation } from 'react-i18next';

export function SellPricingsCard() {
  const { t } = useTranslation();

  const sellPricingsUIContext = useSellPricingsUIContext();

  const sellPricingsUIProps = useMemo(() => {
    return {
      ids: sellPricingsUIContext.ids,
      queryParams: sellPricingsUIContext.queryParams,
      setQueryParams: sellPricingsUIContext.setQueryParams,
      newSellPricingButtonClick: sellPricingsUIContext.newSellPricingButtonClick,
      openDeleteSellPricingsDialog: sellPricingsUIContext.openDeleteSellPricingsDialog,
      openEditSellPricingPage: sellPricingsUIContext.openEditSellPricingPage,
      openUpdateSellPricingsStatusDialog: sellPricingsUIContext.openUpdateSellPricingsStatusDialog,
      openFetchSellPricingsDialog: sellPricingsUIContext.openFetchSellPricingsDialog,
    };
  }, [sellPricingsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("SellPricing.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={sellPricingsUIProps.newSellPricingButtonClick}
          >
            {t("SellPricing.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SellPricingsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SellPricingsUIConsumer>
        <SellPricingsTable />
      </CardBody>
    </Card>
  );
}