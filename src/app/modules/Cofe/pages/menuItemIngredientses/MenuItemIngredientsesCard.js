import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { MenuItemIngredientsesTable } from "./menuItemIngredientses-table/MenuItemIngredientsesTable";
import {
  useMenuItemIngredientsesUIContext,
  MenuItemIngredientsesUIConsumer,
} from "./MenuItemIngredientsesUIContext";
import { useTranslation } from "react-i18next";

export function MenuItemIngredientsesCard() {
  const { t } = useTranslation();

  const menuItemIngredientsesUIContext = useMenuItemIngredientsesUIContext();

  const menuItemIngredientsesUIProps = useMemo(() => {
    return {
      ids: menuItemIngredientsesUIContext.ids,
      queryParams: menuItemIngredientsesUIContext.queryParams,
      setQueryParams: menuItemIngredientsesUIContext.setQueryParams,
      newMenuItemIngredientsButtonClick:
        menuItemIngredientsesUIContext.newMenuItemIngredientsButtonClick,
      openDeleteMenuItemIngredientsesDialog:
        menuItemIngredientsesUIContext.openDeleteMenuItemIngredientsesDialog,
      openEditMenuItemIngredientsPage:
        menuItemIngredientsesUIContext.openEditMenuItemIngredientsPage,
      openUpdateMenuItemIngredientsesStatusDialog:
        menuItemIngredientsesUIContext.openUpdateMenuItemIngredientsesStatusDialog,
      openFetchMenuItemIngredientsesDialog:
        menuItemIngredientsesUIContext.openFetchMenuItemIngredientsesDialog,
    };
  }, [menuItemIngredientsesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("MenuItemIngredients.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              menuItemIngredientsesUIProps.newMenuItemIngredientsButtonClick
            }
          >
            {t("MenuItemIngredients.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MenuItemIngredientsesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </MenuItemIngredientsesUIConsumer>
        <MenuItemIngredientsesTable />
      </CardBody>
    </Card>
  );
}
