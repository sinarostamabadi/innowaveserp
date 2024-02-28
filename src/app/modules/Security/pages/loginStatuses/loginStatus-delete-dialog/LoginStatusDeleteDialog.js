/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/loginStatuses/loginStatusesActions";
import { useLoginStatusesUIContext } from "../LoginStatusesUIContext";
import { useTranslation } from "react-i18next";

export function LoginStatusDeleteDialog({ id, show, onHide }) {
  const { t } = useTranslation();

  // LoginStatuses UI Context
  const loginStatusesUIContext = useLoginStatusesUIContext();
  const [error, setError] = useState(null);
  const loginStatusesUIProps = useMemo(() => {
    return {
      setIds: loginStatusesUIContext.setIds,
      queryParams: loginStatusesUIContext.queryParams,
    };
  }, [loginStatusesUIContext]);

  // LoginStatuses Redux state
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.loginStatuses.actionsLoading }),
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

  const deleteLoginStatus = () => {
    // server request for deleting loginStatus by id
    dispatch(actions.deleteLoginStatus(id))
      .then(() => {
        // refresh list after deletion
        dispatch(actions.fetchLoginStatuses(loginStatusesUIProps.queryParams));
        // clear selections list
        loginStatusesUIProps.setIds([]);
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
          {t("Common.Delete") + " " + t("LoginStatus.Entity")}
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
            onClick={deleteLoginStatus}
            className="btn btn-delete btn-danger"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
