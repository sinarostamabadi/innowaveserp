import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CentersTable } from "./centers-table/CentersTable";
import { useCentersUIContext, CentersUIConsumer } from "./CentersUIContext";
import { useTranslation } from "react-i18next";

export function CentersCard() {
  const { t } = useTranslation();

  const centersUIContext = useCentersUIContext();

  const centersUIProps = useMemo(() => {
    return {
      ids: centersUIContext.ids,
      queryParams: centersUIContext.queryParams,
      setQueryParams: centersUIContext.setQueryParams,
      newCenterButtonClick: centersUIContext.newCenterButtonClick,
      openDeleteCentersDialog: centersUIContext.openDeleteCentersDialog,
      openEditCenterPage: centersUIContext.openEditCenterPage,
      openUpdateCentersStatusDialog:
        centersUIContext.openUpdateCentersStatusDialog,
      openFetchCentersDialog: centersUIContext.openFetchCentersDialog,
    };
  }, [centersUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Center.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={centersUIProps.newCenterButtonClick}
          >
            {t("Center.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CentersUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CentersUIConsumer>
        <CentersTable />
      </CardBody>
    </Card>
  );
}
