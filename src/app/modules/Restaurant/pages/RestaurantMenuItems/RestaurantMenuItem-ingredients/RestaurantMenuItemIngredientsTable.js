import React, { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { useRestaurantMenuItemIngredientsUIContext } from "./RestaurantMenuItemIngredientsUIContext";
import { useTranslation } from "react-i18next";

export function RestaurantMenuItemIngredientsTable() {
  const { t } = useTranslation();
  const restaurantMenuItemIngredientsUIContext =
    useRestaurantMenuItemIngredientsUIContext();
  const restaurantMenuItemIngredientsUIProps = useMemo(() => {
    return {
      restaurantMenuItemIngredients:
        restaurantMenuItemIngredientsUIContext.restaurantMenuItemIngredients,
      activeRestaurantMenuItemIngredients:
        restaurantMenuItemIngredientsUIContext.activeRestaurantMenuItemIngredients,
      openEditRestaurantMenuItemIngredientDialog:
        restaurantMenuItemIngredientsUIContext.openEditRestaurantMenuItemIngredientDialog,
      openSerialRestaurantMenuItemIngredientDialog:
        restaurantMenuItemIngredientsUIContext.openSerialRestaurantMenuItemIngredientDialog,
      openDeleteRestaurantMenuItemIngredientDialog:
        restaurantMenuItemIngredientsUIContext.openDeleteRestaurantMenuItemIngredientDialog,
    };
  }, [restaurantMenuItemIngredientsUIContext]);

  const columns = [
    {
      dataField: "ProductGroup.Title",
      text: t("RestaurantMenuItemIngredient.ProductGroup"),
      sort: false,
    },
    {
      dataField: "Unit.Name",
      text: t("RestaurantMenuItemIngredient.Unit"),
      sort: false,
    },
    {
      dataField: "Amount",
      text: t("RestaurantMenuItemIngredient.Amount"),
      sort: false,
    },
    {
      dataField: "Description",
      text: t("RestaurantMenuItemIngredient.Description"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditRestaurantMenuItemIngredientDialog:
          restaurantMenuItemIngredientsUIProps.openEditRestaurantMenuItemIngredientDialog,
        openDeleteRestaurantMenuItemIngredientDialog:
          restaurantMenuItemIngredientsUIProps.openDeleteRestaurantMenuItemIngredientDialog,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  return (
    <>
      <BootstrapTable
        wrapperClasses="table-responsive"
        classes="table table-head-custom table-vertical-center"
        bordered={false}
        bootstrap4
        remote
        keyField="RestaurantMenuItemIngredientId"
        data={
          restaurantMenuItemIngredientsUIProps.activeRestaurantMenuItemIngredients ===
          null
            ? []
            : restaurantMenuItemIngredientsUIProps.activeRestaurantMenuItemIngredients
        }
        columns={columns}
      >
        <PleaseWaitMessage
          entities={
            restaurantMenuItemIngredientsUIProps.activeRestaurantMenuItemIngredients
          }
        />
        <NoRecordsFoundMessage
          entities={
            restaurantMenuItemIngredientsUIProps.activeRestaurantMenuItemIngredients
          }
        />
      </BootstrapTable>
    </>
  );
}
