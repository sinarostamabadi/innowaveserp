
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RestaurantMenuItemIngredientsTable } from "./restaurantMenuItemIngredients-table/RestaurantMenuItemIngredientsTable";
import { useRestaurantMenuItemIngredientsUIContext, RestaurantMenuItemIngredientsUIConsumer } from "./RestaurantMenuItemIngredientsUIContext";
import { useTranslation } from 'react-i18next';

export function RestaurantMenuItemIngredientsCard() {
  const { t } = useTranslation();

  const restaurantMenuItemIngredientsUIContext = useRestaurantMenuItemIngredientsUIContext();

  const restaurantMenuItemIngredientsUIProps = useMemo(() => {
    return {
      ids: restaurantMenuItemIngredientsUIContext.ids,
      queryParams: restaurantMenuItemIngredientsUIContext.queryParams,
      setQueryParams: restaurantMenuItemIngredientsUIContext.setQueryParams,
      newRestaurantMenuItemIngredientButtonClick: restaurantMenuItemIngredientsUIContext.newRestaurantMenuItemIngredientButtonClick,
      openDeleteRestaurantMenuItemIngredientsDialog: restaurantMenuItemIngredientsUIContext.openDeleteRestaurantMenuItemIngredientsDialog,
      openEditRestaurantMenuItemIngredientPage: restaurantMenuItemIngredientsUIContext.openEditRestaurantMenuItemIngredientPage,
      openUpdateRestaurantMenuItemIngredientsStatusDialog: restaurantMenuItemIngredientsUIContext.openUpdateRestaurantMenuItemIngredientsStatusDialog,
      openFetchRestaurantMenuItemIngredientsDialog: restaurantMenuItemIngredientsUIContext.openFetchRestaurantMenuItemIngredientsDialog,
    };
  }, [restaurantMenuItemIngredientsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("RestaurantMenuItemIngredient.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={restaurantMenuItemIngredientsUIProps.newRestaurantMenuItemIngredientButtonClick}
          >
            {t("RestaurantMenuItemIngredient.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RestaurantMenuItemIngredientsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RestaurantMenuItemIngredientsUIConsumer>
        <RestaurantMenuItemIngredientsTable />
      </CardBody>
    </Card>
  );
}