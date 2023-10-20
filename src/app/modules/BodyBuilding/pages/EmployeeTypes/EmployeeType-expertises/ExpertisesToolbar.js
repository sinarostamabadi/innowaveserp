import { useMemo } from "react";
import { useExpertisesUIContext } from "./ExpertisesUIContext";
import { useTranslation } from "react-i18next";

export function ExpertisesToolbar() {
  const { t } = useTranslation();

  const uiContext = useExpertisesUIContext();
  const uiProps = useMemo(() => {
    return {
      openNewDialog: uiContext.openNewExpertiseDialog,
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
              {t("BodyBuildingEmployeeTypeExpertise.Entity")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}