import React, { useMemo } from "react";
import { useWalletsUIContext } from "./WalletsUIContext";
import { useTranslation } from "react-i18next";

export function WalletsFilter() {
  const { t } = useTranslation();

  const walletsUIContext = useWalletsUIContext();
  const walletsUIProps = useMemo(() => {
    return {
      openNewWalletDialog: walletsUIContext.openNewWalletDialog,
    };
  }, [walletsUIContext]);

  return (
    <>
      <div className="form-filtration">
        <div className="row align-items-center">
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => walletsUIProps.openNewWalletDialog()}
            >
              {t("CashDocument.Wallet")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
