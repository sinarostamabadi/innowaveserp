
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BilliardReservesTable } from "./billiardReserves-table/BilliardReservesTable";
import { useBilliardReservesUIContext, BilliardReservesUIConsumer } from "./BilliardReservesUIContext";
import { useTranslation } from 'react-i18next';

export function BilliardReservesCard() {
  const { t } = useTranslation();

  const billiardReservesUIContext = useBilliardReservesUIContext();

  const billiardReservesUIProps = useMemo(() => {
    return {
      ids: billiardReservesUIContext.ids,
      queryParams: billiardReservesUIContext.queryParams,
      setQueryParams: billiardReservesUIContext.setQueryParams,
      newBilliardReserveButtonClick: billiardReservesUIContext.newBilliardReserveButtonClick,
      openDeleteBilliardReservesDialog: billiardReservesUIContext.openDeleteBilliardReservesDialog,
      openEditBilliardReservePage: billiardReservesUIContext.openEditBilliardReservePage,
      openUpdateBilliardReservesStatusDialog: billiardReservesUIContext.openUpdateBilliardReservesStatusDialog,
      openFetchBilliardReservesDialog: billiardReservesUIContext.openFetchBilliardReservesDialog,
    };
  }, [billiardReservesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("BilliardReserve.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={billiardReservesUIProps.newBilliardReserveButtonClick}
          >
            {t("BilliardReserve.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BilliardReservesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BilliardReservesUIConsumer>
        <BilliardReservesTable />
      </CardBody>
    </Card>
  );
}