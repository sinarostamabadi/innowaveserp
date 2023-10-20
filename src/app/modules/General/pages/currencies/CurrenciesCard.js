import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CurrenciesTable } from "./currencies-table/CurrenciesTable";
import { useCurrenciesUIContext, CurrenciesUIConsumer } from "./CurrenciesUIContext";
import { useTranslation } from 'react-i18next';

export function CurrenciesCard() {
  const { t } = useTranslation();

  const currenciesUIContext = useCurrenciesUIContext();

  const currenciesUIProps = useMemo(() => {
    return {
      ids: currenciesUIContext.ids,
      queryParams: currenciesUIContext.queryParams,
      setQueryParams: currenciesUIContext.setQueryParams,
      newCurrencyButtonClick: currenciesUIContext.newCurrencyButtonClick,
      openDeleteCurrenciesDialog: currenciesUIContext.openDeleteCurrenciesDialog,
      openEditCurrencyPage: currenciesUIContext.openEditCurrencyPage,
      openUpdateCurrenciesStatusDialog: currenciesUIContext.openUpdateCurrenciesStatusDialog,
      openFetchCurrenciesDialog: currenciesUIContext.openFetchCurrenciesDialog,
    };
  }, [currenciesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("Currency.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={currenciesUIProps.newCurrencyButtonClick}
          >
            {t("Currency.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CurrenciesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CurrenciesUIConsumer>
        <CurrenciesTable />
      </CardBody>
    </Card>
  );
}