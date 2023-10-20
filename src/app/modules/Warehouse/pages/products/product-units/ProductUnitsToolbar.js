import React, { useMemo } from "react";
import { useProductUnitsUIContext } from "./ProductUnitsUIContext";
import { useTranslation } from "react-i18next";

export function ProductUnitsToolbar() {
  const { t } = useTranslation();

  const productUnitsUIContext = useProductUnitsUIContext();
  const productUnitsUIProps = useMemo(() => {
    return {
      openNewProductUnitDialog: productUnitsUIContext.openNewProductUnitDialog,
    };
  }, [productUnitsUIContext]);

  return (
    <>
      <div
        className="form-filtration pt-3"
        style={{ borderTop: "1px solid rgb(221, 221, 221)" }}
      >
        <div className="row align-items-center">
          <div className="col-md-3 ml-auto text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => productUnitsUIProps.openNewProductUnitDialog()}
            >
              {t("ProductUnit.Entity")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
