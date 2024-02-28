import React, { useMemo } from "react";
import { useRelationPersonGroupsUIContext } from "./RelationPersonGroupsUIContext";
import { useTranslation } from "react-i18next";

export function RelationPersonGroupsFilter() {
  const { t } = useTranslation();

  const relationPersonGroupsUIContext = useRelationPersonGroupsUIContext();
  const relationPersonGroupsUIProps = useMemo(() => {
    return {
      openNewRelationPersonGroupDialog:
        relationPersonGroupsUIContext.openNewRelationPersonGroupDialog,
    };
  }, [relationPersonGroupsUIContext]);

  return (
    <>
      <div className="form-filtration">
        <div className="row align-items-center">
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                relationPersonGroupsUIProps.openNewRelationPersonGroupDialog()
              }
            >
              {t("PersonGroup.Entity")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
