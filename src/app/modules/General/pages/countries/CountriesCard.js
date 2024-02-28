import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CountriesTable } from "./countries-table/CountriesTable";
import {
  useCountriesUIContext,
  CountriesUIConsumer,
} from "./CountriesUIContext";
import { useTranslation } from "react-i18next";

export function CountriesCard() {
  const { t } = useTranslation();

  const countriesUIContext = useCountriesUIContext();

  const countriesUIProps = useMemo(() => {
    return {
      ids: countriesUIContext.ids,
      queryParams: countriesUIContext.queryParams,
      setQueryParams: countriesUIContext.setQueryParams,
      newCountryButtonClick: countriesUIContext.newCountryButtonClick,
      openDeleteCountriesDialog: countriesUIContext.openDeleteCountriesDialog,
      openEditCountryPage: countriesUIContext.openEditCountryPage,
      openUpdateCountriesStatusDialog:
        countriesUIContext.openUpdateCountriesStatusDialog,
      openFetchCountriesDialog: countriesUIContext.openFetchCountriesDialog,
    };
  }, [countriesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Country.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={countriesUIProps.newCountryButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CountriesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CountriesUIConsumer>
        <CountriesTable />
      </CardBody>
    </Card>
  );
}
