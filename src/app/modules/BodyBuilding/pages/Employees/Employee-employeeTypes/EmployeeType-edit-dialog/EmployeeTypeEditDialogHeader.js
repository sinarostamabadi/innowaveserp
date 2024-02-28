import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function EmployeeTypeEditDialogHeader({ id, isLoading }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [actionsLoading, setActionsLoading] = useState(isLoading);

  useEffect(() => {
    setActionsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    id
      ? setTitle(
          t("Common.Edit") + " " + t("BodyBuildingEmployeeExpertise.Entity")
        )
      : setTitle(
          t("Common.Create") + " " + t("BodyBuildingEmployeeExpertise.Entity")
        );
  }, [id, t]);

  return (
    <>
      {actionsLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
