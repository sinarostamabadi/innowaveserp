import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ExpertiseEditDialogHeader } from "./ExpertiseEditDialogHeader";
import { ExpertiseEditForm } from "./ExpertiseEditForm";
import { useExpertisesUIContext } from "../ExpertisesUIContext";

export function ExpertiseEditDialog() {
  // Expertises UI Context
  const expertisesUIContext = useExpertisesUIContext();
  const expertisesUIProps = useMemo(() => {
    return {
      id: expertisesUIContext.selectedId,
      selectedItem: expertisesUIContext.selectedItem,
      show: expertisesUIContext.showEditExpertiseDialog,
      onHide: expertisesUIContext.closeEditExpertiseDialog,
      personId: expertisesUIContext.personId,
      queryParams: expertisesUIContext.queryParams,
      initExpertise: expertisesUIContext.initExpertise,
      findExpertise: expertisesUIContext.findExpertise,
      addExpertise: expertisesUIContext.addExpertise,
      updateExpertise: expertisesUIContext.updateExpertise,
    };
  }, [expertisesUIContext]);

  // Expertises Redux state
  const dispatch = useDispatch();
  const { actionsLoading, setActionsLoading } = useState(false);

  const [editExpertise, setEditExpertise] = useState(
    expertisesUIProps.initExpertise
  );

  useEffect(() => {
    if (!!expertisesUIProps.id)
      setEditExpertise(expertisesUIProps.findExpertise(expertisesUIProps.id));
  }, [expertisesUIProps.id, dispatch]);

  const saveExpertise = (expertise) => {
    if (!expertisesUIProps.id) {
      expertisesUIProps.addExpertise(expertise);
      expertisesUIProps.onHide();
    } else {
      expertisesUIProps.updateExpertise(expertise);
      expertisesUIProps.onHide();
    }
  };

  return (
    <Modal
      show={expertisesUIProps.show}
      onHide={expertisesUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ExpertiseEditDialogHeader
        id={expertisesUIProps.id}
        isLoading={actionsLoading}
      />
      <ExpertiseEditForm
        saveExpertise={saveExpertise}
        actionsLoading={actionsLoading}
        expertise={
          expertisesUIProps.selectedItem || expertisesUIProps.initExpertise
        }
        onHide={expertisesUIProps.onHide}
      />
    </Modal>
  );
}
