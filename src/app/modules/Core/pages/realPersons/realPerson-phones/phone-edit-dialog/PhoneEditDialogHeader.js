/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function PhoneEditDialogHeader({ id }) {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  // Specs Redux state
  const { phoneForEdit, actionsLoading } = useSelector(
    (state) => ({
      phoneForEdit: state.phones.phoneForEdit,
      actionsLoading: state.phones.actionsLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("Phone.Entity");
    if (phoneForEdit && id) {
      _title = t("Common.Edit") + " " + t("Phone.Entity") ;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [phoneForEdit, actionsLoading]);
  return (
    <>
      {actionsLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
