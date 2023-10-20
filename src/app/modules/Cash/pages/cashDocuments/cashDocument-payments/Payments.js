import React from "react";
import { PaymentsFilter } from "./PaymentsFilter";
import { PaymentsTable } from "./PaymentsTable";
import { PaymentsLoadingDialog } from "./PaymentsLoadingDialog";
import { PaymentDeleteDialog } from "./PaymentDeleteDialog";
import { PaymentEditDialog } from "./payment-edit-dialog/PaymentEditDialog";

export function Payments() {
  return (
    <div className="mt-5">
      <PaymentsLoadingDialog />
      <PaymentEditDialog />
      <PaymentDeleteDialog />
      <div className="form margin-b-30">
        <PaymentsFilter />
      </div>
      <PaymentsTable />
    </div>
  );
}
