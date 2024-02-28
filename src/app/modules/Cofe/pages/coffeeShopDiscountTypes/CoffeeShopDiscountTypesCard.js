import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CoffeeShopDiscountTypesTable } from "./coffeeShopDiscountTypes-table/CoffeeShopDiscountTypesTable";
import {
  useCoffeeShopDiscountTypesUIContext,
  CoffeeShopDiscountTypesUIConsumer,
} from "./CoffeeShopDiscountTypesUIContext";
import { useTranslation } from "react-i18next";

export function CoffeeShopDiscountTypesCard() {
  const { t } = useTranslation();

  const coffeeShopDiscountTypesUIContext =
    useCoffeeShopDiscountTypesUIContext();

  const coffeeShopDiscountTypesUIProps = useMemo(() => {
    return {
      ids: coffeeShopDiscountTypesUIContext.ids,
      queryParams: coffeeShopDiscountTypesUIContext.queryParams,
      setQueryParams: coffeeShopDiscountTypesUIContext.setQueryParams,
      newCoffeeShopDiscountTypeButtonClick:
        coffeeShopDiscountTypesUIContext.newCoffeeShopDiscountTypeButtonClick,
      openDeleteCoffeeShopDiscountTypesDialog:
        coffeeShopDiscountTypesUIContext.openDeleteCoffeeShopDiscountTypesDialog,
      openEditCoffeeShopDiscountTypePage:
        coffeeShopDiscountTypesUIContext.openEditCoffeeShopDiscountTypePage,
      openUpdateCoffeeShopDiscountTypesStatusDialog:
        coffeeShopDiscountTypesUIContext.openUpdateCoffeeShopDiscountTypesStatusDialog,
      openFetchCoffeeShopDiscountTypesDialog:
        coffeeShopDiscountTypesUIContext.openFetchCoffeeShopDiscountTypesDialog,
    };
  }, [coffeeShopDiscountTypesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("CoffeeShopDiscountType.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              coffeeShopDiscountTypesUIProps.newCoffeeShopDiscountTypeButtonClick
            }
          >
            {t("CoffeeShopDiscountType.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CoffeeShopDiscountTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CoffeeShopDiscountTypesUIConsumer>
        <CoffeeShopDiscountTypesTable />
      </CardBody>
    </Card>
  );
}
