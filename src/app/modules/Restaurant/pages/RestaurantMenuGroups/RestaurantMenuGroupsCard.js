import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RestaurantMenuGroupsTable } from "./restaurantMenuGroups-table/RestaurantMenuGroupsTable";
import {
  useRestaurantMenuGroupsUIContext,
  RestaurantMenuGroupsUIConsumer,
} from "./RestaurantMenuGroupsUIContext";
import { useTranslation } from "react-i18next";

export function RestaurantMenuGroupsCard() {
  const { t } = useTranslation();

  const restaurantMenuGroupsUIContext = useRestaurantMenuGroupsUIContext();

  const restaurantMenuGroupsUIProps = useMemo(() => {
    return {
      ids: restaurantMenuGroupsUIContext.ids,
      queryParams: restaurantMenuGroupsUIContext.queryParams,
      setQueryParams: restaurantMenuGroupsUIContext.setQueryParams,
      newRestaurantMenuGroupButtonClick:
        restaurantMenuGroupsUIContext.newRestaurantMenuGroupButtonClick,
      openDeleteRestaurantMenuGroupsDialog:
        restaurantMenuGroupsUIContext.openDeleteRestaurantMenuGroupsDialog,
      openEditRestaurantMenuGroupPage:
        restaurantMenuGroupsUIContext.openEditRestaurantMenuGroupPage,
      openUpdateRestaurantMenuGroupsStatusDialog:
        restaurantMenuGroupsUIContext.openUpdateRestaurantMenuGroupsStatusDialog,
      openFetchRestaurantMenuGroupsDialog:
        restaurantMenuGroupsUIContext.openFetchRestaurantMenuGroupsDialog,
    };
  }, [restaurantMenuGroupsUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("RestaurantMenuGroup.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              restaurantMenuGroupsUIProps.newRestaurantMenuGroupButtonClick
            }
          >
            {t("RestaurantMenuGroup.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RestaurantMenuGroupsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RestaurantMenuGroupsUIConsumer>
        <RestaurantMenuGroupsTable />
      </CardBody>
    </Card>
  );
}
