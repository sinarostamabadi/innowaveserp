
/* eslint-disable no-restricted-imports */

import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/insuranceCompanies/insuranceCompaniesActions";
import { useInsuranceCompaniesUIContext } from "../InsuranceCompaniesUIContext";
import { useTranslation } from "react-i18next";

export function InsuranceCompanyDeleteDialog({ id, show, onHide }) {
  const { t } = useTranslation();

  // InsuranceCompanies UI Context
  const insuranceCompaniesUIContext = useInsuranceCompaniesUIContext();
  const [error, setError] = useState(null);
  const insuranceCompaniesUIProps = useMemo(() => {
    return {
      setIds: insuranceCompaniesUIContext.setIds,
      queryParams: insuranceCompaniesUIContext.queryParams,
    };
  }, [insuranceCompaniesUIContext]);

  // InsuranceCompanies Redux state
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.insuranceCompanies.actionsLoading }),
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

  const deleteInsuranceCompany = () => {
    // server request for deleting insuranceCompany by id
    dispatch(actions.deleteInsuranceCompany(id))
      .then(() => {
        // refresh list after deletion
        dispatch(actions.fetchInsuranceCompanies(insuranceCompaniesUIProps.queryParams));
        // clear selections list
        insuranceCompaniesUIProps.setIds([]);
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
        <Modal.Title id="example-modal-sizes-title-lg">{t("Common.Delete") + " " + t("InsuranceCompany.Entity")}</Modal.Title>
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
            onClick={deleteInsuranceCompany}
            className="btn btn-delete btn-danger"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}