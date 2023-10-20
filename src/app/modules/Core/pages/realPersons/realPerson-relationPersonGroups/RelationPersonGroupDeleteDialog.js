/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useRelationPersonGroupsUIContext } from "./RelationPersonGroupsUIContext";
import { useTranslation } from "react-i18next";

export function RelationPersonGroupDeleteDialog() {
  const { t } = useTranslation();

  // RelationPersonGroups UI Context
  const relationPersonGroupsUIContext = useRelationPersonGroupsUIContext();
  const relationPersonGroupsUIProps = useMemo(() => {
    return {
      id: relationPersonGroupsUIContext.selectedId,
      personId: relationPersonGroupsUIContext.personId,
      show: relationPersonGroupsUIContext.showDeleteRelationPersonGroupDialog,
      onHide: relationPersonGroupsUIContext.closeDeleteRelationPersonGroupDialog,
      queryParams: relationPersonGroupsUIContext.queryParams,
      setIds: relationPersonGroupsUIContext.setIds,
      findRelationPersonGroup: relationPersonGroupsUIContext.findRelationPersonGroup,
      removeRelationPersonGroup: relationPersonGroupsUIContext.removeRelationPersonGroup,
    };
  }, [relationPersonGroupsUIContext]);

  // RelationPersonGroups Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.realPersons.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!relationPersonGroupsUIProps.id) {
      relationPersonGroupsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relationPersonGroupsUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deleteRelationPersonGroup = () => {
    relationPersonGroupsUIProps.removeRelationPersonGroup(relationPersonGroupsUIProps.id)
    relationPersonGroupsUIProps.onHide();
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
          {t("Common.Delete")} {t("PersonGroup.Entity")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>{t("Common.DeleteQuestion")}</span>
        )}
        {isLoading && <span>{t("Common.DeleteLoading")}</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={relationPersonGroupsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteRelationPersonGroup}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
