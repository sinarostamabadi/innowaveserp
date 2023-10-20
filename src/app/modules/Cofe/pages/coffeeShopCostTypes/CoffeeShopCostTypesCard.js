
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CoffeeShopCostTypesTable } from "./coffeeShopCostTypes-table/CoffeeShopCostTypesTable";
import { useCoffeeShopCostTypesUIContext, CoffeeShopCostTypesUIConsumer } from "./CoffeeShopCostTypesUIContext";
import { useTranslation } from 'react-i18next';

export function CoffeeShopCostTypesCard() {
  const { t } = useTranslation();

  const coffeeShopCostTypesUIContext = useCoffeeShopCostTypesUIContext();

  const coffeeShopCostTypesUIProps = useMemo(() => {
    return {
      ids: coffeeShopCostTypesUIContext.ids,
      queryParams: coffeeShopCostTypesUIContext.queryParams,
      setQueryParams: coffeeShopCostTypesUIContext.setQueryParams,
      newCoffeeShopCostTypeButtonClick: coffeeShopCostTypesUIContext.newCoffeeShopCostTypeButtonClick,
      openDeleteCoffeeShopCostTypesDialog: coffeeShopCostTypesUIContext.openDeleteCoffeeShopCostTypesDialog,
      openEditCoffeeShopCostTypePage: coffeeShopCostTypesUIContext.openEditCoffeeShopCostTypePage,
      openUpdateCoffeeShopCostTypesStatusDialog: coffeeShopCostTypesUIContext.openUpdateCoffeeShopCostTypesStatusDialog,
      openFetchCoffeeShopCostTypesDialog: coffeeShopCostTypesUIContext.openFetchCoffeeShopCostTypesDialog,
    };
  }, [coffeeShopCostTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("CoffeeShopCostType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={coffeeShopCostTypesUIProps.newCoffeeShopCostTypeButtonClick}
          >
            {t("CoffeeShopCostType.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CoffeeShopCostTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CoffeeShopCostTypesUIConsumer>
        <CoffeeShopCostTypesTable />
      </CardBody>
    </Card>
  );
}