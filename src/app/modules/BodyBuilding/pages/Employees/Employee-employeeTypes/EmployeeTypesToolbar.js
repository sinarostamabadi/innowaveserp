import { useMemo } from "react";
import { useEmployeeTypesUIContext } from "./EmployeeTypesUIContext";
import { useTranslation } from "react-i18next";

export function EmployeeTypesToolbar() {
  const { t } = useTranslation();

  const uiContext = useEmployeeTypesUIContext();
  const uiProps = useMemo(() => {
    return {
      openNewDialog: uiContext.openNewEmployeeTypeDialog,
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
              {t("BodyBuildingEmployeeExpertise.Entity")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}