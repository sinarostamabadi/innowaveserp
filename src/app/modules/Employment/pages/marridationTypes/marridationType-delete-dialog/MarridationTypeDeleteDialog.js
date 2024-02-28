/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/marridationTypes/marridationTypesActions";
import { useMarridationTypesUIContext } from "../MarridationTypesUIContext";
import { useTranslation } from "react-i18next";

export function MarridationTypeDeleteDialog({ id, show, onHide }) {
  const { t } = useTranslation();

  // MarridationTypes UI Context
  const marridationTypesUIContext = useMarridationTypesUIContext();
  const [error, setError] = useState(null);
  const marridationTypesUIProps = useMemo(() => {
    return {
      setIds: marridationTypesUIContext.setIds,
      queryParams: marridationTypesUIContext.queryParams,
    };
  }, [marridationTypesUIContext]);

  // MarridationTypes Redux state
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.marridationTypes.actionsLoading }),
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

  const deleteMarridationType = () => {
    // server request for deleting marridationType by id
    dispatch(actions.deleteMarridationType(id))
      .then(() => {
        // refresh list after deletion
        dispatch(
          actions.fetchMarridationTypes(marridationTypesUIProps.queryParams)
        );
        // clear selections list
        marridationTypesUIProps.setIds([]);
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
          {t("Common.Delete") + " " + t("MarridationType.Entity")}
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
            onClick={deleteMarridationType}
            className="btn btn-delete btn-danger"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
