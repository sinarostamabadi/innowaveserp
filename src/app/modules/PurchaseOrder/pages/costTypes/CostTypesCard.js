
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CostTypesTable } from "./costTypes-table/CostTypesTable";
import { useCostTypesUIContext, CostTypesUIConsumer } from "./CostTypesUIContext";
import { useTranslation } from 'react-i18next';

export function CostTypesCard() {
  const { t } = useTranslation();

  const costTypesUIContext = useCostTypesUIContext();

  const costTypesUIProps = useMemo(() => {
    return {
      ids: costTypesUIContext.ids,
      queryParams: costTypesUIContext.queryParams,
      setQueryParams: costTypesUIContext.setQueryParams,
      newCostTypeButtonClick: costTypesUIContext.newCostTypeButtonClick,
      openDeleteCostTypesDialog: costTypesUIContext.openDeleteCostTypesDialog,
      openEditCostTypePage: costTypesUIContext.openEditCostTypePage,
      openUpdateCostTypesStatusDialog: costTypesUIContext.openUpdateCostTypesStatusDialog,
      openFetchCostTypesDialog: costTypesUIContext.openFetchCostTypesDialog,
    };
  }, [costTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("CostType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={costTypesUIProps.newCostTypeButtonClick}
          >
            {t("CostType.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CostTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CostTypesUIConsumer>
        <CostTypesTable />
      </CardBody>
    </Card>
  );
}