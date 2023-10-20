import React, { useMemo } from "react";
import { useDiscountsUIContext } from "./DiscountsUIContext";
import { useTranslation } from "react-i18next";

export function DiscountsToolbar() {
  const { t } = useTranslation();

  const discountsUIContext = useDiscountsUIContext();
  const discountsUIProps = useMemo(() => {
    return {
      buyReturnId: discountsUIContext.buyReturnId,
      editable: discountsUIContext.editable,
      openNewDiscountDialog: discountsUIContext.openNewDiscountDialog,
    };
  }, [discountsUIContext]);

  return (
    <>
      <div
        className="form-filtration pt-3"
        style={{ borderTop: "1px solid rgb(221, 221, 221)" }}
      >
        <div className="row align-items-center">
          <div className="col-md-3 mr-auto text-left margin-bottom-10-mobile">
            <h4>{t("BuyReturnDiscount.Plural")}</h4>
          </div>
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
          {discountsUIProps.editable && (
            <button
              type="button"
              className="btn btn-success"
              onClick={() => discountsUIProps.openNewDiscountDialog()}
              >
                {t("BuyReturnDiscount.Entity")} {t("Common.New")}
            </button>
          )}
          </div>
        </div>
      </div>
    </>
  );
}
