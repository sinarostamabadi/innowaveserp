
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { PhysicalConditionTypesTable } from "./physicalConditionTypes-table/PhysicalConditionTypesTable";
import { usePhysicalConditionTypesUIContext, PhysicalConditionTypesUIConsumer } from "./PhysicalConditionTypesUIContext";
import { useTranslation } from 'react-i18next';

export function PhysicalConditionTypesCard() {
  const { t } = useTranslation();

  const physicalConditionTypesUIContext = usePhysicalConditionTypesUIContext();

  const physicalConditionTypesUIProps = useMemo(() => {
    return {
      ids: physicalConditionTypesUIContext.ids,
      queryParams: physicalConditionTypesUIContext.queryParams,
      setQueryParams: physicalConditionTypesUIContext.setQueryParams,
      newPhysicalConditionTypeButtonClick: physicalConditionTypesUIContext.newPhysicalConditionTypeButtonClick,
      openDeletePhysicalConditionTypesDialog: physicalConditionTypesUIContext.openDeletePhysicalConditionTypesDialog,
      openEditPhysicalConditionTypePage: physicalConditionTypesUIContext.openEditPhysicalConditionTypePage,
      openUpdatePhysicalConditionTypesStatusDialog: physicalConditionTypesUIContext.openUpdatePhysicalConditionTypesStatusDialog,
      openFetchPhysicalConditionTypesDialog: physicalConditionTypesUIContext.openFetchPhysicalConditionTypesDialog,
    };
  }, [physicalConditionTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("PhysicalConditionType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={physicalConditionTypesUIProps.newPhysicalConditionTypeButtonClick}
          >
            {t("PhysicalConditionType.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PhysicalConditionTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PhysicalConditionTypesUIConsumer>
        <PhysicalConditionTypesTable />
      </CardBody>
    </Card>
  );
}