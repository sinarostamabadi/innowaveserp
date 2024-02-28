/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/employeeLeaveChanges/employeeLeaveChangesActions";
import { useEmployeeLeaveChangesUIContext } from "../EmployeeLeaveChangesUIContext";
import { useTranslation } from "react-i18next";

export function EmployeeLeaveChangeDeleteDialog({ id, show, onHide }) {
  const { t } = useTranslation();

  // EmployeeLeaveChanges UI Context
  const employeeLeaveChangesUIContext = useEmployeeLeaveChangesUIContext();
  const [error, setError] = useState(null);
  const employeeLeaveChangesUIProps = useMemo(() => {
    return {
      setIds: employeeLeaveChangesUIContext.setIds,
      queryParams: employeeLeaveChangesUIContext.queryParams,
    };
  }, [employeeLeaveChangesUIContext]);

  // EmployeeLeaveChanges Redux state
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.employeeLeaveChanges.actionsLoading }),
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

  const deleteEmployeeLeaveChange = () => {
    // server request for deleting employeeLeaveChange by id
    dispatch(actions.deleteEmployeeLeaveChange(id))
      .then(() => {
        // refresh list after deletion
        dispatch(
          actions.fetchEmployeeLeaveChanges(
            employeeLeaveChangesUIProps.queryParams
          )
        );
        // clear selections list
        employeeLeaveChangesUIProps.setIds([]);
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
          {t("Common.Delete") + " " + t("EmployeeLeaveChange.Entity")}
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
            onClick={deleteEmployeeLeaveChange}
            className="btn btn-delete btn-danger"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
