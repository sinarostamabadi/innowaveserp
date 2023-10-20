
/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "src/core/_partials/controls";
import * as actions from "../../../_redux/bankCards/bankCardsActions";
import { useBankCardsUIContext } from "../BankCardsUIContext";
import { useTranslation } from "react-i18next";

export function BankCardDeleteDialog({ id, show, onHide }) {
  const { t } = useTranslation();

  // BankCards UI Context
  const bankCardsUIContext = useBankCardsUIContext();
  const [error, setError] = useState(null);
  const bankCardsUIProps = useMemo(() => {
    return {
      setIds: bankCardsUIContext.setIds,
      queryParams: bankCardsUIContext.queryParams,
    };
  }, [bankCardsUIContext]);

  // BankCards Redux state
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.bankCards.actionsLoading }),
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

  const deleteBankCard = () => {
    // server request for deleting bankCard by id
    dispatch(actions.remove(id))
      .then(() => {
        // refresh list after deletion
        dispatch(actions.fetchBankCards(bankCardsUIProps.queryParams));
        // clear selections list
        bankCardsUIProps.setIds([]);
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
        <Modal.Title id="example-modal-sizes-title-lg">{t("Common.Delete") + " " + t("BankCard.Entity")}</Modal.Title>
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
            onClick={deleteBankCard}
            className="btn btn-delete btn-danger"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}