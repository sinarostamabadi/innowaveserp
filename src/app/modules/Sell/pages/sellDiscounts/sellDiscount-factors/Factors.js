import React from "react";
import { FactorsTable } from "./FactorsTable";
import { FactorDeleteDialog } from "./FactorDeleteDialog";
import { FactorEditDialog } from "./factor-edit-dialog/FactorEditDialog";

export function Factors() {
  return (
    <div className="mt-5">
      <FactorEditDialog />
      <FactorDeleteDialog />
      <FactorsTable />
    </div>
  );
}
