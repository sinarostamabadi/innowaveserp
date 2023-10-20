import React from "react";
import { Route } from "react-router-dom";
import { CompanyTypesLoadingDialog } from "./companyTypes-loading-dialog/CompanyTypesLoadingDialog";
import { CompanyTypeDeleteDialog } from "./companyType-delete-dialog/CompanyTypeDeleteDialog";
import { CompanyTypesCard } from "./CompanyTypesCard";
import { CompanyTypesUIProvider } from "./CompanyTypesUIContext";
export function CompanyTypesPage({ history }) {
  const companyTypesUIEvents = {
    newCompanyTypeButtonClick: () => {
      history.push("/Core/companyTypes/new");
    },
    openEditCompanyTypePage: (id) => {
      history.push(`/Core/companyTypes/${id}/edit`);
    },
    openDeleteCompanyTypeDialog: (id) => {
      history.push(`/Core/companyTypes/${id}/delete`);
    },
    openDeleteCompanyTypesDialog: () => {
      history.push(`/Core/companyTypes/deleteCompanyTypes`);
    },
    openFetchCompanyTypesDialog: () => {
      history.push(`/Core/companyTypes/fetch`);
    },
    openUpdateCompanyTypesStatusDialog: () => {
      history.push("/Core/companyTypes/updateStatus");
    },
  };
  return (
    <CompanyTypesUIProvider companyTypesUIEvents={companyTypesUIEvents}>
      <CompanyTypesLoadingDialog />
      <Route path="/Core/companyTypes/:id/delete">
        {({ history, match }) => (
          <CompanyTypeDeleteDialog  
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/Core/companyTypes");
            }}
          />
        )}
      </Route>
      <CompanyTypesCard />
    </CompanyTypesUIProvider>
  );
}
