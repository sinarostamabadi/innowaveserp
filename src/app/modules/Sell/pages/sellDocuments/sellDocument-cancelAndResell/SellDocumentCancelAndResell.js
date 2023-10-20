/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/sellDocuments/sellDocumentsActions";
import { useSellDocumentsUIContext } from "../SellDocumentsUIContext";
import { useTranslation } from "react-i18next";

export function SellDocumentCancelAndResell({ id, show, onHide }) {
  const { t } = useTranslation();
  const [error, setError] = useState(null);

  // SellDocuments UI Context
  const uiContext = useSellDocumentsUIContext();
  const uiProps = useMemo(() => {
    return {
      queryParams: uiContext.queryParams,
    };
  }, [uiContext]);

  // SellDocuments Redux state
  const dispatch = useDispatch();
  const [sellDocumentModel, setSellDocumentModel] = useState(null);
  const { isLoading, entities } = useSelector(
    (state) => ({
      isLoading: state.sellDocuments.actionsLoading,
      entities: state.sellDocuments.entities,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    } else {
      setSellDocumentModel({
        ...entities.filter((model) => model.SellDocumentId == id)[0],
        IsCanceled: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);
  const updateSellDocument = () => {
    // server request for deleting sellDocument by id
    dispatch(
      actions.updateSellDocument(id, sellDocumentModel, () => {
        onHide();
      })
    )
      .then(() => {
        // refresh list after deletion

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
          {t("Common.CancelAndResell")}
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
            onClick={updateSellDocument}
            className="btn btn-delete btn-danger"
          >
            {t("Common.CancelAndResell")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
