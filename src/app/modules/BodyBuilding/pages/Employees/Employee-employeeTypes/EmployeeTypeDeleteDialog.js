import { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useEmployeeTypesUIContext } from "./EmployeeTypesUIContext";
import { useTranslation } from "react-i18next";

export function EmployeeTypeDeleteDialog() {
  const { t } = useTranslation();
  const uiContext = useEmployeeTypesUIContext();
  const uiProps = useMemo(() => {
    return {
      id: uiContext.selectedId,
      selectedItem: uiContext.selectedItem,
      personId: uiContext.personId,
      show: uiContext.showDeleteEmployeeTypeDialog,
      onHide: uiContext.closeDeleteEmployeeTypeDialog,
      queryParams: uiContext.queryParams,
      setIds: uiContext.setIds,
      findEmployeeType: uiContext.findEmployeeType,
      removeEmployeeType: uiContext.removeEmployeeType,
    };
  }, [uiContext]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!uiProps.id) uiProps.onHide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiProps.id]);

  const deleteEmployeeType = () => {
    uiProps.removeEmployeeType(uiProps.id);
    uiProps.onHide();
  };
  return (
    <Modal
      show={uiProps.show}
      onHide={uiProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("BodyBuildingEmployeeExpertise.Entity")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && !!uiProps.selectedItem && (
          <span>
            {t("Common.DeleteQuestionWithContent", {
              0: !!uiProps.selectedItem
                ? uiProps.selectedItem.BodyBuildingEmployeeTypeExpertise.Title
                : "",
            })}
          </span>
        )}
        {isLoading && <span>{t("Common.DeleteLoading")}</span>}
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          onClick={uiProps.onHide}
          className="btn btn-light btn-elevate"
        >
          {t("Common.Cancel")}
        </button>
        <> </>
        <button
          type="button"
          onClick={deleteEmployeeType}
          className="btn btn-danger btn-elevate"
        >
          {t("Common.Delete")}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
