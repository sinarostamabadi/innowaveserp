
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RolePermissionsesTable } from "./rolePermissionses-table/RolePermissionsesTable";
import { useRolePermissionsesUIContext, RolePermissionsesUIConsumer } from "./RolePermissionsesUIContext";
import { useTranslation } from 'react-i18next';

export function RolePermissionsesCard() {
  const { t } = useTranslation();

  const rolePermissionsesUIContext = useRolePermissionsesUIContext();

  const rolePermissionsesUIProps = useMemo(() => {
    return {
      ids: rolePermissionsesUIContext.ids,
      queryParams: rolePermissionsesUIContext.queryParams,
      setQueryParams: rolePermissionsesUIContext.setQueryParams,
      newRolePermissionsButtonClick: rolePermissionsesUIContext.newRolePermissionsButtonClick,
      openDeleteRolePermissionsesDialog: rolePermissionsesUIContext.openDeleteRolePermissionsesDialog,
      openEditRolePermissionsPage: rolePermissionsesUIContext.openEditRolePermissionsPage,
      openUpdateRolePermissionsesStatusDialog: rolePermissionsesUIContext.openUpdateRolePermissionsesStatusDialog,
      openFetchRolePermissionsesDialog: rolePermissionsesUIContext.openFetchRolePermissionsesDialog,
    };
  }, [rolePermissionsesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("RolePermissions.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={rolePermissionsesUIProps.newRolePermissionsButtonClick}
          >
            {t("RolePermissions.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RolePermissionsesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RolePermissionsesUIConsumer>
        <RolePermissionsesTable />
      </CardBody>
    </Card>
  );
}