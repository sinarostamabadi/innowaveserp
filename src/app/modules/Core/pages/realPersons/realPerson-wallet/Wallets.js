import React from "react";
import { WalletsFilter } from "./WalletsFilter";
import { WalletsTable } from "./WalletsTable";
import { WalletsLoadingDialog } from "./WalletsLoadingDialog";
import { WalletsDeleteDialog } from "./WalletsDeleteDialog";
import { WalletDeleteDialog } from "./WalletDeleteDialog";
import { WalletEditDialog } from "./wallets-edit-dialog/WalletEditDialog";

export function Wallets() {
  return (
    <div className="mt-5">
      <WalletsLoadingDialog />
      <WalletEditDialog />
      <WalletDeleteDialog />
      <WalletsDeleteDialog />
      <div className="form margin-b-30">
        <WalletsFilter />
      </div>
      <WalletsTable />
    </div>
  );
}
