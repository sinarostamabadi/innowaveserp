
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { UsersTable } from "./users-table/UsersTable";
import { useUsersUIContext, UsersUIConsumer } from "./UsersUIContext";
import { useTranslation } from 'react-i18next';

export function UsersCard() {
  const { t } = useTranslation();

  const usersUIContext = useUsersUIContext();

  const usersUIProps = useMemo(() => {
    return {
      ids: usersUIContext.ids,
      queryParams: usersUIContext.queryParams,
      setQueryParams: usersUIContext.setQueryParams,
      newUserButtonClick: usersUIContext.newUserButtonClick,
      openDeleteUsersDialog: usersUIContext.openDeleteUsersDialog,
      openEditUserPage: usersUIContext.openEditUserPage,
      openUpdateUsersStatusDialog: usersUIContext.openUpdateUsersStatusDialog,
      openFetchUsersDialog: usersUIContext.openFetchUsersDialog,
    };
  }, [usersUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("User.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={usersUIProps.newUserButtonClick}
          >
            {t("User.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <UsersUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </UsersUIConsumer>
        <UsersTable />
      </CardBody>
    </Card>
  );
}