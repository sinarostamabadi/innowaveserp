import React, { useMemo } from "react";
import { usePromissoryNotesUIContext } from "./PromissoryNotesUIContext";
import { useTranslation } from "react-i18next";

export function PromissoryNotesFilter() {
  const { t } = useTranslation();

  const promissoryNotesUIContext = usePromissoryNotesUIContext();
  const promissoryNotesUIProps = useMemo(() => {
    return {
      openNewPromissoryNoteDialog: promissoryNotesUIContext.openNewPromissoryNoteDialog,
    };
  }, [promissoryNotesUIContext]);

  return (
    <>
      <div className="form-filtration">
        <div className="row align-items-center">
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => promissoryNotesUIProps.openNewPromissoryNoteDialog()}
            >
              {t("CashDocument.PromissoryNote")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
