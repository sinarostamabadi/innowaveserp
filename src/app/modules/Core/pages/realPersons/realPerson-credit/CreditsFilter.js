import React, { useMemo } from "react";
import { useCreditsUIContext } from "./CreditsUIContext";
import { useTranslation } from "react-i18next";

export function CreditsFilter() {
  const { t } = useTranslation();

  const creditsUIContext = useCreditsUIContext();
  const creditsUIProps = useMemo(() => {
    return {
      openNewCreditDialog: creditsUIContext.openNewCreditDialog,
    };
  }, [creditsUIContext]);

  return (
    <>
      <div className="form-filtration">
        <div className="row align-items-center">
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => creditsUIProps.openNewCreditDialog()}
            >
              {t("Credit.Entity")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
