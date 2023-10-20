
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { MenuItemRatesTable } from "./menuItemRates-table/MenuItemRatesTable";
import { useMenuItemRatesUIContext, MenuItemRatesUIConsumer } from "./MenuItemRatesUIContext";
import { useTranslation } from 'react-i18next';

export function MenuItemRatesCard() {
  const { t } = useTranslation();

  const menuItemRatesUIContext = useMenuItemRatesUIContext();

  const menuItemRatesUIProps = useMemo(() => {
    return {
      ids: menuItemRatesUIContext.ids,
      queryParams: menuItemRatesUIContext.queryParams,
      setQueryParams: menuItemRatesUIContext.setQueryParams,
      newMenuItemRateButtonClick: menuItemRatesUIContext.newMenuItemRateButtonClick,
      openDeleteMenuItemRatesDialog: menuItemRatesUIContext.openDeleteMenuItemRatesDialog,
      openEditMenuItemRatePage: menuItemRatesUIContext.openEditMenuItemRatePage,
      openUpdateMenuItemRatesStatusDialog: menuItemRatesUIContext.openUpdateMenuItemRatesStatusDialog,
      openFetchMenuItemRatesDialog: menuItemRatesUIContext.openFetchMenuItemRatesDialog,
    };
  }, [menuItemRatesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("MenuItemRate.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={menuItemRatesUIProps.newMenuItemRateButtonClick}
          >
            {t("MenuItemRate.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MenuItemRatesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </MenuItemRatesUIConsumer>
        <MenuItemRatesTable />
      </CardBody>
    </Card>
  );
}