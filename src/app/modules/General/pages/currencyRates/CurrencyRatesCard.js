
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CurrencyRatesTable } from "./currencyRates-table/CurrencyRatesTable";
import { useCurrencyRatesUIContext, CurrencyRatesUIConsumer } from "./CurrencyRatesUIContext";
import { useTranslation } from 'react-i18next';

export function CurrencyRatesCard() {
  const { t } = useTranslation();

  const currencyRatesUIContext = useCurrencyRatesUIContext();

  const currencyRatesUIProps = useMemo(() => {
    return {
      ids: currencyRatesUIContext.ids,
      queryParams: currencyRatesUIContext.queryParams,
      setQueryParams: currencyRatesUIContext.setQueryParams,
      newCurrencyRateButtonClick: currencyRatesUIContext.newCurrencyRateButtonClick,
      openDeleteCurrencyRatesDialog: currencyRatesUIContext.openDeleteCurrencyRatesDialog,
      openEditCurrencyRatePage: currencyRatesUIContext.openEditCurrencyRatePage,
      openUpdateCurrencyRatesStatusDialog: currencyRatesUIContext.openUpdateCurrencyRatesStatusDialog,
      openFetchCurrencyRatesDialog: currencyRatesUIContext.openFetchCurrencyRatesDialog,
    };
  }, [currencyRatesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("CurrencyRate.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={currencyRatesUIProps.newCurrencyRateButtonClick}
          >
            {t("CurrencyRate.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CurrencyRatesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CurrencyRatesUIConsumer>
        <CurrencyRatesTable />
      </CardBody>
    </Card>
  );
}
