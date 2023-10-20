import React from "react";
import { Route } from "react-router-dom";
import { CitiesLoadingDialog } from "./cities-loading-dialog/CitiesLoadingDialog";
import { CityDeleteDialog } from "./city-delete-dialog/CityDeleteDialog";
import { CitiesCard } from "./CitiesCard";
import { CitiesUIProvider } from "./CitiesUIContext";

export function CitiesPage({ history }) {
  const citiesUIEvents = {
    newCityButtonClick: () => {
      history.push("/general/cities/new");
    },
    openEditCityPage: (id) => {
      history.push(`/general/cities/${id}/edit`);
    },
    openDeleteCityDialog: (id) => {
      history.push(`/general/cities/${id}/delete`);
    },
    openDeleteCitiesDialog: () => {
      history.push(`/general/cities/deleteCities`);
    },
    openFetchCitiesDialog: () => {
      history.push(`/general/cities/fetch`);
    },
    openUpdateCitiesStatusDialog: () => {
      history.push("/general/cities/updateStatus");
    },
  };
  
  return (
    <CitiesUIProvider citiesUIEvents={citiesUIEvents}>
      <CitiesLoadingDialog />
      <Route path="/general/cities/:id/delete">
        {({ history, match }) => (
          <CityDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/cities");
            }}
          />
        )}
      </Route>
      <CitiesCard />
    </CitiesUIProvider>
  );
}
