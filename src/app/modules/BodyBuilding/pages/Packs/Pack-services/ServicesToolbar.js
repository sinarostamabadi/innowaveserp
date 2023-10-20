import { useMemo } from "react";
import { useServicesUIContext } from "./ServicesUIContext";
import { useTranslation } from "react-i18next";

export function ServicesToolbar() {
  const { t } = useTranslation();

  const uiContext = useServicesUIContext();
  const uiProps = useMemo(() => {
    return {
      openNewDialog: uiContext.openNewServiceDialog,
    };
  }, [uiContext]);

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
              onClick={() => uiProps.openNewDialog()}
            >
              {t("BodyBuildingService.Entity")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}