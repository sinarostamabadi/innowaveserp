import React, { useMemo } from "react";
import { useCouponsUIContext } from "./CouponsUIContext";
import { useTranslation } from "react-i18next";

export function CouponsFilter() {
  const { t } = useTranslation();

  const couponsUIContext = useCouponsUIContext();
  const couponsUIProps = useMemo(() => {
    return {
      openNewCouponDialog: couponsUIContext.openNewCouponDialog,
    };
  }, [couponsUIContext]);

  return (
    <>
      <div className="form-filtration">
        <div className="row align-items-center">
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => couponsUIProps.openNewCouponDialog()}
            >
              {t("CashDocument.Coupon")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
