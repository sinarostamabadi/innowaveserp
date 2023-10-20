
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { UserServiceItemsTable } from "./userServiceItems-table/UserServiceItemsTable";
import { useUserServiceItemsUIContext, UserServiceItemsUIConsumer } from "./UserServiceItemsUIContext";
import { useTranslation } from 'react-i18next';

export function UserServiceItemsCard() {
  const { t } = useTranslation();

  const userServiceItemsUIContext = useUserServiceItemsUIContext();

  const userServiceItemsUIProps = useMemo(() => {
    return {
      ids: userServiceItemsUIContext.ids,
      queryParams: userServiceItemsUIContext.queryParams,
      setQueryParams: userServiceItemsUIContext.setQueryParams,
      newUserServiceItemButtonClick: userServiceItemsUIContext.newUserServiceItemButtonClick,
      openDeleteUserServiceItemsDialog: userServiceItemsUIContext.openDeleteUserServiceItemsDialog,
      openEditUserServiceItemPage: userServiceItemsUIContext.openEditUserServiceItemPage,
      openUpdateUserServiceItemsStatusDialog: userServiceItemsUIContext.openUpdateUserServiceItemsStatusDialog,
      openFetchUserServiceItemsDialog: userServiceItemsUIContext.openFetchUserServiceItemsDialog,
    };
  }, [userServiceItemsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("UserServiceItem.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={userServiceItemsUIProps.newUserServiceItemButtonClick}
          >
            {t("UserServiceItem.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <UserServiceItemsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </UserServiceItemsUIConsumer>
        <UserServiceItemsTable />
      </CardBody>
    </Card>
  );
}