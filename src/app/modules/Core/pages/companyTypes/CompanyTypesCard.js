import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CompanyTypesTable } from "./companyTypes-table/CompanyTypesTable";
import {
  useCompanyTypesUIContext,
  CompanyTypesUIConsumer,
} from "./CompanyTypesUIContext";
export function CompanyTypesCard() {
  const companyTypesUIContext = useCompanyTypesUIContext();
  const companyTypesUIProps = useMemo(() => {
    return {
      ids: companyTypesUIContext.ids,
      queryParams: companyTypesUIContext.queryParams,
      setQueryParams: companyTypesUIContext.setQueryParams,
      newCompanyTypeButtonClick: companyTypesUIContext.newCompanyTypeButtonClick,
      openDeleteCompanyTypesDialog:  
        companyTypesUIContext.openDeleteCompanyTypesDialog,
      openEditCompanyTypePage: companyTypesUIContext.openEditCompanyTypePage,
      openUpdateCompanyTypesStatusDialog:  
        companyTypesUIContext.openUpdateCompanyTypesStatusDialog,
      openFetchCompanyTypesDialog: companyTypesUIContext.openFetchCompanyTypesDialog,
    };
  }, [companyTypesUIContext]);
  return (
    <Card>
      <CardHeader title="EntityTitle">
        <CardHeaderToolbar>
          <button  
            type="button"  
            className="btn btn-primary"  
            onClick={companyTypesUIProps.newCompanyTypeButtonClick}
          >
            EntityTitle  
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CompanyTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CompanyTypesUIConsumer>
        <CompanyTypesTable />
      </CardBody>
    </Card>
  );
}
