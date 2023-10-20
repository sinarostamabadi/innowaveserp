import React from "react";
import { PromissoryNotesFilter } from "./PromissoryNotesFilter";
import { PromissoryNotesTable } from "./PromissoryNotesTable";
import { PromissoryNotesLoadingDialog } from "./PromissoryNotesLoadingDialog";
import { PromissoryNoteDeleteDialog } from "./PromissoryNoteDeleteDialog";
import { PromissoryNoteEditDialog } from "./promissoryNote-edit-dialog/PromissoryNoteEditDialog";

export function PromissoryNotes() {
  return (
    <div className="mt-5">
      <PromissoryNotesLoadingDialog />
      <PromissoryNoteEditDialog />
      <PromissoryNoteDeleteDialog />
      <div className="form margin-b-30">
        <PromissoryNotesFilter />
      </div>
      <PromissoryNotesTable />
    </div>
  );
}
