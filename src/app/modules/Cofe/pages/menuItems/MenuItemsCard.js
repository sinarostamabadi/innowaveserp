import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { MenuItemsTable } from "./menuItems-table/MenuItemsTable";
import {
  useMenuItemsUIContext,
  MenuItemsUIConsumer,
} from "./MenuItemsUIContext";
import { useTranslation } from "react-i18next";

export function MenuItemsCard() {
  const { t } = useTranslation();

  const menuItemsUIContext = useMenuItemsUIContext();

  const menuItemsUIProps = useMemo(() => {
    return {
      ids: menuItemsUIContext.ids,
      queryParams: menuItemsUIContext.queryParams,
      setQueryParams: menuItemsUIContext.setQueryParams,
      newMenuItemButtonClick: menuItemsUIContext.newMenuItemButtonClick,
      openDeleteMenuItemsDialog: menuItemsUIContext.openDeleteMenuItemsDialog,
      openEditMenuItemPage: menuItemsUIContext.openEditMenuItemPage,
      openUpdateMenuItemsStatusDialog:
        menuItemsUIContext.openUpdateMenuItemsStatusDialog,
      openFetchMenuItemsDialog: menuItemsUIContext.openFetchMenuItemsDialog,
    };
  }, [menuItemsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("MenuItem.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={menuItemsUIProps.newMenuItemButtonClick}
          >
            {t("MenuItem.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MenuItemsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </MenuItemsUIConsumer>
        <MenuItemsTable />
      </CardBody>
    </Card>
  );
}
