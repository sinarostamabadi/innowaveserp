import React, { useMemo } from "react";
import { useBowlingTeamPersonsUIContext } from "./BowlingTeamPersonsUIContext";
import { useTranslation } from "react-i18next";

export function BowlingTeamPersonsToolbar() {
  const { t } = useTranslation();

  const bowlingTeamPersonsUIContext = useBowlingTeamPersonsUIContext();
  const bowlingTeamPersonsUIProps = useMemo(() => {
    return {
      openNewBowlingTeamPersonDialog: bowlingTeamPersonsUIContext.openNewBowlingTeamPersonDialog,
      clearPersons: bowlingTeamPersonsUIContext.clearPersons,
    };
  }, [bowlingTeamPersonsUIContext]);

  return (
    <>
      <div
        className="form-filtration pt-3"
        style={{ borderTop: "1px solid rgb(221, 221, 221)" }}
      >
        <div className="row align-items-center">
          <div className="col-md-3 mr-auto text-left margin-bottom-10-mobile">
            <h4>{t("BowlingTeamPerson.Plural")}</h4>
          </div>
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success mr-1"
              onClick={() => bowlingTeamPersonsUIProps.clearPersons()}
            >
              {t("Common.ClearAll")}
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => bowlingTeamPersonsUIProps.openNewBowlingTeamPersonDialog()}
            >
              {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
