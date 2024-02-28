import React from "react";
import { Route } from "react-router-dom";
import { CurrencyRatesLoadingDialog } from "./currencyRates-loading-dialog/CurrencyRatesLoadingDialog";
import { CurrencyRateDeleteDialog } from "./currencyRate-delete-dialog/CurrencyRateDeleteDialog";
import { CurrencyRatesCard } from "./CurrencyRatesCard";
import { CurrencyRatesUIProvider } from "./CurrencyRatesUIContext";

export function CurrencyRatesPage({ history }) {
  const currencyRatesUIEvents = {
    newCurrencyRateButtonClick: () => {
      history.push("/general/currencyRates/new");
    },
    openEditCurrencyRatePage: (id) => {
      history.push(`/general/currencyRates/${id}/edit`);
    },
    openDeleteCurrencyRateDialog: (id) => {
      history.push(`/general/currencyRates/${id}/delete`);
    },
    openDeleteCurrencyRatesDialog: () => {
      history.push(`/general/currencyRates/deleteCurrencyRates`);
    },
    openFetchCurrencyRatesDialog: () => {
      history.push(`/general/currencyRates/fetch`);
    },
    openUpdateCurrencyRatesStatusDialog: () => {
      history.push("/general/currencyRates/updateStatus");
    },
  };

  return (
    <CurrencyRatesUIProvider currencyRatesUIEvents={currencyRatesUIEvents}>
      <CurrencyRatesLoadingDialog />
      <Route path="/general/currencyRates/:id/delete">
        {({ history, match }) => (
          <CurrencyRateDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/currencyRates");
            }}
          />
        )}
      </Route>
      <CurrencyRatesCard />
    </CurrencyRatesUIProvider>
  );
}
