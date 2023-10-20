/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function CompanyPersonEditDialogHeader({ id }) {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  // Specs Redux state
  const { companyPersonForEdit, actionsLoading } = useSelector(
    (state) => ({
      companyPersonForEdit: state.companies.companyForEdit,
      actionsLoading: state.companies.actionsLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("CompanyPerson.Entity");
    if (companyPersonForEdit && id) {
      _title = t("Common.Edit") + " " + t("CompanyPerson.Entity") ;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [companyPersonForEdit, actionsLoading]);
  return (
    <>
      {actionsLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
