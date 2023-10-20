
/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/buyDiscounts/buyDiscountsActions";
import { useBuyDiscountsUIContext } from "../BuyDiscountsUIContext";
import { useTranslation } from "react-i18next";

export function BuyDiscountDeleteDialog({ id, show, onHide }) {
  const { t } = useTranslation();

  // BuyDiscounts UI Context
  const buyDiscountsUIContext = useBuyDiscountsUIContext();
  const [error, setError] = useState(null);
  const buyDiscountsUIProps = useMemo(() => {
    return {
      setIds: buyDiscountsUIContext.setIds,
      queryParams: buyDiscountsUIContext.queryParams,
    };
  }, [buyDiscountsUIContext]);

  // BuyDiscounts Redux state
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.buyDiscounts.actionsLoading }),
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

  const deleteBuyDiscount = () => {
    // server request for deleting buyDiscount by id
    dispatch(actions.deleteBuyDiscount(id))
      .then(() => {
        // refresh list after deletion
        dispatch(actions.fetchBuyDiscounts(buyDiscountsUIProps.queryParams));
        // clear selections list
        buyDiscountsUIProps.setIds([]);
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
        <Modal.Title id="example-modal-sizes-title-lg">{t("Common.Delete") + " " + t("BuyDiscount.Entity")}</Modal.Title>
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
            onClick={deleteBuyDiscount}
            className="btn btn-delete btn-danger"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}