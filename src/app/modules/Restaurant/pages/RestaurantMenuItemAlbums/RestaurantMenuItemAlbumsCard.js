import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RestaurantMenuItemAlbumsTable } from "./restaurantMenuItemAlbums-table/RestaurantMenuItemAlbumsTable";
import {
  useRestaurantMenuItemAlbumsUIContext,
  RestaurantMenuItemAlbumsUIConsumer,
} from "./RestaurantMenuItemAlbumsUIContext";
import { useTranslation } from "react-i18next";

export function RestaurantMenuItemAlbumsCard() {
  const { t } = useTranslation();

  const restaurantMenuItemAlbumsUIContext =
    useRestaurantMenuItemAlbumsUIContext();

  const restaurantMenuItemAlbumsUIProps = useMemo(() => {
    return {
      ids: restaurantMenuItemAlbumsUIContext.ids,
      queryParams: restaurantMenuItemAlbumsUIContext.queryParams,
      setQueryParams: restaurantMenuItemAlbumsUIContext.setQueryParams,
      newRestaurantMenuItemAlbumButtonClick:
        restaurantMenuItemAlbumsUIContext.newRestaurantMenuItemAlbumButtonClick,
      openDeleteRestaurantMenuItemAlbumsDialog:
        restaurantMenuItemAlbumsUIContext.openDeleteRestaurantMenuItemAlbumsDialog,
      openEditRestaurantMenuItemAlbumPage:
        restaurantMenuItemAlbumsUIContext.openEditRestaurantMenuItemAlbumPage,
      openUpdateRestaurantMenuItemAlbumsStatusDialog:
        restaurantMenuItemAlbumsUIContext.openUpdateRestaurantMenuItemAlbumsStatusDialog,
      openFetchRestaurantMenuItemAlbumsDialog:
        restaurantMenuItemAlbumsUIContext.openFetchRestaurantMenuItemAlbumsDialog,
    };
  }, [restaurantMenuItemAlbumsUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("RestaurantMenuItemAlbum.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              restaurantMenuItemAlbumsUIProps.newRestaurantMenuItemAlbumButtonClick
            }
          >
            {t("RestaurantMenuItemAlbum.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RestaurantMenuItemAlbumsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RestaurantMenuItemAlbumsUIConsumer>
        <RestaurantMenuItemAlbumsTable />
      </CardBody>
    </Card>
  );
}
