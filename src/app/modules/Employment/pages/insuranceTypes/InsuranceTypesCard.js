
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { InsuranceTypesTable } from "./insuranceTypes-table/InsuranceTypesTable";
import { useInsuranceTypesUIContext, InsuranceTypesUIConsumer } from "./InsuranceTypesUIContext";
import { useTranslation } from 'react-i18next';

export function InsuranceTypesCard() {
  const { t } = useTranslation();

  const insuranceTypesUIContext = useInsuranceTypesUIContext();

  const insuranceTypesUIProps = useMemo(() => {
    return {
      ids: insuranceTypesUIContext.ids,
      queryParams: insuranceTypesUIContext.queryParams,
      setQueryParams: insuranceTypesUIContext.setQueryParams,
      newInsuranceTypeButtonClick: insuranceTypesUIContext.newInsuranceTypeButtonClick,
      openDeleteInsuranceTypesDialog: insuranceTypesUIContext.openDeleteInsuranceTypesDialog,
      openEditInsuranceTypePage: insuranceTypesUIContext.openEditInsuranceTypePage,
      openUpdateInsuranceTypesStatusDialog: insuranceTypesUIContext.openUpdateInsuranceTypesStatusDialog,
      openFetchInsuranceTypesDialog: insuranceTypesUIContext.openFetchInsuranceTypesDialog,
    };
  }, [insuranceTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("InsuranceType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={insuranceTypesUIProps.newInsuranceTypeButtonClick}
          >
            {t("InsuranceType.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <InsuranceTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </InsuranceTypesUIConsumer>
        <InsuranceTypesTable />
      </CardBody>
    </Card>
  );
}