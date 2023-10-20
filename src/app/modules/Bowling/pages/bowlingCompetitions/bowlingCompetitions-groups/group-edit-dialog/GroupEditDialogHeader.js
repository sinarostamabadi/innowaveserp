/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function GroupEditDialogHeader({ id }) {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  // Specs Redux state
  const { actionsLoading, setActionsLoading } = useState();

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("BowlingCompetitionGroup.Entity");
    if (id) {
      _title = t("Common.Edit") + " " + t("BowlingCompetitionGroup.Entity") ;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [actionsLoading]);
  return (
    <>
      {actionsLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
