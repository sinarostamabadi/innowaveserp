/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/reserves/reservesActions";
import { useReservesUIContext } from "../ReservesUIContext";
import { useTranslation } from "react-i18next";
import moment from "jalali-moment";

export function ReserveAddTimeDialog({ id, show, onHide }) {
  const { t } = useTranslation();

  // Reserves UI Context
  const reservesUIContext = useReservesUIContext();
  const [error, setError] = useState(null);
  const reservesUIProps = useMemo(() => {
    return {
      setIds: reservesUIContext.setIds,
      queryParams: reservesUIContext.queryParams,
    };
  }, [reservesUIContext]);

  // Reserves Redux state
  const dispatchFetch = useDispatch();
  const dispatch = useDispatch();

  const { isLoading, reserveForEdit } = useSelector(
    (state) => ({
      isLoading: state.reserves.actionsLoading,
      reserveForEdit: state.reserves.reserveForEdit,
    }),
    shallowEqual
  );
  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    else {
      dispatchFetch(actions.fetchReserve(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const doneReserve = () => {
    // server request for deleting reserve by id
    dispatch(actions.addTimeReserve(id, {...reserveForEdit, ToTime: moment.from().add(10, "minutes").locale("en").format("HH:mm")}))
      .then(() => {
        // refresh list after deletion
        dispatch(actions.fetchReserves(reservesUIProps.queryParams));
        // clear selections list
        reservesUIProps.setIds([]);
        // closing done modal
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
        <Modal.Title id="example-modal-sizes-title-lg">{t("Common.AddTime") + " " + t("BowlingReserve.Entity")}</Modal.Title>
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
        {!isLoading && <span>{t("Common.UpdateQuestion")}</span>}
        {isLoading && <span>{t("Common.UpdateLoading")}</span>}
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
            onClick={doneReserve}
            className="btn btn-delete btn-danger"
          >
            {t("Common.AddTime")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}