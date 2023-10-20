
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

export function BuyDeleteDialog({ id, show, onHide }) {
  const { t } = useTranslation();

  // Buys UI Context
  const buysUIContext = useBuysUIContext();
  const [error, setError] = useState(null);
  const buysUIProps = useMemo(() => {
    return {
      setIds: buysUIContext.setIds,
      queryParams: buysUIContext.queryParams,
    };
  }, [buysUIContext]);

  // Buys Redux state
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.buys.actionsLoading }),
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

  const deleteBuy = () => {
    // server request for deleting buy by id
    dispatch(actions.deleteBuy(id))
      .then(() => {
        // refresh list after deletion
        dispatch(actions.fetchBuys(buysUIProps.queryParams));
        // clear selections list
        buysUIProps.setIds([]);
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
        <Modal.Title id="example-modal-sizes-title-lg">{t("Common.Delete") + " " + t("Buy.Entity")}</Modal.Title>
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
            onClick={deleteBuy}
            className="btn btn-delete btn-danger"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}