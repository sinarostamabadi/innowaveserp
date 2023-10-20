import React, { useMemo } from "react";
import { useChequePapersUIContext } from "./ChequePapersUIContext";
import { useTranslation } from "react-i18next";

export function ChequePapersFilter() {
  const { t } = useTranslation();

  const chequePapersUIContext = useChequePapersUIContext();
  const chequePapersUIProps = useMemo(() => {
    return {
      openNewChequePaperDialog: chequePapersUIContext.openNewChequePaperDialog,
    };
  }, [chequePapersUIContext]);

  return (
    <>
      <div className="form-filtration">
        <div className="row align-items-center">
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            {/* <button
              type="button"
              className="btn btn-success"
              onClick={() => chequePapersUIProps.openNewChequePaperDialog()}
            >
              {t("ChequePaper.Entity")} {t("Common.New")}
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
