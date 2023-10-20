import React, { useMemo } from "react";
import { useDetailsUIContext } from "./DetailsUIContext";
import { useTranslation } from "react-i18next";

export function DetailsToolbar() {
  const { t } = useTranslation();

  const detailsUIContext = useDetailsUIContext();
  const detailsUIProps = useMemo(() => {
    return {
      mode: detailsUIContext.mode,
      openNewDetailDialog: detailsUIContext.openNewDetailDialog,
    };
  }, [detailsUIContext]);

  return (
    <>
      <div
        className="form-filtration pt-3"
        style={{ borderTop: "1px solid rgb(221, 221, 221)" }}
      >
        <div className="row align-items-center">
          <div className="col-md-3 mr-auto text-left margin-bottom-10-mobile">
            <h4>{t("BuyRequestDetail.Entity")}</h4>
          </div>
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            {(detailsUIProps.mode == 0 || detailsUIProps.mode == 4)&& (
              <button
                type="button"
                className="btn btn-success"
                onClick={() => detailsUIProps.openNewDetailDialog()}
              >
                {t("BuyRequestDetail.Entity")} {t("Common.New")}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
