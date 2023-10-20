import React from "react";
import { AddressesFilter } from "./AddressesFilter";
import { AddressesTable } from "./AddressesTable";
import { AddressesLoadingDialog } from "./AddressesLoadingDialog";
import { AddressesDeleteDialog } from "./AddressesDeleteDialog";
import { AddressDeleteDialog } from "./AddressDeleteDialog";
import { AddressEditDialog } from "./address-edit-dialog/AddressEditDialog";

export function Addresses() {
  return (
    <div className="mt-5">
      <AddressesLoadingDialog />
      <AddressEditDialog />
      <AddressDeleteDialog />
      <AddressesDeleteDialog />
      <div className="form margin-b-30">
        <AddressesFilter />
      </div>
      <AddressesTable />
    </div>
  );
}
