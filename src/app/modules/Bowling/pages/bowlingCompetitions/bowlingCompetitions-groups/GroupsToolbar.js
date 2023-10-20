import React, { useMemo } from "react";
import { useGroupsUIContext } from "./GroupsUIContext";
import { useTranslation } from "react-i18next";

export function GroupsToolbar() {
  const { t } = useTranslation();

  const groupsUIContext = useGroupsUIContext();
  const groupsUIProps = useMemo(() => {
    return {
      openNewGroupDialog: groupsUIContext.openNewGroupDialog,
    };
  }, [groupsUIContext]);

  return (
    <>
      <div
        className="form-filtration pt-3"
        style={{ borderTop: "1px solid rgb(221, 221, 221)" }}
      >
        <div className="row align-items-center">
          <div className="col-md-3 mr-auto text-left margin-bottom-10-mobile">
            <h4>{t("BowlingCompetitionGroup.Entity")}</h4>
          </div>
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => groupsUIProps.openNewGroupDialog()}
            >
              {t("BowlingCompetitionGroup.Entity")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
