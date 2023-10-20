
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { SellDiscountDetailsTable } from "./sellDiscountDetails-table/SellDiscountDetailsTable";
import { useSellDiscountDetailsUIContext, SellDiscountDetailsUIConsumer } from "./SellDiscountDetailsUIContext";
import { useTranslation } from 'react-i18next';

export function SellDiscountDetailsCard() {
  const { t } = useTranslation();

  const sellDiscountDetailsUIContext = useSellDiscountDetailsUIContext();

  const sellDiscountDetailsUIProps = useMemo(() => {
    return {
      ids: sellDiscountDetailsUIContext.ids,
      queryParams: sellDiscountDetailsUIContext.queryParams,
      setQueryParams: sellDiscountDetailsUIContext.setQueryParams,
      newSellDiscountDetailButtonClick: sellDiscountDetailsUIContext.newSellDiscountDetailButtonClick,
      openDeleteSellDiscountDetailsDialog: sellDiscountDetailsUIContext.openDeleteSellDiscountDetailsDialog,
      openEditSellDiscountDetailPage: sellDiscountDetailsUIContext.openEditSellDiscountDetailPage,
      openUpdateSellDiscountDetailsStatusDialog: sellDiscountDetailsUIContext.openUpdateSellDiscountDetailsStatusDialog,
      openFetchSellDiscountDetailsDialog: sellDiscountDetailsUIContext.openFetchSellDiscountDetailsDialog,
    };
  }, [sellDiscountDetailsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("SellDiscountDetail.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={sellDiscountDetailsUIProps.newSellDiscountDetailButtonClick}
          >
            {t("SellDiscountDetail.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SellDiscountDetailsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SellDiscountDetailsUIConsumer>
        <SellDiscountDetailsTable />
      </CardBody>
    </Card>
  );
}