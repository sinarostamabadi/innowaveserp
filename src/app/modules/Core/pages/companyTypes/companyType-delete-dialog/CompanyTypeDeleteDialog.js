/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/companyTypes/companyTypesActions";
import { useCompanyTypesUIContext } from "../CompanyTypesUIContext";
export function CompanyTypeDeleteDialog({ id, show, onHide }) {
  // CompanyTypes UI Context
  const companyTypesUIContext = useCompanyTypesUIContext();
  const companyTypesUIProps = useMemo(() => {
    return {
      setIds: companyTypesUIContext.setIds,
      queryParams: companyTypesUIContext.queryParams,
    };
  }, [companyTypesUIContext]);
  // CompanyTypes Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.companyTypes.actionsLoading }),
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
  const deleteCompanyType = () => {
    // server request for deleting companyType by id
    dispatch(actions.deleteCompanyType(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCompanyTypes(companyTypesUIProps.queryParams));
      // clear selections list
      companyTypesUIProps.setIds([]);
      // closing delete modal
      onHide();
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
        <Modal.Title id="example-modal-sizes-title-lg">DeleteTitle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>Delete Question?</span>}
        {isLoading && <span>Delete Loading</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            DeleteCancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteCompanyType}
            className="btn btn-delete btn-danger"
          >
            DeleteTitle
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
