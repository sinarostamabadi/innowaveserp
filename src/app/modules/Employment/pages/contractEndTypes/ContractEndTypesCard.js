
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ContractEndTypesTable } from "./contractEndTypes-table/ContractEndTypesTable";
import { useContractEndTypesUIContext, ContractEndTypesUIConsumer } from "./ContractEndTypesUIContext";
import { useTranslation } from 'react-i18next';

export function ContractEndTypesCard() {
  const { t } = useTranslation();

  const contractEndTypesUIContext = useContractEndTypesUIContext();

  const contractEndTypesUIProps = useMemo(() => {
    return {
      ids: contractEndTypesUIContext.ids,
      queryParams: contractEndTypesUIContext.queryParams,
      setQueryParams: contractEndTypesUIContext.setQueryParams,
      newContractEndTypeButtonClick: contractEndTypesUIContext.newContractEndTypeButtonClick,
      openDeleteContractEndTypesDialog: contractEndTypesUIContext.openDeleteContractEndTypesDialog,
      openEditContractEndTypePage: contractEndTypesUIContext.openEditContractEndTypePage,
      openUpdateContractEndTypesStatusDialog: contractEndTypesUIContext.openUpdateContractEndTypesStatusDialog,
      openFetchContractEndTypesDialog: contractEndTypesUIContext.openFetchContractEndTypesDialog,
    };
  }, [contractEndTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("ContractEndType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={contractEndTypesUIProps.newContractEndTypeButtonClick}
          >
            {t("ContractEndType.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ContractEndTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ContractEndTypesUIConsumer>
        <ContractEndTypesTable />
      </CardBody>
    </Card>
  );
}