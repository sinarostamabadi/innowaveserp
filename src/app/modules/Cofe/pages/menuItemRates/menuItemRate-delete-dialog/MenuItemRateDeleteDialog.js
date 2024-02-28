/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/menuItemRates/menuItemRatesActions";
import { useMenuItemRatesUIContext } from "../MenuItemRatesUIContext";
import { useTranslation } from "react-i18next";

export function MenuItemRateDeleteDialog({ id, show, onHide }) {
  const { t } = useTranslation();

  // MenuItemRates UI Context
  const menuItemRatesUIContext = useMenuItemRatesUIContext();
  const [error, setError] = useState(null);
  const menuItemRatesUIProps = useMemo(() => {
    return {
      setIds: menuItemRatesUIContext.setIds,
      queryParams: menuItemRatesUIContext.queryParams,
    };
  }, [menuItemRatesUIContext]);

  // MenuItemRates Redux state
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.menuItemRates.actionsLoading }),
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

  const deleteMenuItemRate = () => {
    // server request for deleting menuItemRate by id
    dispatch(actions.deleteMenuItemRate(id))
      .then(() => {
        // refresh list after deletion
        dispatch(actions.fetchMenuItemRates(menuItemRatesUIProps.queryParams));
        // clear selections list
        menuItemRatesUIProps.setIds([]);
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
          {t("Common.Delete") + " " + t("MenuItemRate.Entity")}
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
            onClick={deleteMenuItemRate}
            className="btn btn-delete btn-danger"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
