import React from "react";
import { PhonesFilter } from "./PhonesFilter";
import { PhonesTable } from "./PhonesTable";
import { PhonesLoadingDialog } from "./PhonesLoadingDialog";
import { PhonesDeleteDialog } from "./PhonesDeleteDialog";
import { PhoneDeleteDialog } from "./PhoneDeleteDialog";
import { PhoneEditDialog } from "./phone-edit-dialog/PhoneEditDialog";

export function Phones() {
  return (
    <div className="mt-5">
      <PhonesLoadingDialog />
      <PhoneEditDialog />
      <PhoneDeleteDialog />
      <PhonesDeleteDialog />
      <div className="form margin-b-30">
        <PhonesFilter />
      </div>
      <PhonesTable />
    </div>
  );
}
