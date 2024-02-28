import React, { useMemo } from "react";
import { useCostsUIContext } from "./CostsUIContext";
import { useTranslation } from "react-i18next";

export function CostsToolbar() {
  const { t } = useTranslation();

  const costsUIContext = useCostsUIContext();
  const costsUIProps = useMemo(() => {
    return {
      buyId: costsUIContext.buyId,
      editable: costsUIContext.editable,
      openNewCostDialog: costsUIContext.openNewCostDialog,
    };
  }, [costsUIContext]);

  return (
    <>
      <div
        className="form-filtration pt-3"
        style={{ borderTop: "1px solid rgb(221, 221, 221)" }}
      >
        <div className="row align-items-center">
          <div className="col-md-3 mr-auto text-left margin-bottom-10-mobile">
            <h4>{t("BuyCost.Plural")}</h4>
          </div>
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            {costsUIProps.editable && (
              <button
                type="button"
                className="btn btn-success"
                onClick={() => costsUIProps.openNewCostDialog()}
              >
                {t("BuyCost.Entity")} {t("Common.New")}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
