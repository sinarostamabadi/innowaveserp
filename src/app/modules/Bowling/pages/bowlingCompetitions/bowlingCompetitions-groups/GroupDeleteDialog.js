/* eslint-disable no-restricted-imports */
import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useGroupsUIContext } from "./GroupsUIContext";
import { useTranslation } from "react-i18next";

export function GroupDeleteDialog() {
  const { t } = useTranslation();

  // Groups UI Context
  const groupsUIContext = useGroupsUIContext();
  const groupsUIProps = useMemo(() => {
    return {
      id: groupsUIContext.selectedId,
      personId: groupsUIContext.personId,
      show: groupsUIContext.showDeleteGroupDialog,
      onHide: groupsUIContext.closeDeleteGroupDialog,
      queryParams: groupsUIContext.queryParams,
      setIds: groupsUIContext.setIds,
      findGroup: groupsUIContext.findGroup,
      removeGroup: groupsUIContext.removeGroup,
    };
  }, [groupsUIContext]);

  // Groups Redux state
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // if !id we should close modal
  useEffect(() => {
    if (!groupsUIProps.id) {
      groupsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupsUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteGroup = () => {
    groupsUIProps.removeGroup(groupsUIProps.id);
    groupsUIProps.onHide();
  };

  return (
    <Modal
      show={groupsUIProps.show}
      onHide={groupsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("BowlingCompetitionGroup.Entity")}
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
            onClick={groupsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteGroup}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
