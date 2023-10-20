import React, { useMemo } from "react";
import { useReservePersonsUIContext } from "./ReservePersonsUIContext";
import { useTranslation } from "react-i18next";

export function ReservePersonsToolbar() {
  const { t } = useTranslation();

  const reservePersonsUIContext = useReservePersonsUIContext();
  const reservePersonsUIProps = useMemo(() => {
    return {
      openNewReservePersonDialog: reservePersonsUIContext.openNewReservePersonDialog,
      clearPersons: reservePersonsUIContext.clearPersons,
    };
  }, [reservePersonsUIContext]);

  return (
    <>
      <div
        className="form-filtration pt-3"
        style={{ borderTop: "1px solid rgb(221, 221, 221)" }}
      >
        <div className="row align-items-center">
          <div className="col-md-3 mr-auto text-left margin-bottom-10-mobile">
            <h4>{t("ReservePerson.Plural")}</h4>
          </div>
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => reservePersonsUIProps.openNewReservePersonDialog()}
            >
              {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
