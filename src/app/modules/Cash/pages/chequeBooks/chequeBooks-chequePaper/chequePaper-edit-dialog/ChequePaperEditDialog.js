import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ChequePaperEditDialogHeader } from "./ChequePaperEditDialogHeader";
import { ChequePaperEditForm } from "./ChequePaperEditForm";
import { useChequePapersUIContext } from "../ChequePapersUIContext";

export function ChequePaperEditDialog() {
  // ChequePapers UI Context
  const chequePapersUIContext = useChequePapersUIContext();
  const chequePapersUIProps = useMemo(() => {
    return {
      id: chequePapersUIContext.selectedId,
      selectedItem: chequePapersUIContext.selectedItem,
      show: chequePapersUIContext.showEditChequePaperDialog,
      onHide: chequePapersUIContext.closeEditChequePaperDialog,
      chequeBookId: chequePapersUIContext.chequeBookId,
      queryParams: chequePapersUIContext.queryParams,
      initChequePaper: chequePapersUIContext.initChequePaper,
      findChequePaper: chequePapersUIContext.findChequePaper,
      addChequePaper: chequePapersUIContext.addChequePaper,
      updateChequePaper: chequePapersUIContext.updateChequePaper,
    };
  }, [chequePapersUIContext]);

  // ChequePapers Redux state
  const dispatch = useDispatch();
  const { actionsLoading, chequePaperForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.chequePapers.actionsLoading,
      chequePaperForEdit: state.chequePapers.chequePaperForEdit,
    }),
    shallowEqual
  );

  const [editChequePaper, setEditChequePaper] = useState(null);
  useEffect(() => {
    // server request for getting chequePaper by seleted id
    setEditChequePaper(
      chequePapersUIProps.findChequePaper(chequePapersUIProps.id)
    );
  }, [chequePapersUIProps.id, dispatch]);

  const saveChequePaper = (chequePaper) => {
    if (!chequePapersUIProps.id) {
      chequePapersUIProps.addChequePaper(chequePaper);
      chequePapersUIProps.onHide();
    } else {
      chequePapersUIProps.updateChequePaper(chequePaper);
      chequePapersUIProps.onHide();
    }
  };

  return (
    <Modal
      show={chequePapersUIProps.show}
      onHide={chequePapersUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ChequePaperEditDialogHeader id={chequePapersUIProps.id} />
      <ChequePaperEditForm
        saveChequePaper={saveChequePaper}
        actionsLoading={actionsLoading}
        chequePaper={editChequePaper || chequePapersUIProps.initChequePaper}
        onHide={chequePapersUIProps.onHide}
      />
    </Modal>
  );
}
