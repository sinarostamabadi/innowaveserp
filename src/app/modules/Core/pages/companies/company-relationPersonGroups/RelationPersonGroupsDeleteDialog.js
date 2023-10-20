/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useRelationPersonGroupsUIContext } from "./RelationPersonGroupsUIContext";

export function RelationPersonGroupsDeleteDialog() {
  // RelationPersonGroups UI Context
  const relationPersonGroupsUIContext = useRelationPersonGroupsUIContext();
  const relationPersonGroupsUIProps = useMemo(() => {
    return {
      personId: relationPersonGroupsUIContext.personId,
      ids: relationPersonGroupsUIContext.ids,
      show: relationPersonGroupsUIContext.showDeleteRelationPersonGroupsDialog,
      onHide: relationPersonGroupsUIContext.closeDeleteRelationPersonGroupsDialog,
      setIds: relationPersonGroupsUIContext.setIds,
      queryParams: relationPersonGroupsUIContext.queryParams,
      findRelationPersonGroup: relationPersonGroupsUIContext.findRelationPersonGroup,
    };
  }, [relationPersonGroupsUIContext]);

  // RelationPersonGroups Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.companies.actionsLoading }),
    shallowEqual
  );

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  // if there weren't selected relationPersonGroups we should close modal
  useEffect(() => {
    if (!relationPersonGroupsUIProps.ids || relationPersonGroupsUIProps.ids.length === 0) {
      relationPersonGroupsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relationPersonGroupsUIProps.ids]);

  const deleteRelationPersonGroups = () => {
    // server request for selected deleting relationPersonGroups

  };

  return (
    <Modal
      show={relationPersonGroupsUIProps.show}
      onHide={relationPersonGroupsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          RelationPersonGroups Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            Are you sure to permanently delete selected relationPersonGroups?
          </span>
        )}
        {isLoading && <span>RelationPersonGroups are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={relationPersonGroupsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteRelationPersonGroups}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
