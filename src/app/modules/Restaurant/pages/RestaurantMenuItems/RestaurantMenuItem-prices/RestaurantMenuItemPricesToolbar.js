import React, { useMemo } from "react";
import { useRestaurantMenuItemPricesUIContext } from "./RestaurantMenuItemPricesUIContext";
import { useTranslation } from "react-i18next";

export function RestaurantMenuItemPricesToolbar() {
  const { t } = useTranslation();

  const restaurantMenuItemPricesUIContext =
    useRestaurantMenuItemPricesUIContext();
  const restaurantMenuItemPricesUIProps = useMemo(() => {
    return {
      openNewRestaurantMenuItemPriceDialog:
        restaurantMenuItemPricesUIContext.openNewRestaurantMenuItemPriceDialog,
    };
  }, [restaurantMenuItemPricesUIContext]);

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
              onClick={() =>
                restaurantMenuItemPricesUIProps.openNewRestaurantMenuItemPriceDialog()
              }
            >
              {t("RestaurantMenuItemPrice.Entity")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
