import React from "react";
import { Route } from "react-router-dom";
import { CompaniesLoadingDialog } from "./companies-loading-dialog/CompaniesLoadingDialog";
import { CompanyDeleteDialog } from "./company-delete-dialog/CompanyDeleteDialog";
import { CompaniesCard } from "./CompaniesCard";
import { CompaniesUIProvider } from "./CompaniesUIContext";

export function CompaniesPage({ history }) {
  const companiesUIEvents = {
    newCompanyButtonClick: () => {
      history.push("/Core/companies/new");
    },
    openEditCompanyPage: (id) => {
      history.push(`/Core/companies/${id}/edit`);
    },
    openDeleteCompanyDialog: (id) => {
      history.push(`/Core/companies/${id}/delete`);
    },
    openDeleteCompaniesDialog: () => {
      history.push(`/Core/companies/deleteCompanies`);
    },
    openFetchCompaniesDialog: () => {
      history.push(`/Core/companies/fetch`);
    },
    openUpdateCompaniesStatusDialog: () => {
      history.push("/Core/companies/updateStatus");
    },
  };

  return (
    <CompaniesUIProvider companiesUIEvents={companiesUIEvents}>
      <CompaniesLoadingDialog />
      <Route path="/Core/companies/:id/delete">
        {({ history, match }) => (
          <CompanyDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/Core/companies");
            }}
          />
        )}
      </Route>
      <CompaniesCard />
    </CompaniesUIProvider>
  );
}
