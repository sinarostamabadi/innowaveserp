import React from "react";
import { RelationPersonGroupsFilter } from "./RelationPersonGroupsFilter";
import { RelationPersonGroupsTable } from "./RelationPersonGroupsTable";
import { RelationPersonGroupsLoadingDialog } from "./RelationPersonGroupsLoadingDialog";
import { RelationPersonGroupsDeleteDialog } from "./RelationPersonGroupsDeleteDialog";
import { RelationPersonGroupDeleteDialog } from "./RelationPersonGroupDeleteDialog";
import { RelationPersonGroupEditDialog } from "./relationPersonGroup-edit-dialog/RelationPersonGroupEditDialog";

export function RelationPersonGroups() {
  return (
    <div className="mt-5">
      <RelationPersonGroupsLoadingDialog />
      <RelationPersonGroupEditDialog />
      <RelationPersonGroupDeleteDialog />
      <RelationPersonGroupsDeleteDialog />
      <div className="form margin-b-30">
        <RelationPersonGroupsFilter />
      </div>
      <RelationPersonGroupsTable />
    </div>
  );
}
