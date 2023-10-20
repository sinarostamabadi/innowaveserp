
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { UserInRolesesTable } from "./userInRoleses-table/UserInRolesesTable";
import { useUserInRolesesUIContext, UserInRolesesUIConsumer } from "./UserInRolesesUIContext";
import { useTranslation } from 'react-i18next';

export function UserInRolesesCard() {
  const { t } = useTranslation();

  const userInRolesesUIContext = useUserInRolesesUIContext();

  const userInRolesesUIProps = useMemo(() => {
    return {
      ids: userInRolesesUIContext.ids,
      queryParams: userInRolesesUIContext.queryParams,
      setQueryParams: userInRolesesUIContext.setQueryParams,
      newUserInRolesButtonClick: userInRolesesUIContext.newUserInRolesButtonClick,
      openDeleteUserInRolesesDialog: userInRolesesUIContext.openDeleteUserInRolesesDialog,
      openEditUserInRolesPage: userInRolesesUIContext.openEditUserInRolesPage,
      openUpdateUserInRolesesStatusDialog: userInRolesesUIContext.openUpdateUserInRolesesStatusDialog,
      openFetchUserInRolesesDialog: userInRolesesUIContext.openFetchUserInRolesesDialog,
    };
  }, [userInRolesesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("UserInRoles.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={userInRolesesUIProps.newUserInRolesButtonClick}
          >
            {t("UserInRoles.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <UserInRolesesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </UserInRolesesUIConsumer>
        <UserInRolesesTable />
      </CardBody>
    </Card>
  );
}