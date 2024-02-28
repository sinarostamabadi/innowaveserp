/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function PersonSpecialDayEditDialogHeader({ id }) {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  // Specs Redux state
  const { personSpecialDayForEdit, actionsLoading } = useSelector(
    (state) => ({
      personSpecialDayForEdit: state.personSpecialDays.personSpecialDayForEdit,
      actionsLoading: state.personSpecialDays.actionsLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " " + t("PersonSpecialDay.Entity");
    if (personSpecialDayForEdit && id) {
      _title = t("Common.Edit") + " " + t("PersonSpecialDay.Entity");
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [personSpecialDayForEdit, actionsLoading]);
  return (
    <>
      {actionsLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
