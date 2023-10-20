import React, { useMemo } from "react";
import { useProductWarehousesUIContext } from "./ProductWarehousesUIContext";
import { useTranslation } from "react-i18next";

export function ProductWarehousesToolbar() {
  const { t } = useTranslation();

  const productWarehousesUIContext = useProductWarehousesUIContext();
  const productWarehousesUIProps = useMemo(() => {
    return {
      openNewProductWarehouseDialog: productWarehousesUIContext.openNewProductWarehouseDialog,
    };
  }, [productWarehousesUIContext]);

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
              onClick={() => productWarehousesUIProps.openNewProductWarehouseDialog()}
            >
              {t("ProductWarehouse.Entity")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
