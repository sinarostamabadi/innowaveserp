
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { SellDiscountFactorsTable } from "./sellDiscountFactors-table/SellDiscountFactorsTable";
import { useSellDiscountFactorsUIContext, SellDiscountFactorsUIConsumer } from "./SellDiscountFactorsUIContext";
import { useTranslation } from 'react-i18next';

export function SellDiscountFactorsCard() {
  const { t } = useTranslation();

  const sellDiscountFactorsUIContext = useSellDiscountFactorsUIContext();

  const sellDiscountFactorsUIProps = useMemo(() => {
    return {
      ids: sellDiscountFactorsUIContext.ids,
      queryParams: sellDiscountFactorsUIContext.queryParams,
      setQueryParams: sellDiscountFactorsUIContext.setQueryParams,
      newSellDiscountFactorButtonClick: sellDiscountFactorsUIContext.newSellDiscountFactorButtonClick,
      openDeleteSellDiscountFactorsDialog: sellDiscountFactorsUIContext.openDeleteSellDiscountFactorsDialog,
      openEditSellDiscountFactorPage: sellDiscountFactorsUIContext.openEditSellDiscountFactorPage,
      openUpdateSellDiscountFactorsStatusDialog: sellDiscountFactorsUIContext.openUpdateSellDiscountFactorsStatusDialog,
      openFetchSellDiscountFactorsDialog: sellDiscountFactorsUIContext.openFetchSellDiscountFactorsDialog,
    };
  }, [sellDiscountFactorsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("SellDiscountFactor.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={sellDiscountFactorsUIProps.newSellDiscountFactorButtonClick}
          >
            {t("SellDiscountFactor.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SellDiscountFactorsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SellDiscountFactorsUIConsumer>
        <SellDiscountFactorsTable />
      </CardBody>
    </Card>
  );
}