import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CoffeeShopsTable } from "./coffeeShops-table/CoffeeShopsTable";
import {
  useCoffeeShopsUIContext,
  CoffeeShopsUIConsumer,
} from "./CoffeeShopsUIContext";
import { useTranslation } from "react-i18next";

export function CoffeeShopsCard() {
  const { t } = useTranslation();

  const coffeeShopsUIContext = useCoffeeShopsUIContext();

  const coffeeShopsUIProps = useMemo(() => {
    return {
      ids: coffeeShopsUIContext.ids,
      queryParams: coffeeShopsUIContext.queryParams,
      setQueryParams: coffeeShopsUIContext.setQueryParams,
      newCoffeeShopButtonClick: coffeeShopsUIContext.newCoffeeShopButtonClick,
      openDeleteCoffeeShopsDialog:
        coffeeShopsUIContext.openDeleteCoffeeShopsDialog,
      openEditCoffeeShopPage: coffeeShopsUIContext.openEditCoffeeShopPage,
      openUpdateCoffeeShopsStatusDialog:
        coffeeShopsUIContext.openUpdateCoffeeShopsStatusDialog,
      openFetchCoffeeShopsDialog:
        coffeeShopsUIContext.openFetchCoffeeShopsDialog,
    };
  }, [coffeeShopsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("CoffeeShop.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={coffeeShopsUIProps.newCoffeeShopButtonClick}
          >
            {t("CoffeeShop.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CoffeeShopsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CoffeeShopsUIConsumer>
        <CoffeeShopsTable />
      </CardBody>
    </Card>
  );
}
