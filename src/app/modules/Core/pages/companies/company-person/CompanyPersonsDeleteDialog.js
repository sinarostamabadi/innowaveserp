/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useCompanyPersonsUIContext } from "./CompanyPersonsUIContext";

export function CompanyPersonsDeleteDialog() {
  // CompanyPersons UI Context
  const companyPersonsUIContext = useCompanyPersonsUIContext();
  const companyPersonsUIProps = useMemo(() => {
    return {
      personId: companyPersonsUIContext.personId,
      ids: companyPersonsUIContext.ids,
      show: companyPersonsUIContext.showDeleteCompanyPersonsDialog,
      onHide: companyPersonsUIContext.closeDeleteCompanyPersonsDialog,
      setIds: companyPersonsUIContext.setIds,
      queryParams: companyPersonsUIContext.queryParams,
      findCompanyPerson: companyPersonsUIContext.findCompanyPerson,
    };
  }, [companyPersonsUIContext]);

  // CompanyPersons Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.companies.actionsLoading }),
    shallowEqual
  );

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  // if there weren't selected companyPersons we should close modal
  useEffect(() => {
    if (!companyPersonsUIProps.ids || companyPersonsUIProps.ids.length === 0) {
      companyPersonsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyPersonsUIProps.ids]);

  const deleteCompanyPersons = () => {
    // server request for selected deleting companyPersons

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
          CompanyPersons Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            Are you sure to permanently delete selected companyPersons?
          </span>
        )}
        {isLoading && <span>CompanyPersons are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={companyPersonsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteCompanyPersons}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
