import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { AdvancedFilter } from "src/core/_partials/custom/advanced-filter/AdvancedFilter";
import { CouponsTable } from "./coupons-table/CouponsTable";
import { useCouponsUIContext, CouponsUIConsumer } from "./CouponsUIContext";
import { useTranslation } from "react-i18next";

export function CouponsCard() {
  const { t } = useTranslation();

  const couponsUIContext = useCouponsUIContext();

  const couponsUIProps = useMemo(() => {
    return {
      ids: couponsUIContext.ids,
      queryParams: couponsUIContext.queryParams,
      setQueryParams: couponsUIContext.setQueryParams,
      newCouponButtonClick: couponsUIContext.newCouponButtonClick,
      openDeleteCouponsDialog: couponsUIContext.openDeleteCouponsDialog,
      openEditCouponPage: couponsUIContext.openEditCouponPage,
      openUpdateCouponsStatusDialog:
        couponsUIContext.openUpdateCouponsStatusDialog,
      openFetchCouponsDialog: couponsUIContext.openFetchCouponsDialog,
    };
  }, [couponsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Coupon.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={couponsUIProps.newCouponButtonClick}
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CouponsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CouponsUIConsumer>
        <CouponsTable />
      </CardBody>
    </Card>
  );
}
