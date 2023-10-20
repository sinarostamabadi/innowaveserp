
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { InsuranceCompaniesTable } from "./insuranceCompanies-table/InsuranceCompaniesTable";
import { useInsuranceCompaniesUIContext, InsuranceCompaniesUIConsumer } from "./InsuranceCompaniesUIContext";
import { useTranslation } from 'react-i18next';

export function InsuranceCompaniesCard() {
  const { t } = useTranslation();

  const insuranceCompaniesUIContext = useInsuranceCompaniesUIContext();

  const insuranceCompaniesUIProps = useMemo(() => {
    return {
      ids: insuranceCompaniesUIContext.ids,
      queryParams: insuranceCompaniesUIContext.queryParams,
      setQueryParams: insuranceCompaniesUIContext.setQueryParams,
      newInsuranceCompanyButtonClick: insuranceCompaniesUIContext.newInsuranceCompanyButtonClick,
      openDeleteInsuranceCompaniesDialog: insuranceCompaniesUIContext.openDeleteInsuranceCompaniesDialog,
      openEditInsuranceCompanyPage: insuranceCompaniesUIContext.openEditInsuranceCompanyPage,
      openUpdateInsuranceCompaniesStatusDialog: insuranceCompaniesUIContext.openUpdateInsuranceCompaniesStatusDialog,
      openFetchInsuranceCompaniesDialog: insuranceCompaniesUIContext.openFetchInsuranceCompaniesDialog,
    };
  }, [insuranceCompaniesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("InsuranceCompany.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={insuranceCompaniesUIProps.newInsuranceCompanyButtonClick}
          >
            {t("InsuranceCompany.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <InsuranceCompaniesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </InsuranceCompaniesUIConsumer>
        <InsuranceCompaniesTable />
      </CardBody>
    </Card>
  );
}