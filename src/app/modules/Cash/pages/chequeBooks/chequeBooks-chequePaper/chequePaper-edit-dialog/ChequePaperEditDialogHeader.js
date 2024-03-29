/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "src/core/_partials/controls";
import { useTranslation } from "react-i18next";

export function ChequePaperEditDialogHeader({ id }) {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  // Specs Redux state
  const { chequePaperForEdit, actionsLoading } = useSelector(
    (state) => ({
      chequePaperForEdit: state.chequePapers.chequePaperForEdit,
      actionsLoading: state.chequePapers.actionsLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    let _title = t("Common.Edit") + " " + t("ChequePaper.ChequePaperStatus");

    setTitle(_title);
    // eslint-disable-next-line
  }, [chequePaperForEdit, actionsLoading]);
  return (
    <>
      {actionsLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
