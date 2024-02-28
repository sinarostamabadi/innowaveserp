import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { MenuItemAlbumsTable } from "./menuItemAlbums-table/MenuItemAlbumsTable";
import {
  useMenuItemAlbumsUIContext,
  MenuItemAlbumsUIConsumer,
} from "./MenuItemAlbumsUIContext";
import { useTranslation } from "react-i18next";

export function MenuItemAlbumsCard() {
  const { t } = useTranslation();

  const menuItemAlbumsUIContext = useMenuItemAlbumsUIContext();

  const menuItemAlbumsUIProps = useMemo(() => {
    return {
      ids: menuItemAlbumsUIContext.ids,
      queryParams: menuItemAlbumsUIContext.queryParams,
      setQueryParams: menuItemAlbumsUIContext.setQueryParams,
      newMenuItemAlbumButtonClick:
        menuItemAlbumsUIContext.newMenuItemAlbumButtonClick,
      openDeleteMenuItemAlbumsDialog:
        menuItemAlbumsUIContext.openDeleteMenuItemAlbumsDialog,
      openEditMenuItemAlbumPage:
        menuItemAlbumsUIContext.openEditMenuItemAlbumPage,
      openUpdateMenuItemAlbumsStatusDialog:
        menuItemAlbumsUIContext.openUpdateMenuItemAlbumsStatusDialog,
      openFetchMenuItemAlbumsDialog:
        menuItemAlbumsUIContext.openFetchMenuItemAlbumsDialog,
    };
  }, [menuItemAlbumsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("MenuItemAlbum.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={menuItemAlbumsUIProps.newMenuItemAlbumButtonClick}
          >
            {t("MenuItemAlbum.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MenuItemAlbumsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </MenuItemAlbumsUIConsumer>
        <MenuItemAlbumsTable />
      </CardBody>
    </Card>
  );
}
