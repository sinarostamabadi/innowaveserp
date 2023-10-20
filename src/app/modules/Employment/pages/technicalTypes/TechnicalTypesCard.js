
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { TechnicalTypesTable } from "./technicalTypes-table/TechnicalTypesTable";
import { useTechnicalTypesUIContext, TechnicalTypesUIConsumer } from "./TechnicalTypesUIContext";
import { useTranslation } from 'react-i18next';

export function TechnicalTypesCard() {
  const { t } = useTranslation();

  const technicalTypesUIContext = useTechnicalTypesUIContext();

  const technicalTypesUIProps = useMemo(() => {
    return {
      ids: technicalTypesUIContext.ids,
      queryParams: technicalTypesUIContext.queryParams,
      setQueryParams: technicalTypesUIContext.setQueryParams,
      newTechnicalTypeButtonClick: technicalTypesUIContext.newTechnicalTypeButtonClick,
      openDeleteTechnicalTypesDialog: technicalTypesUIContext.openDeleteTechnicalTypesDialog,
      openEditTechnicalTypePage: technicalTypesUIContext.openEditTechnicalTypePage,
      openUpdateTechnicalTypesStatusDialog: technicalTypesUIContext.openUpdateTechnicalTypesStatusDialog,
      openFetchTechnicalTypesDialog: technicalTypesUIContext.openFetchTechnicalTypesDialog,
    };
  }, [technicalTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("TechnicalType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={technicalTypesUIProps.newTechnicalTypeButtonClick}
          >
            {t("TechnicalType.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <TechnicalTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </TechnicalTypesUIConsumer>
        <TechnicalTypesTable />
      </CardBody>
    </Card>
  );
}