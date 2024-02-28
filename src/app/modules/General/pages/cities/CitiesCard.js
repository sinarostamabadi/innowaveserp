import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CitiesTable } from "./cities-table/CitiesTable";
import { useCitiesUIContext, CitiesUIConsumer } from "./CitiesUIContext";
import { useTranslation } from "react-i18next";

export function CitiesCard() {
  const { t } = useTranslation();

  const citiesUIContext = useCitiesUIContext();

  const citiesUIProps = useMemo(() => {
    return {
      ids: citiesUIContext.ids,
      queryParams: citiesUIContext.queryParams,
      setQueryParams: citiesUIContext.setQueryParams,
      newCityButtonClick: citiesUIContext.newCityButtonClick,
      openDeleteCitiesDialog: citiesUIContext.openDeleteCitiesDialog,
      openEditCityPage: citiesUIContext.openEditCityPage,
      openUpdateCitiesStatusDialog:
        citiesUIContext.openUpdateCitiesStatusDialog,
      openFetchCitiesDialog: citiesUIContext.openFetchCitiesDialog,
    };
  }, [citiesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("City.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={citiesUIProps.newCityButtonClick}
          >
            {t("City.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CitiesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CitiesUIConsumer>
        <CitiesTable />
      </CardBody>
    </Card>
  );
}
