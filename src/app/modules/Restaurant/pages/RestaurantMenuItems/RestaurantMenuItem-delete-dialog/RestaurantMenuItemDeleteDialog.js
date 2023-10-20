
/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/RestaurantMenuItems/RestaurantMenuItemsActions";
import { useRestaurantMenuItemsUIContext } from "../RestaurantMenuItemsUIContext";
import { useTranslation } from "react-i18next";

export function RestaurantMenuItemDeleteDialog({ id, show, onHide }) {
  const { t } = useTranslation();

  // RestaurantMenuItems UI Context
  const restaurantMenuItemsUIContext = useRestaurantMenuItemsUIContext();
  const [error, setError] = useState(null);
  const restaurantMenuItemsUIProps = useMemo(() => {
    return {
      setIds: restaurantMenuItemsUIContext.setIds,
      queryParams: restaurantMenuItemsUIContext.queryParams,
    };
  }, [restaurantMenuItemsUIContext]);

  // RestaurantMenuItems Redux state
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.restaurantMenuItems.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteRestaurantMenuItem = () => {
    // server request for deleting restaurantMenuItem by id
    dispatch(actions.deleteRestaurantMenuItem(id))
      .then(() => {
        // refresh list after deletion
        dispatch(actions.fetchRestaurantMenuItems(restaurantMenuItemsUIProps.queryParams));
        // clear selections list
        restaurantMenuItemsUIProps.setIds([]);
        // closing delete modal
        onHide();
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{t("Common.Delete") + " " + t("RestaurantMenuItem.Entity")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {!isLoading && error != null && (
          <>
            <Alerty
              variant="danger"
              title={t("err.Error")}
              description={error.clientMessage}
            ></Alerty>
          </>
        )}
        {!isLoading && <span>{t("Common.DeleteQuestion")}</span>}
        {isLoading && <span>{t("Common.DeleteLoading")}</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteRestaurantMenuItem}
            className="btn btn-delete btn-danger"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}