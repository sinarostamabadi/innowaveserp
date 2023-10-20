
/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/importXMLKeies/importXMLKeiesActions";
import { useImportXMLKeiesUIContext } from "../ImportXMLKeiesUIContext";
import { useTranslation } from "react-i18next";

export function ImportXMLKeyDeleteDialog({ id, show, onHide }) {
  const { t } = useTranslation();

  // ImportXMLKeies UI Context
  const importXMLKeiesUIContext = useImportXMLKeiesUIContext();
  const [error, setError] = useState(null);
  const importXMLKeiesUIProps = useMemo(() => {
    return {
      setIds: importXMLKeiesUIContext.setIds,
      queryParams: importXMLKeiesUIContext.queryParams,
    };
  }, [importXMLKeiesUIContext]);

  // ImportXMLKeies Redux state
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.importXMLKeies.actionsLoading }),
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

  const deleteImportXMLKey = () => {
    // server request for deleting importXMLKey by id
    dispatch(actions.deleteImportXMLKey(id))
      .then(() => {
        // refresh list after deletion
        dispatch(actions.fetchImportXMLKeies(importXMLKeiesUIProps.queryParams));
        // clear selections list
        importXMLKeiesUIProps.setIds([]);
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
        <Modal.Title id="example-modal-sizes-title-lg">{t("Common.Delete") + " " + t("ImportXMLKey.Entity")}</Modal.Title>
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
            onClick={deleteImportXMLKey}
            className="btn btn-delete btn-danger"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}