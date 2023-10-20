import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { PromissoryNoteEditDialogHeader } from "./PromissoryNoteEditDialogHeader";
import { PromissoryNoteEditForm } from "./PromissoryNoteEditForm";
import { usePromissoryNotesUIContext } from "../PromissoryNotesUIContext";

export function PromissoryNoteEditDialog() {
  // PromissoryNotes UI Context
  const promissoryNotesUIContext = usePromissoryNotesUIContext();
  const promissoryNotesUIProps = useMemo(() => {
    return {
      id: promissoryNotesUIContext.selectedId,
      selectedItem: promissoryNotesUIContext.selectedItem,
      show: promissoryNotesUIContext.showEditPromissoryNoteDialog,
      onHide: promissoryNotesUIContext.closeEditPromissoryNoteDialog,
      documentId: promissoryNotesUIContext.documentId,
      queryParams: promissoryNotesUIContext.queryParams,
      initPromissoryNote: promissoryNotesUIContext.initPromissoryNote,
      findPromissoryNote: promissoryNotesUIContext.findPromissoryNote,
      addPromissoryNote: promissoryNotesUIContext.addPromissoryNote,
      updatePromissoryNote: promissoryNotesUIContext.updatePromissoryNote,
    };
  }, [promissoryNotesUIContext]);

  // PromissoryNotes Redux state
  const dispatch = useDispatch();
  const { actionsLoading, promissoryNoteForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.companies.actionsLoading,
      promissoryNoteForEdit: state.companies.promissoryNoteForEdit,
    }),
    shallowEqual
  );

  const [editPromissoryNote, setEditPromissoryNote] = useState(null);
  useEffect(() => {
    // server request for getting promissoryNote by seleted id
    setEditPromissoryNote(promissoryNotesUIProps.findPromissoryNote(promissoryNotesUIProps.id));
  }, [promissoryNotesUIProps.id, dispatch]);

  const savePromissoryNote = (promissoryNote) => {
    if (!promissoryNotesUIProps.id) {
      promissoryNotesUIProps.addPromissoryNote(promissoryNote);
      promissoryNotesUIProps.onHide();
    } else {
      promissoryNotesUIProps.updatePromissoryNote(promissoryNote);
      promissoryNotesUIProps.onHide();
    }
  };

  return (
    <Modal
      show={promissoryNotesUIProps.show}
      onHide={promissoryNotesUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <PromissoryNoteEditDialogHeader id={promissoryNotesUIProps.id} />
      <PromissoryNoteEditForm
        savePromissoryNote={savePromissoryNote}
        actionsLoading={actionsLoading}
        promissoryNote={promissoryNotesUIProps.selectedItem}
        onHide={promissoryNotesUIProps.onHide}
      />
    </Modal>
  );
}
