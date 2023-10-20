
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BodyBuildingCentersTable } from "./bodyBuildingCenters-table/BodyBuildingCentersTable";
import { useBodyBuildingCentersUIContext, BodyBuildingCentersUIConsumer } from "./BodyBuildingCentersUIContext";
import { useTranslation } from 'react-i18next';

export function BodyBuildingCentersCard() {
  const { t } = useTranslation();

  const bodyBuildingCentersUIContext = useBodyBuildingCentersUIContext();

  const bodyBuildingCentersUIProps = useMemo(() => {
    return {
      ids: bodyBuildingCentersUIContext.ids,
      queryParams: bodyBuildingCentersUIContext.queryParams,
      setQueryParams: bodyBuildingCentersUIContext.setQueryParams,
      newBodyBuildingCenterButtonClick: bodyBuildingCentersUIContext.newBodyBuildingCenterButtonClick,
      openDeleteBodyBuildingCentersDialog: bodyBuildingCentersUIContext.openDeleteBodyBuildingCentersDialog,
      openEditBodyBuildingCenterPage: bodyBuildingCentersUIContext.openEditBodyBuildingCenterPage,
      openUpdateBodyBuildingCentersStatusDialog: bodyBuildingCentersUIContext.openUpdateBodyBuildingCentersStatusDialog,
      openFetchBodyBuildingCentersDialog: bodyBuildingCentersUIContext.openFetchBodyBuildingCentersDialog,
    };
  }, [bodyBuildingCentersUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("BodyBuildingCenter.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={bodyBuildingCentersUIProps.newBodyBuildingCenterButtonClick}
          >
            {t("BodyBuildingCenter.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BodyBuildingCentersUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BodyBuildingCentersUIConsumer>
        <BodyBuildingCentersTable />
      </CardBody>
    </Card>
  );
}