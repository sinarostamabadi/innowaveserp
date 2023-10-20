import React, { useMemo } from "react";
import { useCostsUIContext } from "./CostsUIContext";
import { useTranslation } from "react-i18next";

export function CostsToolbar() {
  const { t } = useTranslation();

  const costsUIContext = useCostsUIContext();
  const costsUIProps = useMemo(() => {
    return {
      mode: costsUIContext.mode,
      openNewCostDialog: costsUIContext.openNewCostDialog,
    };
  }, [costsUIContext]);

  return (
    <>
      <div
        className="form-filtration pt-3"
        
      >
        <div className="row align-items-center">
          <div className="col text-left margin-bottom-10-mobile">
            <h4>{t("TakeAwayRequestCost.Entity")}</h4>
          </div>
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => costsUIProps.openNewCostDialog(costsUIProps.mode)}
            >
              {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
