import { useMemo } from "react";
import { useDetailsUIContext } from "./DetailsUIContext";
import { useTranslation } from "react-i18next";
import { numberWithCommas } from "src/core/_helpers";

export function DetailsToolbar() {
  const { t } = useTranslation();

  const uiContext = useDetailsUIContext();
  const { activeDetails, openNewDialog } = useMemo(() => {
    return {
      openNewDialog: uiContext.openNewDetailDialog,
      activeDetails: uiContext.activeDetails,
    };
  }, [uiContext]);

  return (
    <>
      <div
        className="form-filtration pt-3"
        style={{ borderTop: "1px solid rgb(221, 221, 221)" }}
      >
        <div className="row align-items-center">
          <h6 className="ml-5">
            جمع کل:{" "}
            {numberWithCommas(
              activeDetails.reduce((a, b) => a + b.Price * b.ServiceCount, 0)
            )}{" "}
            ریال
          </h6>
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => openNewDialog()}
            >
              <i className="fas fa-plus"></i> {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
