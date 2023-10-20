/* eslint-disable no-restricted-imports */  
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/people/peopleActions";
import { usepeopleUIContext } from "../peopleUIContext";
export function PersonDeleteDialog({ id, show, onHide }) {
  // people UI Context  
  const peopleUIContext = usepeopleUIContext();
  const peopleUIProps = useMemo(() => {
    return {
      setIds: peopleUIContext.setIds,
      queryParams: peopleUIContext.queryParams,
    };
  }, [peopleUIContext]);
  // people Redux state  
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.people.actionsLoading }),
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
  const deletePerson = () => {
    // server request for deleting person by id  
    dispatch(actions.deletePerson(id)).then(() => {
      // refresh list after deletion  
      dispatch(actions.fetchpeople(peopleUIProps.queryParams));
      // clear selections list  
      peopleUIProps.setIds([]);
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
        <Modal.Title id="example-modal-sizes-title-lg">
          DeleteTitle  
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Delete Question?</span>
        )}
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
            onClick={deletePerson}
            className="btn btn-delete btn-danger"  
          >
            DeleteTitle  
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
