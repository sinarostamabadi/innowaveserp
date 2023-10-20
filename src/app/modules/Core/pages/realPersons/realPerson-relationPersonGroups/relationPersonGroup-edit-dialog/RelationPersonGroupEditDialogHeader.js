/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function RelationPersonGroupEditDialogHeader({ id }) {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  // Specs Redux state
  const { relationPersonGroupForEdit, actionsLoading } = useSelector(
    (state) => ({
      relationPersonGroupForEdit: state.realPersons.realPersonForEdit,
      actionsLoading: state.realPersons.actionsLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("PersonGroup.Entity");
    if (relationPersonGroupForEdit && id) {
      _title = t("Common.Edit") + " " + t("PersonGroup.Entity") ;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [relationPersonGroupForEdit, actionsLoading]);
  return (
    <>
      {actionsLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
