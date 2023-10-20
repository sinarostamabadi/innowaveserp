import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function ExpertiseEditDialogHeader({ id, isLoading }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [ actionsLoading, setActionsLoading ] = useState(isLoading);

  useEffect(() => {
    setActionsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    id 
      ? setTitle(t("Common.Edit") + " " + t("BodyBuildingEmployeeTypeExpertise.Entity"))
      : setTitle(t("Common.Create") + " " + t("BodyBuildingEmployeeTypeExpertise.Entity"));    
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