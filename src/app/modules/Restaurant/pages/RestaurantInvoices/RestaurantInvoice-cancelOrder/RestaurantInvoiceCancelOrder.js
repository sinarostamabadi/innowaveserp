/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/RestaurantInvoices/RestaurantInvoicesActions";
import { useRestaurantInvoicesUIContext } from "../RestaurantInvoicesUIContext";
import { useTranslation } from "react-i18next";

export function RestaurantInvoiceCancelOrder({ id, show, onHide }) {
  const { t } = useTranslation();
  const [error, setError] = useState(null);

  // RestaurantInvoices UI Context
  const restaurantInvoicesUIContext = useRestaurantInvoicesUIContext();
  const restaurantInvoicesUIProps = useMemo(() => {
    return {
      queryParams: restaurantInvoicesUIContext.queryParams,
    };
  }, [restaurantInvoicesUIContext]);

  // RestaurantInvoices Redux state
  const dispatch = useDispatch();
  const [invoiceModel, setInvoiceModel] = useState(null);
  const { isLoading, entities } = useSelector(
    (state) => ({
      isLoading: state.restaurantInvoices.actionsLoading,
      entities: state.restaurantInvoices.entities,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }else{
      setInvoiceModel(
        {...entities.filter((model) => model.RestaurantInvoiceId == id)[0], RestaurantInvoiceStatusId: 5}
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);
  const updateRestaurantInvoice = () => {
    // server request for deleting restaurantInvoice by id
    dispatch(actions.updateRestaurantInvoice(id, invoiceModel))
      .then(() => {
        // refresh list after deletion
        dispatch(actions.fetchRestaurantInvoices(restaurantInvoicesUIProps.queryParams));

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
          {t("Common.CancelOrder") + " " + t("RestaurantInvoice.Entity")}
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
            onClick={updateRestaurantInvoice}
            className="btn btn-delete btn-danger"
          >
            {t("Common.CancelOrder")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
