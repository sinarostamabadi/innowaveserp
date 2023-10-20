import React, { useMemo } from "react";
import { useSellPricingDetailsUIContext } from "./SellPricingDetailsUIContext";
import { useTranslation } from "react-i18next";

export function SellPricingDetailsToolbar() {
  const { t } = useTranslation();

  const sellPricingDetailsUIContext = useSellPricingDetailsUIContext();
  const sellPricingDetailsUIProps = useMemo(() => {
    return {
      openNewSellPricingDetailDialog: sellPricingDetailsUIContext.openNewSellPricingDetailDialog,
    };
  }, [sellPricingDetailsUIContext]);

  return (
    <>
      <div
        className="form-filtration pt-3"
        style={{ borderTop: "1px solid rgb(221, 221, 221)" }}
      >
        <div className="row align-items-center">
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => sellPricingDetailsUIProps.openNewSellPricingDetailDialog()}
            >
              {t("SellPricingDetail.Entity")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
