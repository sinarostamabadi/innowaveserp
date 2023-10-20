/* eslint-disable no-restricted-imports */
import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useRestaurantMenuItemPricesUIContext } from "./RestaurantMenuItemPricesUIContext";
import { useTranslation } from "react-i18next";

export function RestaurantMenuItemPriceDeleteDialog() {
  const { t } = useTranslation();

  // RestaurantMenuItemPrices UI Context
  const restaurantMenuItemPricesUIContext = useRestaurantMenuItemPricesUIContext();
  const restaurantMenuItemPricesUIProps = useMemo(() => {
    return {
      id: restaurantMenuItemPricesUIContext.selectedId,
      show: restaurantMenuItemPricesUIContext.showDeleteRestaurantMenuItemPriceDialog,
      onHide: restaurantMenuItemPricesUIContext.closeDeleteRestaurantMenuItemPriceDialog,
      queryParams: restaurantMenuItemPricesUIContext.queryParams,
      setIds: restaurantMenuItemPricesUIContext.setIds,
      findRestaurantMenuItemPrice: restaurantMenuItemPricesUIContext.findRestaurantMenuItemPrice,
      removeRestaurantMenuItemPrice: restaurantMenuItemPricesUIContext.removeRestaurantMenuItemPrice,
    };
  }, [restaurantMenuItemPricesUIContext]);

  // RestaurantMenuItemPrices Redux state
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(false);

  // if !id we should close modal
  useEffect(() => {
    if (!restaurantMenuItemPricesUIProps.id) {
      restaurantMenuItemPricesUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantMenuItemPricesUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteRestaurantMenuItemPrice = () => {
    restaurantMenuItemPricesUIProps.removeRestaurantMenuItemPrice(restaurantMenuItemPricesUIProps.id)
    restaurantMenuItemPricesUIProps.onHide();
  };

  return (
    <Modal
      show={restaurantMenuItemPricesUIProps.show}
      onHide={restaurantMenuItemPricesUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("RestaurantMenuItemPrice.Entity")}
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
            onClick={restaurantMenuItemPricesUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteRestaurantMenuItemPrice}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
