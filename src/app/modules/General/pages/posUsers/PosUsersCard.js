import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { PosUsersTable } from "./posUsers-table/PosUsersTable";
import { usePosUsersUIContext, PosUsersUIConsumer } from "./PosUsersUIContext";
import { useTranslation } from "react-i18next";

export function PosUsersCard() {
  const { t } = useTranslation();

  const posUsersUIContext = usePosUsersUIContext();

  const posUsersUIProps = useMemo(() => {
    return {
      ids: posUsersUIContext.ids,
      queryParams: posUsersUIContext.queryParams,
      setQueryParams: posUsersUIContext.setQueryParams,
      newPosUserButtonClick: posUsersUIContext.newPosUserButtonClick,
      openDeletePosUsersDialog: posUsersUIContext.openDeletePosUsersDialog,
      openEditPosUserPage: posUsersUIContext.openEditPosUserPage,
      openUpdatePosUsersStatusDialog:
        posUsersUIContext.openUpdatePosUsersStatusDialog,
      openFetchPosUsersDialog: posUsersUIContext.openFetchPosUsersDialog,
    };
  }, [posUsersUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("PosUser.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={posUsersUIProps.newPosUserButtonClick}
          >
            {t("PosUser.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PosUsersUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PosUsersUIConsumer>
        <PosUsersTable />
      </CardBody>
    </Card>
  );
}
