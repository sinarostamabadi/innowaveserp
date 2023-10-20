import React, { useMemo } from "react";
import { usePaymentsUIContext } from "./PaymentsUIContext";
import { useTranslation } from "react-i18next";

export function PaymentsFilter() {
  const { t } = useTranslation();

  const paymentsUIContext = usePaymentsUIContext();
  const paymentsUIProps = useMemo(() => {
    return {
      openNewPaymentDialog: paymentsUIContext.openNewPaymentDialog,
    };
  }, [paymentsUIContext]);

  return (
    <>
      <div className="form-filtration">
        <div className="row align-items-center">
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => paymentsUIProps.openNewPaymentDialog()}
            >
              {t("CashDocument.Money")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
