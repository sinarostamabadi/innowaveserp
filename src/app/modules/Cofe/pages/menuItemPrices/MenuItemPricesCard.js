import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { MenuItemPricesTable } from "./menuItemPrices-table/MenuItemPricesTable";
import {
  useMenuItemPricesUIContext,
  MenuItemPricesUIConsumer,
} from "./MenuItemPricesUIContext";
import { useTranslation } from "react-i18next";

export function MenuItemPricesCard() {
  const { t } = useTranslation();

  const menuItemPricesUIContext = useMenuItemPricesUIContext();

  const menuItemPricesUIProps = useMemo(() => {
    return {
      ids: menuItemPricesUIContext.ids,
      queryParams: menuItemPricesUIContext.queryParams,
      setQueryParams: menuItemPricesUIContext.setQueryParams,
      newMenuItemPriceButtonClick:
        menuItemPricesUIContext.newMenuItemPriceButtonClick,
      openDeleteMenuItemPricesDialog:
        menuItemPricesUIContext.openDeleteMenuItemPricesDialog,
      openEditMenuItemPricePage:
        menuItemPricesUIContext.openEditMenuItemPricePage,
      openUpdateMenuItemPricesStatusDialog:
        menuItemPricesUIContext.openUpdateMenuItemPricesStatusDialog,
      openFetchMenuItemPricesDialog:
        menuItemPricesUIContext.openFetchMenuItemPricesDialog,
    };
  }, [menuItemPricesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("MenuItemPrice.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={menuItemPricesUIProps.newMenuItemPriceButtonClick}
          >
            {t("MenuItemPrice.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MenuItemPricesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </MenuItemPricesUIConsumer>
        <MenuItemPricesTable />
      </CardBody>
    </Card>
  );
}
