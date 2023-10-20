/* eslint-disable no-restricted-imports */
import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useRestaurantMenuItemIngredientsUIContext } from "./RestaurantMenuItemIngredientsUIContext";
import { useTranslation } from "react-i18next";

export function RestaurantMenuItemIngredientDeleteDialog() {
  const { t } = useTranslation();

  // RestaurantMenuItemIngredients UI Context
  const restaurantMenuItemIngredientsUIContext = useRestaurantMenuItemIngredientsUIContext();
  const restaurantMenuItemIngredientsUIProps = useMemo(() => {
    return {
      id: restaurantMenuItemIngredientsUIContext.selectedId,
      personId: restaurantMenuItemIngredientsUIContext.personId,
      show: restaurantMenuItemIngredientsUIContext.showDeleteRestaurantMenuItemIngredientDialog,
      onHide: restaurantMenuItemIngredientsUIContext.closeDeleteRestaurantMenuItemIngredientDialog,
      queryParams: restaurantMenuItemIngredientsUIContext.queryParams,
      setIds: restaurantMenuItemIngredientsUIContext.setIds,
      findRestaurantMenuItemIngredient: restaurantMenuItemIngredientsUIContext.findRestaurantMenuItemIngredient,
      removeRestaurantMenuItemIngredient: restaurantMenuItemIngredientsUIContext.removeRestaurantMenuItemIngredient,
    };
  }, [restaurantMenuItemIngredientsUIContext]);

  // RestaurantMenuItemIngredients Redux state
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(false);

  // if !id we should close modal
  useEffect(() => {
    if (!restaurantMenuItemIngredientsUIProps.id) {
      restaurantMenuItemIngredientsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantMenuItemIngredientsUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteRestaurantMenuItemIngredient = () => {
    restaurantMenuItemIngredientsUIProps.removeRestaurantMenuItemIngredient(restaurantMenuItemIngredientsUIProps.id)
    restaurantMenuItemIngredientsUIProps.onHide();
  };

  return (
    <Modal
      show={restaurantMenuItemIngredientsUIProps.show}
      onHide={restaurantMenuItemIngredientsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("RestaurantMenuItemIngredient.Entity")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>{t("Common.DeleteQuestion")}</span>
        )}
        {isLoading && <span>{t("Common.DeleteLoading")}</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={restaurantMenuItemIngredientsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteRestaurantMenuItemIngredient}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
