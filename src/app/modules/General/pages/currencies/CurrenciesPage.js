import React from "react";
import { Route } from "react-router-dom";
import { CurrenciesLoadingDialog } from "./currencies-loading-dialog/CurrenciesLoadingDialog";
import { CurrencyDeleteDialog } from "./currency-delete-dialog/CurrencyDeleteDialog";
import { CurrenciesCard } from "./CurrenciesCard";
import { CurrenciesUIProvider } from "./CurrenciesUIContext";

export function CurrenciesPage({ history }) {
  const currenciesUIEvents = {
    newCurrencyButtonClick: () => {
      history.push("/general/currencies/new");
    },
    openEditCurrencyPage: (id) => {
      history.push(`/general/currencies/${id}/edit`);
    },
    openDeleteCurrencyDialog: (id) => {
      history.push(`/general/currencies/${id}/delete`);
    },
    openDeleteCurrenciesDialog: () => {
      history.push(`/general/currencies/deleteCurrencies`);
    },
    openFetchCurrenciesDialog: () => {
      history.push(`/general/currencies/fetch`);
    },
    openUpdateCurrenciesStatusDialog: () => {
      history.push("/general/currencies/updateStatus");
    },
  };

  return (
    <CurrenciesUIProvider currenciesUIEvents={currenciesUIEvents}>
      <CurrenciesLoadingDialog />
      <Route path="/general/currencies/:id/delete">
        {({ history, match }) => (
          <CurrencyDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/currencies");
            }}
          />
        )}
      </Route>
      <CurrenciesCard />
    </CurrenciesUIProvider>
  );
}
