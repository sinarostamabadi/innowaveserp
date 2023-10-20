import React from "react";
import { CompanyPersonsFilter } from "./CompanyPersonsFilter";
import { CompanyPersonsTable } from "./CompanyPersonsTable";
import { CompanyPersonsLoadingDialog } from "./CompanyPersonsLoadingDialog";
import { CompanyPersonsDeleteDialog } from "./CompanyPersonsDeleteDialog";
import { CompanyPersonDeleteDialog } from "./CompanyPersonDeleteDialog";
import { CompanyPersonEditDialog } from "./companyPerson-edit-dialog/CompanyPersonEditDialog";

export function CompanyPersons() {
  return (
    <div className="mt-5">
      <CompanyPersonsLoadingDialog />
      <CompanyPersonEditDialog />
      <CompanyPersonDeleteDialog />
      <CompanyPersonsDeleteDialog />
      <div className="form margin-b-30">
        <CompanyPersonsFilter />
      </div>
      <CompanyPersonsTable />
    </div>
  );
}
