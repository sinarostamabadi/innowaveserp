/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/nextOperations/nextOperationsActions";
import { useNextOperationsUIContext } from "../NextOperationsUIContext";
import { useTranslation } from "react-i18next";

export function NextOperationDeleteDialog({ id, show, onHide }) {
  const { t } = useTranslation();

  // NextOperations UI Context
  const nextOperationsUIContext = useNextOperationsUIContext();
  const [error, setError] = useState(null);
  const nextOperationsUIProps = useMemo(() => {
    return {
      setIds: nextOperationsUIContext.setIds,
      queryParams: nextOperationsUIContext.queryParams,
    };
  }, [nextOperationsUIContext]);

  // NextOperations Redux state
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.nextOperations.actionsLoading }),
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

  const deleteNextOperation = () => {
    // server request for deleting nextOperation by id
    dispatch(actions.deleteNextOperation(id))
      .then(() => {
        // refresh list after deletion
        dispatch(
          actions.fetchNextOperations(nextOperationsUIProps.queryParams)
        );
        // clear selections list
        nextOperationsUIProps.setIds([]);
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
          {t("Common.Delete") + " " + t("NextOperation.Entity")}
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
            onClick={deleteNextOperation}
            className="btn btn-delete btn-danger"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
