/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/restaurantMenuItemAlbums/restaurantMenuItemAlbumsActions";
import { useRestaurantMenuItemAlbumsUIContext } from "../RestaurantMenuItemAlbumsUIContext";
import { useTranslation } from "react-i18next";

export function RestaurantMenuItemAlbumDeleteDialog({ id, show, onHide }) {
  const { t } = useTranslation();

  // RestaurantMenuItemAlbums UI Context
  const restaurantMenuItemAlbumsUIContext =
    useRestaurantMenuItemAlbumsUIContext();
  const [error, setError] = useState(null);
  const restaurantMenuItemAlbumsUIProps = useMemo(() => {
    return {
      setIds: restaurantMenuItemAlbumsUIContext.setIds,
      queryParams: restaurantMenuItemAlbumsUIContext.queryParams,
    };
  }, [restaurantMenuItemAlbumsUIContext]);

  // RestaurantMenuItemAlbums Redux state
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.restaurantMenuItemAlbums.actionsLoading }),
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

  const deleteRestaurantMenuItemAlbum = () => {
    // server request for deleting restaurantMenuItemAlbum by id
    dispatch(actions.deleteRestaurantMenuItemAlbum(id))
      .then(() => {
        // refresh list after deletion
        dispatch(
          actions.fetchRestaurantMenuItemAlbums(
            restaurantMenuItemAlbumsUIProps.queryParams
          )
        );
        // clear selections list
        restaurantMenuItemAlbumsUIProps.setIds([]);
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
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete") + " " + t("RestaurantMenuItemAlbum.Entity")}
        </Modal.Title>
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
            onClick={deleteRestaurantMenuItemAlbum}
            className="btn btn-delete btn-danger"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
