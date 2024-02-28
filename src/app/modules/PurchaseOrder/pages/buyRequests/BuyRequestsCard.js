import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BuyRequestsTable } from "./buyRequests-table/BuyRequestsTable";
import {
  useBuyRequestsUIContext,
  BuyRequestsUIConsumer,
} from "./BuyRequestsUIContext";
import { useTranslation } from "react-i18next";

export function BuyRequestsCard() {
  const { t } = useTranslation();

  const buyRequestsUIContext = useBuyRequestsUIContext();

  const buyRequestsUIProps = useMemo(() => {
    return {
      ids: buyRequestsUIContext.ids,
      queryParams: buyRequestsUIContext.queryParams,
      setQueryParams: buyRequestsUIContext.setQueryParams,
      newBuyRequestButtonClick: buyRequestsUIContext.newBuyRequestButtonClick,
      openDeleteBuyRequestsDialog:
        buyRequestsUIContext.openDeleteBuyRequestsDialog,
      openEditBuyRequestPage: buyRequestsUIContext.openEditBuyRequestPage,
      openUpdateBuyRequestsStatusDialog:
        buyRequestsUIContext.openUpdateBuyRequestsStatusDialog,
      openFetchBuyRequestsDialog:
        buyRequestsUIContext.openFetchBuyRequestsDialog,
    };
  }, [buyRequestsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("BuyRequest.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={buyRequestsUIProps.newBuyRequestButtonClick}
          >
            {t("BuyRequest.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BuyRequestsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BuyRequestsUIConsumer>
        <BuyRequestsTable />
      </CardBody>
    </Card>
  );
}
