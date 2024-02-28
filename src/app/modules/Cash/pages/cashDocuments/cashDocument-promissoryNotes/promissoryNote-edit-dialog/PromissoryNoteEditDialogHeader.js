/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "src/core/_partials/controls";
import { useTranslation } from "react-i18next";

export function PromissoryNoteEditDialogHeader({ id }) {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  // Specs Redux state
  const { promissoryNoteForEdit, actionsLoading } = useSelector(
    (state) => ({
      promissoryNoteForEdit: state.companies.promissoryNoteForEdit,
      actionsLoading: state.companies.actionsLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("CashDocument.PromissoryNote");
    if (id) {
      _title = t("Common.Edit") + " " + t("CashDocument.PromissoryNote");
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [promissoryNoteForEdit, actionsLoading]);
  return (
    <>
      {actionsLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
