
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { SellDiscountDetailInfosTable } from "./sellDiscountDetailInfos-table/SellDiscountDetailInfosTable";
import { useSellDiscountDetailInfosUIContext, SellDiscountDetailInfosUIConsumer } from "./SellDiscountDetailInfosUIContext";
import { useTranslation } from 'react-i18next';

export function SellDiscountDetailInfosCard() {
  const { t } = useTranslation();

  const sellDiscountDetailInfosUIContext = useSellDiscountDetailInfosUIContext();

  const sellDiscountDetailInfosUIProps = useMemo(() => {
    return {
      ids: sellDiscountDetailInfosUIContext.ids,
      queryParams: sellDiscountDetailInfosUIContext.queryParams,
      setQueryParams: sellDiscountDetailInfosUIContext.setQueryParams,
      newSellDiscountDetailInfoButtonClick: sellDiscountDetailInfosUIContext.newSellDiscountDetailInfoButtonClick,
      openDeleteSellDiscountDetailInfosDialog: sellDiscountDetailInfosUIContext.openDeleteSellDiscountDetailInfosDialog,
      openEditSellDiscountDetailInfoPage: sellDiscountDetailInfosUIContext.openEditSellDiscountDetailInfoPage,
      openUpdateSellDiscountDetailInfosStatusDialog: sellDiscountDetailInfosUIContext.openUpdateSellDiscountDetailInfosStatusDialog,
      openFetchSellDiscountDetailInfosDialog: sellDiscountDetailInfosUIContext.openFetchSellDiscountDetailInfosDialog,
    };
  }, [sellDiscountDetailInfosUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("SellDiscountDetailInfo.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={sellDiscountDetailInfosUIProps.newSellDiscountDetailInfoButtonClick}
          >
            {t("SellDiscountDetailInfo.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SellDiscountDetailInfosUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SellDiscountDetailInfosUIConsumer>
        <SellDiscountDetailInfosTable />
      </CardBody>
    </Card>
  );
}