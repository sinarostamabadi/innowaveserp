
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { RolesesTable } from "./roleses-table/RolesesTable";
import { useRolesesUIContext, RolesesUIConsumer } from "./RolesesUIContext";
import { useTranslation } from 'react-i18next';

export function RolesesCard() {
  const { t } = useTranslation();

  const rolesesUIContext = useRolesesUIContext();

  const rolesesUIProps = useMemo(() => {
    return {
      ids: rolesesUIContext.ids,
      queryParams: rolesesUIContext.queryParams,
      setQueryParams: rolesesUIContext.setQueryParams,
      newRolesButtonClick: rolesesUIContext.newRolesButtonClick,
      openDeleteRolesesDialog: rolesesUIContext.openDeleteRolesesDialog,
      openEditRolesPage: rolesesUIContext.openEditRolesPage,
      openUpdateRolesesStatusDialog: rolesesUIContext.openUpdateRolesesStatusDialog,
      openFetchRolesesDialog: rolesesUIContext.openFetchRolesesDialog,
    };
  }, [rolesesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("Roles.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={rolesesUIProps.newRolesButtonClick}
          >
            {t("Roles.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RolesesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </RolesesUIConsumer>
        <RolesesTable />
      </CardBody>
    </Card>
  );
}