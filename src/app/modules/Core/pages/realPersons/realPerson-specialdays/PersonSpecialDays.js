import React from "react";
import { PersonSpecialDaysFilter } from "./PersonSpecialDaysFilter";
import { PersonSpecialDaysTable } from "./PersonSpecialDaysTable";
import { PersonSpecialDaysLoadingDialog } from "./PersonSpecialDaysLoadingDialog";
import { PersonSpecialDaysDeleteDialog } from "./PersonSpecialDaysDeleteDialog";
import { PersonSpecialDayDeleteDialog } from "./PersonSpecialDayDeleteDialog";
import { PersonSpecialDayEditDialog } from "./person-special-days-edit-dialog/PersonSpecialDayEditDialog";

export function PersonSpecialDays() {
  return (
    <div className="mt-5">
      <PersonSpecialDaysLoadingDialog />
      <PersonSpecialDayEditDialog />
      <PersonSpecialDayDeleteDialog />
      <PersonSpecialDaysDeleteDialog />
      <div className="form margin-b-30">
        <PersonSpecialDaysFilter />
      </div>
      <PersonSpecialDaysTable />
    </div>
  );
}