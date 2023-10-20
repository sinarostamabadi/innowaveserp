
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { UserPermissionsTable } from "./userPermissions-table/UserPermissionsTable";
import { useUserPermissionsUIContext, UserPermissionsUIConsumer } from "./UserPermissionsUIContext";
import { useTranslation } from 'react-i18next';

export function UserPermissionsCard() {
  const { t } = useTranslation();

  const userPermissionsUIContext = useUserPermissionsUIContext();

  const userPermissionsUIProps = useMemo(() => {
    return {
      ids: userPermissionsUIContext.ids,
      queryParams: userPermissionsUIContext.queryParams,
      setQueryParams: userPermissionsUIContext.setQueryParams,
      newUserPermissionButtonClick: userPermissionsUIContext.newUserPermissionButtonClick,
      openDeleteUserPermissionsDialog: userPermissionsUIContext.openDeleteUserPermissionsDialog,
      openEditUserPermissionPage: userPermissionsUIContext.openEditUserPermissionPage,
      openUpdateUserPermissionsStatusDialog: userPermissionsUIContext.openUpdateUserPermissionsStatusDialog,
      openFetchUserPermissionsDialog: userPermissionsUIContext.openFetchUserPermissionsDialog,
    };
  }, [userPermissionsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("UserPermission.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={userPermissionsUIProps.newUserPermissionButtonClick}
          >
            {t("UserPermission.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <UserPermissionsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </UserPermissionsUIConsumer>
        <UserPermissionsTable />
      </CardBody>
    </Card>
  );
}