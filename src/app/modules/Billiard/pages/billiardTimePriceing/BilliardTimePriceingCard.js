import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BilliardTimePriceingTable } from "./billiardTimePriceing-table/BilliardTimePriceingTable";
import {
  useBilliardTimePriceingUIContext,
  BilliardTimePriceingUIConsumer,
} from "./BilliardTimePriceingUIContext";
import { useTranslation } from "react-i18next";

export function BilliardTimePriceingCard() {
  const { t } = useTranslation();

  const billiardTimePriceingUIContext = useBilliardTimePriceingUIContext();

  const billiardTimePriceingUIProps = useMemo(() => {
    return {
      ids: billiardTimePriceingUIContext.ids,
      queryParams: billiardTimePriceingUIContext.queryParams,
      setQueryParams: billiardTimePriceingUIContext.setQueryParams,
      newBilliardTimePriceingButtonClick:
        billiardTimePriceingUIContext.newBilliardTimePriceingButtonClick,
      openDeleteBilliardTimePriceingDialog:
        billiardTimePriceingUIContext.openDeleteBilliardTimePriceingDialog,
      openEditBilliardTimePriceingPage:
        billiardTimePriceingUIContext.openEditBilliardTimePriceingPage,
      openUpdateBilliardTimePriceingStatusDialog:
        billiardTimePriceingUIContext.openUpdateBilliardTimePriceingStatusDialog,
      openFetchBilliardTimePriceingDialog:
        billiardTimePriceingUIContext.openFetchBilliardTimePriceingDialog,
    };
  }, [billiardTimePriceingUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("BilliardTimePriceing.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              billiardTimePriceingUIProps.newBilliardTimePriceingButtonClick
            }
          >
            {t("BilliardTimePriceing.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BilliardTimePriceingUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BilliardTimePriceingUIConsumer>
        <BilliardTimePriceingTable />
      </CardBody>
    </Card>
  );
}
