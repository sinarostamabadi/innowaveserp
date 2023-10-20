import React, { useMemo } from "react";
import { usePersonSpecialDaysUIContext } from "./PersonSpecialDaysUIContext";
import { useTranslation } from "react-i18next";

export function PersonSpecialDaysFilter() {
  const { t } = useTranslation();

  const personSpecialDaysUIContext = usePersonSpecialDaysUIContext();
  const personSpecialDaysUIProps = useMemo(() => {
    return {
      openNewPersonSpecialDayDialog: personSpecialDaysUIContext.openNewPersonSpecialDayDialog,
    };
  }, [personSpecialDaysUIContext]);

  return (
    <>
      <div className="form-filtration">
        <div className="row align-items-center">
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => personSpecialDaysUIProps.openNewPersonSpecialDayDialog()}
            >
              {t("PersonSpecialDay.Entity")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
