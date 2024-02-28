/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useCompanyPersonsUIContext } from "./CompanyPersonsUIContext";
import { useTranslation } from "react-i18next";

export function CompanyPersonDeleteDialog() {
  const { t } = useTranslation();

  // CompanyPersons UI Context
  const companyPersonsUIContext = useCompanyPersonsUIContext();
  const companyPersonsUIProps = useMemo(() => {
    return {
      id: companyPersonsUIContext.selectedId,
      personId: companyPersonsUIContext.personId,
      show: companyPersonsUIContext.showDeleteCompanyPersonDialog,
      onHide: companyPersonsUIContext.closeDeleteCompanyPersonDialog,
      queryParams: companyPersonsUIContext.queryParams,
      setIds: companyPersonsUIContext.setIds,
      findCompanyPerson: companyPersonsUIContext.findCompanyPerson,
      removeCompanyPerson: companyPersonsUIContext.removeCompanyPerson,
    };
  }, [companyPersonsUIContext]);

  // CompanyPersons Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.companies.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!companyPersonsUIProps.id) {
      companyPersonsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyPersonsUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCompanyPerson = () => {
    companyPersonsUIProps.removeCompanyPerson(companyPersonsUIProps.id);
    companyPersonsUIProps.onHide();
  };

  return (
    <Modal
      show={companyPersonsUIProps.show}
      onHide={companyPersonsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("CompanyPerson.Entity")}
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
            onClick={companyPersonsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteCompanyPerson}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
