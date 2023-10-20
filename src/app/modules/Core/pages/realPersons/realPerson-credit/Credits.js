import React from "react";
import { CreditsFilter } from "./CreditsFilter";
import { CreditsTable } from "./CreditsTable";
import { CreditsLoadingDialog } from "./CreditsLoadingDialog";
import { CreditsDeleteDialog } from "./CreditsDeleteDialog";
import { CreditDeleteDialog } from "./CreditDeleteDialog";
import { CreditEditDialog } from "./credits-edit-dialog/CreditEditDialog";

export function Credits() {
  return (
    <div className="mt-5">
      <CreditsLoadingDialog />
      <CreditEditDialog />
      <CreditDeleteDialog />
      <CreditsDeleteDialog />
      <div className="form margin-b-30">
        <CreditsFilter />
      </div>
      <CreditsTable />
    </div>
  );
}