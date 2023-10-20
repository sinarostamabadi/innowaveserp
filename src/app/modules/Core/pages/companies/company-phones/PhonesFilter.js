import React, { useMemo } from "react";
import { usePhonesUIContext } from "./PhonesUIContext";
import { useTranslation } from "react-i18next";

export function PhonesFilter() {
  const { t } = useTranslation();

  const phonesUIContext = usePhonesUIContext();
  const phonesUIProps = useMemo(() => {
    return {
      openNewPhoneDialog: phonesUIContext.openNewPhoneDialog,
    };
  }, [phonesUIContext]);

  return (
    <>
      <div className="form-filtration">
        <div className="row align-items-center">
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => phonesUIProps.openNewPhoneDialog()}
            >
              {t("Phone.Entity")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
