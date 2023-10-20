import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import CompaniesTable from "./companies-table/CompaniesTable";
import {
  useCompaniesUIContext,
  CompaniesUIConsumer,
} from "./CompaniesUIContext";
import { useTranslation } from 'react-i18next';

export function CompaniesCard() {
  const {t} = useTranslation();
  
  const companiesUIContext = useCompaniesUIContext();
  const companiesUIProps = useMemo(() => {
    return {
      ids: companiesUIContext.ids,
      queryParams: companiesUIContext.queryParams,
      setQueryParams: companiesUIContext.setQueryParams,
      newCompanyButtonClick: companiesUIContext.newCompanyButtonClick,
      openDeleteCompaniesDialog:  
        companiesUIContext.openDeleteCompaniesDialog,
      openEditCompanyPage: companiesUIContext.openEditCompanyPage,
      openUpdateCompaniesStatusDialog:  
        companiesUIContext.openUpdateCompaniesStatusDialog,
      openFetchCompaniesDialog: companiesUIContext.openFetchCompaniesDialog,
    };
  }, [companiesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("Company.Entity")}>
        <CardHeaderToolbar>
          <button  
            type="button"  
            className="btn btn-primary"  
            onClick={companiesUIProps.newCompanyButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CompaniesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CompaniesUIConsumer>
        <CompaniesTable />
      </CardBody>
    </Card>
  );
}
