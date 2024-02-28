import React, { useMemo } from "react";
import { useRestaurantMenuItemIngredientsUIContext } from "./RestaurantMenuItemIngredientsUIContext";
import { useTranslation } from "react-i18next";

export function RestaurantMenuItemIngredientsToolbar() {
  const { t } = useTranslation();

  const restaurantMenuItemIngredientsUIContext =
    useRestaurantMenuItemIngredientsUIContext();
  const restaurantMenuItemIngredientsUIProps = useMemo(() => {
    return {
      openNewRestaurantMenuItemIngredientDialog:
        restaurantMenuItemIngredientsUIContext.openNewRestaurantMenuItemIngredientDialog,
    };
  }, [restaurantMenuItemIngredientsUIContext]);

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
                restaurantMenuItemIngredientsUIProps.openNewRestaurantMenuItemIngredientDialog()
              }
            >
              {t("RestaurantMenuItemIngredient.Entity")} {t("Common.New")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
