/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/phones/phonesActions";
import { usePhonesUIContext } from "./PhonesUIContext";
import { useTranslation } from "react-i18next";

export function PhoneDeleteDialog() {
  const { t } = useTranslation();

  // Phones UI Context
  const phonesUIContext = usePhonesUIContext();
  const phonesUIProps = useMemo(() => {
    return {
      id: phonesUIContext.selectedId,
      personId: phonesUIContext.personId,
      show: phonesUIContext.showDeletePhoneDialog,
      onHide: phonesUIContext.closeDeletePhoneDialog,
      queryParams: phonesUIContext.queryParams,
      setIds: phonesUIContext.setIds,
      findPhone: phonesUIContext.findPhone,
      removePhone: phonesUIContext.removePhone,
    };
  }, [phonesUIContext]);

  // Phones Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.phones.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!phonesUIProps.id) {
      phonesUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phonesUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deletePhone = () => {
    phonesUIProps.removePhone(phonesUIProps.id);
    phonesUIProps.onHide();
  };

  return (
    <Modal
      show={phonesUIProps.show}
      onHide={phonesUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("Phone.Entity")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>{t("Common.DeleteQuestion")}</span>}
        {isLoading && <span>{t("Common.DeleteLoading")}</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={phonesUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deletePhone}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
