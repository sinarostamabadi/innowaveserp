import React, { useMemo } from "react";
import { useCompanyPersonsUIContext } from "./CompanyPersonsUIContext";
import { useTranslation } from "react-i18next";

export function CompanyPersonsFilter() {
  const { t } = useTranslation();

  const companyPersonsUIContext = useCompanyPersonsUIContext();
  const companyPersonsUIProps = useMemo(() => {
    return {
      openNewCompanyPersonDialog: companyPersonsUIContext.openNewCompanyPersonDialog,
    };
  }, [companyPersonsUIContext]);

  return (
    <>
      <div className="form-filtration">
        <div className="row align-items-center">
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => companyPersonsUIProps.openNewCompanyPersonDialog()}
            >
              {t("CompanyPerson.Entity")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
