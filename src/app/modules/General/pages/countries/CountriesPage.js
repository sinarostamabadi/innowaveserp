import React from "react";
import { Route } from "react-router-dom";
import { CountriesLoadingDialog } from "./countries-loading-dialog/CountriesLoadingDialog";
import { CountryDeleteDialog } from "./country-delete-dialog/CountryDeleteDialog";
import { CountriesCard } from "./CountriesCard";
import { CountriesUIProvider } from "./CountriesUIContext";

export function CountriesPage({ history }) {
  const countriesUIEvents = {
    newCountryButtonClick: () => {
      history.push("/general/countries/new");
    },
    openEditCountryPage: (id) => {
      history.push(`/general/countries/${id}/edit`);
    },
    openDeleteCountryDialog: (id) => {
      history.push(`/general/countries/${id}/delete`);
    },
    openDeleteCountriesDialog: () => {
      history.push(`/general/countries/deleteCountries`);
    },
    openFetchCountriesDialog: () => {
      history.push(`/general/countries/fetch`);
    },
    openUpdateCountriesStatusDialog: () => {
      history.push("/general/countries/updateStatus");
    },
  };

  return (
    <CountriesUIProvider countriesUIEvents={countriesUIEvents}>
      <CountriesLoadingDialog />
      <Route path="/general/countries/:id/delete">
        {({ history, match }) => (
          <CountryDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/countries");
            }}
          />
        )}
      </Route>
      <CountriesCard />
    </CountriesUIProvider>
  );
}
