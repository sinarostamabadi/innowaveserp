import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RestaurantMenuItemIngredientEditDialogHeader } from "./RestaurantMenuItemIngredientEditDialogHeader";
import { RestaurantMenuItemIngredientEditForm } from "./RestaurantMenuItemIngredientEditForm";
import { useRestaurantMenuItemIngredientsUIContext } from "../RestaurantMenuItemIngredientsUIContext";

export function RestaurantMenuItemIngredientEditDialog() {
  // RestaurantMenuItemIngredients UI Context
  const restaurantMenuItemIngredientsUIContext = useRestaurantMenuItemIngredientsUIContext();
  const restaurantMenuItemIngredientsUIProps = useMemo(() => {
    return {
      id: restaurantMenuItemIngredientsUIContext.selectedId,
      selectedItem: restaurantMenuItemIngredientsUIContext.selectedItem,
      show: restaurantMenuItemIngredientsUIContext.showEditRestaurantMenuItemIngredientDialog,
      onHide: restaurantMenuItemIngredientsUIContext.closeEditRestaurantMenuItemIngredientDialog,
      personId: restaurantMenuItemIngredientsUIContext.personId,
      queryParams: restaurantMenuItemIngredientsUIContext.queryParams,
      initRestaurantMenuItemIngredient: restaurantMenuItemIngredientsUIContext.initRestaurantMenuItemIngredient,
      findRestaurantMenuItemIngredient: restaurantMenuItemIngredientsUIContext.findRestaurantMenuItemIngredient,
      addRestaurantMenuItemIngredient: restaurantMenuItemIngredientsUIContext.addRestaurantMenuItemIngredient,
      updateRestaurantMenuItemIngredient: restaurantMenuItemIngredientsUIContext.updateRestaurantMenuItemIngredient,
    };
  }, [restaurantMenuItemIngredientsUIContext]);

  // RestaurantMenuItemIngredients Redux state
  const dispatch = useDispatch();
  const { actionsLoading, setActionsLoading } = useState(false);

  const [editRestaurantMenuItemIngredient, setEditRestaurantMenuItemIngredient] = useState(restaurantMenuItemIngredientsUIProps.initRestaurantMenuItemIngredient);

  useEffect(() => {
    if (!!restaurantMenuItemIngredientsUIProps.id)
      setEditRestaurantMenuItemIngredient(restaurantMenuItemIngredientsUIProps.findRestaurantMenuItemIngredient(restaurantMenuItemIngredientsUIProps.id));
  }, [restaurantMenuItemIngredientsUIProps.id, dispatch]);

  const saveRestaurantMenuItemIngredient = (restaurantMenuItemIngredient) => {
    if (!restaurantMenuItemIngredientsUIProps.id) {
      restaurantMenuItemIngredientsUIProps.addRestaurantMenuItemIngredient(restaurantMenuItemIngredient);
      restaurantMenuItemIngredientsUIProps.onHide();
    } else {
      restaurantMenuItemIngredientsUIProps.updateRestaurantMenuItemIngredient(restaurantMenuItemIngredient);
      restaurantMenuItemIngredientsUIProps.onHide();
    }
  };
  
  return (
    <Modal
      show={restaurantMenuItemIngredientsUIProps.show}
      onHide={restaurantMenuItemIngredientsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <RestaurantMenuItemIngredientEditDialogHeader id={restaurantMenuItemIngredientsUIProps.id} />
      <RestaurantMenuItemIngredientEditForm
        saveRestaurantMenuItemIngredient={saveRestaurantMenuItemIngredient}
        actionsLoading={actionsLoading}
        restaurantMenuItemIngredient={restaurantMenuItemIngredientsUIProps.selectedItem || restaurantMenuItemIngredientsUIProps.initRestaurantMenuItemIngredient}
        onHide={restaurantMenuItemIngredientsUIProps.onHide}
      />
    </Modal>
  );
}
