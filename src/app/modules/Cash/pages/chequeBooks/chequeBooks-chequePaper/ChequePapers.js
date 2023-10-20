import React from "react";
import { ChequePapersFilter } from "./ChequePapersFilter";
import { ChequePapersTable } from "./ChequePapersTable";
import { ChequePapersLoadingDialog } from "./ChequePapersLoadingDialog";
import { ChequePaperDeleteDialog } from "./ChequePapersDeleteDialog";
import { ChequePaperEditDialog } from "./chequePaper-edit-dialog/ChequePaperEditDialog";

export function ChequePapers() {
  return (
    <div className="mt-5">
      <ChequePapersLoadingDialog />
      <ChequePaperEditDialog />
      <ChequePaperDeleteDialog />
      <div className="form margin-b-30">
        <ChequePapersFilter />
      </div>
      <ChequePapersTable />
    </div>
  );
}
