import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RestaurantMenuItemPriceEditDialogHeader } from "./RestaurantMenuItemPriceEditDialogHeader";
import { RestaurantMenuItemPriceEditForm } from "./RestaurantMenuItemPriceEditForm";
import { useRestaurantMenuItemPricesUIContext } from "../RestaurantMenuItemPricesUIContext";

export function RestaurantMenuItemPriceEditDialog() {
  // RestaurantMenuItemPrices UI Context
  const restaurantMenuItemPricesUIContext =
    useRestaurantMenuItemPricesUIContext();
  const restaurantMenuItemPricesUIProps = useMemo(() => {
    return {
      id: restaurantMenuItemPricesUIContext.selectedId,
      selectedItem: restaurantMenuItemPricesUIContext.selectedItem,
      show: restaurantMenuItemPricesUIContext.showEditRestaurantMenuItemPriceDialog,
      onHide:
        restaurantMenuItemPricesUIContext.closeEditRestaurantMenuItemPriceDialog,
      personId: restaurantMenuItemPricesUIContext.personId,
      queryParams: restaurantMenuItemPricesUIContext.queryParams,
      initRestaurantMenuItemPrice:
        restaurantMenuItemPricesUIContext.initRestaurantMenuItemPrice,
      findRestaurantMenuItemPrice:
        restaurantMenuItemPricesUIContext.findRestaurantMenuItemPrice,
      addRestaurantMenuItemPrice:
        restaurantMenuItemPricesUIContext.addRestaurantMenuItemPrice,
      updateRestaurantMenuItemPrice:
        restaurantMenuItemPricesUIContext.updateRestaurantMenuItemPrice,
    };
  }, [restaurantMenuItemPricesUIContext]);

  // RestaurantMenuItemPrices Redux state
  const dispatch = useDispatch();
  const { actionsLoading, setActionsLoading } = useState(false);

  const [editRestaurantMenuItemPrice, setEditRestaurantMenuItemPrice] =
    useState(restaurantMenuItemPricesUIProps.initRestaurantMenuItemPrice);

  useEffect(() => {
    if (!!restaurantMenuItemPricesUIProps.id)
      setEditRestaurantMenuItemPrice(
        restaurantMenuItemPricesUIProps.findRestaurantMenuItemPrice(
          restaurantMenuItemPricesUIProps.id
        )
      );
  }, [restaurantMenuItemPricesUIProps.id, dispatch]);

  const saveRestaurantMenuItemPrice = (restaurantMenuItemPrice) => {
    if (!restaurantMenuItemPricesUIProps.id) {
      restaurantMenuItemPricesUIProps.addRestaurantMenuItemPrice(
        restaurantMenuItemPrice
      );
      restaurantMenuItemPricesUIProps.onHide();
    } else {
      restaurantMenuItemPricesUIProps.updateRestaurantMenuItemPrice(
        restaurantMenuItemPrice
      );
      restaurantMenuItemPricesUIProps.onHide();
    }
  };

  return (
    <Modal
      show={restaurantMenuItemPricesUIProps.show}
      onHide={restaurantMenuItemPricesUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <RestaurantMenuItemPriceEditDialogHeader
        id={restaurantMenuItemPricesUIProps.id}
      />
      <RestaurantMenuItemPriceEditForm
        saveRestaurantMenuItemPrice={saveRestaurantMenuItemPrice}
        actionsLoading={actionsLoading}
        restaurantMenuItemPrice={
          restaurantMenuItemPricesUIProps.selectedItem ||
          restaurantMenuItemPricesUIProps.initRestaurantMenuItemPrice
        }
        onHide={restaurantMenuItemPricesUIProps.onHide}
      />
    </Modal>
  );
}
