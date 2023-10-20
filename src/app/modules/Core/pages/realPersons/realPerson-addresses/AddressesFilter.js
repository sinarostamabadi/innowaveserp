import React, { useMemo } from "react";
import { useAddressesUIContext } from "./AddressesUIContext";
import { useTranslation } from "react-i18next";

export function AddressesFilter() {
  const { t } = useTranslation();

  const addressesUIContext = useAddressesUIContext();
  const addressesUIProps = useMemo(() => {
    return {
      openNewAddressDialog: addressesUIContext.openNewAddressDialog,
    };
  }, [addressesUIContext]);

  return (
    <>
      <div className="form-filtration">
        <div className="row align-items-center">
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => addressesUIProps.openNewAddressDialog()}
            >
              {t("Address.Entity")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
