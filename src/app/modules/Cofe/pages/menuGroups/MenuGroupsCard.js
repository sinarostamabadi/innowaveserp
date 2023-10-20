
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { MenuGroupsTable } from "./menuGroups-table/MenuGroupsTable";
import { useMenuGroupsUIContext, MenuGroupsUIConsumer } from "./MenuGroupsUIContext";
import { useTranslation } from 'react-i18next';

export function MenuGroupsCard() {
  const { t } = useTranslation();

  const menuGroupsUIContext = useMenuGroupsUIContext();

  const menuGroupsUIProps = useMemo(() => {
    return {
      ids: menuGroupsUIContext.ids,
      queryParams: menuGroupsUIContext.queryParams,
      setQueryParams: menuGroupsUIContext.setQueryParams,
      newMenuGroupButtonClick: menuGroupsUIContext.newMenuGroupButtonClick,
      openDeleteMenuGroupsDialog: menuGroupsUIContext.openDeleteMenuGroupsDialog,
      openEditMenuGroupPage: menuGroupsUIContext.openEditMenuGroupPage,
      openUpdateMenuGroupsStatusDialog: menuGroupsUIContext.openUpdateMenuGroupsStatusDialog,
      openFetchMenuGroupsDialog: menuGroupsUIContext.openFetchMenuGroupsDialog,
    };
  }, [menuGroupsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("MenuGroup.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={menuGroupsUIProps.newMenuGroupButtonClick}
          >
            {t("MenuGroup.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MenuGroupsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </MenuGroupsUIConsumer>
        <MenuGroupsTable />
      </CardBody>
    </Card>
  );
}