
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BilliardReservePricesTable } from "./billiardReservePrices-table/BilliardReservePricesTable";
import { useBilliardReservePricesUIContext, BilliardReservePricesUIConsumer } from "./BilliardReservePricesUIContext";
import { useTranslation } from 'react-i18next';

export function BilliardReservePricesCard() {
  const { t } = useTranslation();

  const billiardReservePricesUIContext = useBilliardReservePricesUIContext();

  const billiardReservePricesUIProps = useMemo(() => {
    return {
      ids: billiardReservePricesUIContext.ids,
      queryParams: billiardReservePricesUIContext.queryParams,
      setQueryParams: billiardReservePricesUIContext.setQueryParams,
      newBilliardReservePriceButtonClick: billiardReservePricesUIContext.newBilliardReservePriceButtonClick,
      openDeleteBilliardReservePricesDialog: billiardReservePricesUIContext.openDeleteBilliardReservePricesDialog,
      openEditBilliardReservePricePage: billiardReservePricesUIContext.openEditBilliardReservePricePage,
      openUpdateBilliardReservePricesStatusDialog: billiardReservePricesUIContext.openUpdateBilliardReservePricesStatusDialog,
      openFetchBilliardReservePricesDialog: billiardReservePricesUIContext.openFetchBilliardReservePricesDialog,
    };
  }, [billiardReservePricesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("BilliardReservePrice.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={billiardReservePricesUIProps.newBilliardReservePriceButtonClick}
          >
            {t("BilliardReservePrice.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BilliardReservePricesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BilliardReservePricesUIConsumer>
        <BilliardReservePricesTable />
      </CardBody>
    </Card>
  );
}