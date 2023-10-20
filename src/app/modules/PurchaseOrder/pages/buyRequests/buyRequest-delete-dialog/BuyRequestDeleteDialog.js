
/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/buyRequests/buyRequestsActions";
import { useBuyRequestsUIContext } from "../BuyRequestsUIContext";
import { useTranslation } from "react-i18next";

export function BuyRequestDeleteDialog({ id, show, onHide }) {
  const { t } = useTranslation();

  // BuyRequests UI Context
  const buyRequestsUIContext = useBuyRequestsUIContext();
  const [error, setError] = useState(null);
  const buyRequestsUIProps = useMemo(() => {
    return {
      setIds: buyRequestsUIContext.setIds,
      queryParams: buyRequestsUIContext.queryParams,
    };
  }, [buyRequestsUIContext]);

  // BuyRequests Redux state
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.buyRequests.actionsLoading }),
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

  const deleteBuyRequest = () => {
    // server request for deleting buyRequest by id
    dispatch(actions.deleteBuyRequest(id))
      .then(() => {
        // refresh list after deletion
        dispatch(actions.fetchBuyRequests(buyRequestsUIProps.queryParams));
        // clear selections list
        buyRequestsUIProps.setIds([]);
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
        <Modal.Title id="example-modal-sizes-title-lg">{t("Common.Delete") + " " + t("BuyRequest.Entity")}</Modal.Title>
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
            onClick={deleteBuyRequest}
            className="btn btn-delete btn-danger"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}