import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CreditEditDialogHeader } from "./CreditEditDialogHeader";
import { CreditEditForm } from "./CreditEditForm";
import { useCreditsUIContext } from "../CreditsUIContext";

export function CreditEditDialog() {
  // Credits UI Context
  const creditsUIContext = useCreditsUIContext();
  const creditsUIProps = useMemo(() => {
    return {
      id: creditsUIContext.selectedId,
      selectedItem: creditsUIContext.selectedItem,
      show: creditsUIContext.showEditCreditDialog,
      onHide: creditsUIContext.closeEditCreditDialog,
      documentId: creditsUIContext.documentId,
      queryParams: creditsUIContext.queryParams,
      initCredit: creditsUIContext.initCredit,
      findCredit: creditsUIContext.findCredit,
      addCredit: creditsUIContext.addCredit,
      updateCredit: creditsUIContext.updateCredit,
    };
  }, [creditsUIContext]);

  // Credits Redux state
  const dispatch = useDispatch();
  const { actionsLoading, creditForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.companies.actionsLoading,
      creditForEdit: state.companies.creditForEdit,
    }),
    shallowEqual
  );

  const [editCredit, setEditCredit] = useState(null);
  useEffect(() => {
    // server request for getting credit by seleted id
    setEditCredit(creditsUIProps.findCredit(creditsUIProps.id));
  }, [creditsUIProps.id, dispatch]);

  const saveCredit = (credit) => {
    if (!creditsUIProps.id) {
      creditsUIProps.addCredit(credit);
      creditsUIProps.onHide();
    } else {
      creditsUIProps.updateCredit(credit);
      creditsUIProps.onHide();
    }
  };

  return (
    <Modal
      show={creditsUIProps.show}
      onHide={creditsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CreditEditDialogHeader id={creditsUIProps.id} />
      <CreditEditForm
        saveCredit={saveCredit}
        actionsLoading={actionsLoading}
        credit={creditsUIProps.selectedItem}
        onHide={creditsUIProps.onHide}
      />
    </Modal>
  );
}
