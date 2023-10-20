
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { InsurancesTable } from "./insurances-table/InsurancesTable";
import { useInsurancesUIContext, InsurancesUIConsumer } from "./InsurancesUIContext";
import { useTranslation } from 'react-i18next';

export function InsurancesCard() {
  const { t } = useTranslation();

  const insurancesUIContext = useInsurancesUIContext();

  const insurancesUIProps = useMemo(() => {
    return {
      ids: insurancesUIContext.ids,
      queryParams: insurancesUIContext.queryParams,
      setQueryParams: insurancesUIContext.setQueryParams,
      newInsuranceButtonClick: insurancesUIContext.newInsuranceButtonClick,
      openDeleteInsurancesDialog: insurancesUIContext.openDeleteInsurancesDialog,
      openEditInsurancePage: insurancesUIContext.openEditInsurancePage,
      openUpdateInsurancesStatusDialog: insurancesUIContext.openUpdateInsurancesStatusDialog,
      openFetchInsurancesDialog: insurancesUIContext.openFetchInsurancesDialog,
    };
  }, [insurancesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("Insurance.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={insurancesUIProps.newInsuranceButtonClick}
          >
            {t("Insurance.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <InsurancesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </InsurancesUIConsumer>
        <InsurancesTable />
      </CardBody>
    </Card>
  );
}