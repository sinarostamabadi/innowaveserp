
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BuyDetailsTable } from "./buyDetails-table/BuyDetailsTable";
import { useBuyDetailsUIContext, BuyDetailsUIConsumer } from "./BuyDetailsUIContext";
import { useTranslation } from 'react-i18next';

export function BuyDetailsCard() {
  const { t } = useTranslation();

  const buyDetailsUIContext = useBuyDetailsUIContext();

  const buyDetailsUIProps = useMemo(() => {
    return {
      ids: buyDetailsUIContext.ids,
      queryParams: buyDetailsUIContext.queryParams,
      setQueryParams: buyDetailsUIContext.setQueryParams,
      newBuyDetailButtonClick: buyDetailsUIContext.newBuyDetailButtonClick,
      openDeleteBuyDetailsDialog: buyDetailsUIContext.openDeleteBuyDetailsDialog,
      openEditBuyDetailPage: buyDetailsUIContext.openEditBuyDetailPage,
      openUpdateBuyDetailsStatusDialog: buyDetailsUIContext.openUpdateBuyDetailsStatusDialog,
      openFetchBuyDetailsDialog: buyDetailsUIContext.openFetchBuyDetailsDialog,
    };
  }, [buyDetailsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("BuyDetail.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={buyDetailsUIProps.newBuyDetailButtonClick}
          >
            {t("BuyDetail.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BuyDetailsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BuyDetailsUIConsumer>
        <BuyDetailsTable />
      </CardBody>
    </Card>
  );
}