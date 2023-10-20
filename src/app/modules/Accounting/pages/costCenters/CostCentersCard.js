import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CostCentersTable } from "./costCenters-table/CostCentersTable";
import { useCostCentersUIContext, CostCentersUIConsumer } from "./CostCentersUIContext";
import { useTranslation } from 'react-i18next';

export function CostCentersCard() {
  const { t } = useTranslation();

  const costCentersUIContext = useCostCentersUIContext();

  const costCentersUIProps = useMemo(() => {
    return {
      ids: costCentersUIContext.ids,
      queryParams: costCentersUIContext.queryParams,
      setQueryParams: costCentersUIContext.setQueryParams,
      newCostCenterButtonClick: costCentersUIContext.newCostCenterButtonClick,
      openDeleteCostCentersDialog: costCentersUIContext.openDeleteCostCentersDialog,
      openEditCostCenterPage: costCentersUIContext.openEditCostCenterPage,
      openUpdateCostCentersStatusDialog: costCentersUIContext.openUpdateCostCentersStatusDialog,
      openFetchCostCentersDialog: costCentersUIContext.openFetchCostCentersDialog,
    };
  }, [costCentersUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("CostCenter.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={costCentersUIProps.newCostCenterButtonClick}
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CostCentersUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CostCentersUIConsumer>
        <CostCentersTable />
      </CardBody>
    </Card>
  );
}