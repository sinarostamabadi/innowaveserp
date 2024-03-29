/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/buys/buysActions";
import { useBuysUIContext } from "../BuysUIContext";
import { useTranslation } from "react-i18next";
import { ObjectToFormData } from "src/core/_helpers";

export function BuyCancelAndReturn({ id, show, onHide }) {
  const { t } = useTranslation();
  const [error, setError] = useState(null);

  // Buys UI Context
  const buysUIContext = useBuysUIContext();
  const buysUIProps = useMemo(() => {
    return {
      queryParams: buysUIContext.queryParams,
    };
  }, [buysUIContext]);

  // Buys Redux state
  const dispatch = useDispatch();
  const [invoiceModel, setInvoiceModel] = useState(null);
  const { isLoading, entities } = useSelector(
    (state) => ({
      isLoading: state.buys.actionsLoading,
      entities: state.buys.entities,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    } else {
      setInvoiceModel({
        ...entities.filter((model) => model.BuyId == id)[0],
        IsCanceled: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);
  const updateBuy = () => {
    // server request for deleting buy by id
    dispatch(
      actions.updateBuy(id, ObjectToFormData(invoiceModel), () => {
        onHide(true);
      })
    )
      .then(() => {
        // refresh list after deletion
        // closing delete modal
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <Modal
      show={show}
      onHide={() => onHide(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.CancelAndReturn")}
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
            onClick={updateBuy}
            className="btn btn-delete btn-danger"
          >
            {t("Common.CancelAndReturn")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
