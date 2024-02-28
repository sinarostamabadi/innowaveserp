import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BuyRequestDetailsTable } from "./buyRequestDetails-table/BuyRequestDetailsTable";
import {
  useBuyRequestDetailsUIContext,
  BuyRequestDetailsUIConsumer,
} from "./BuyRequestDetailsUIContext";
import { useTranslation } from "react-i18next";

export function BuyRequestDetailsCard() {
  const { t } = useTranslation();

  const buyRequestDetailsUIContext = useBuyRequestDetailsUIContext();

  const buyRequestDetailsUIProps = useMemo(() => {
    return {
      ids: buyRequestDetailsUIContext.ids,
      queryParams: buyRequestDetailsUIContext.queryParams,
      setQueryParams: buyRequestDetailsUIContext.setQueryParams,
      newBuyRequestDetailButtonClick:
        buyRequestDetailsUIContext.newBuyRequestDetailButtonClick,
      openDeleteBuyRequestDetailsDialog:
        buyRequestDetailsUIContext.openDeleteBuyRequestDetailsDialog,
      openEditBuyRequestDetailPage:
        buyRequestDetailsUIContext.openEditBuyRequestDetailPage,
      openUpdateBuyRequestDetailsStatusDialog:
        buyRequestDetailsUIContext.openUpdateBuyRequestDetailsStatusDialog,
      openFetchBuyRequestDetailsDialog:
        buyRequestDetailsUIContext.openFetchBuyRequestDetailsDialog,
    };
  }, [buyRequestDetailsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("BuyRequestDetail.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={buyRequestDetailsUIProps.newBuyRequestDetailButtonClick}
          >
            {t("BuyRequestDetail.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BuyRequestDetailsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BuyRequestDetailsUIConsumer>
        <BuyRequestDetailsTable />
      </CardBody>
    </Card>
  );
}
