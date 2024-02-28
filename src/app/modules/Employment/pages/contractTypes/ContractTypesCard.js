import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ContractTypesTable } from "./contractTypes-table/ContractTypesTable";
import {
  useContractTypesUIContext,
  ContractTypesUIConsumer,
} from "./ContractTypesUIContext";
import { useTranslation } from "react-i18next";

export function ContractTypesCard() {
  const { t } = useTranslation();

  const contractTypesUIContext = useContractTypesUIContext();

  const contractTypesUIProps = useMemo(() => {
    return {
      ids: contractTypesUIContext.ids,
      queryParams: contractTypesUIContext.queryParams,
      setQueryParams: contractTypesUIContext.setQueryParams,
      newContractTypeButtonClick:
        contractTypesUIContext.newContractTypeButtonClick,
      openDeleteContractTypesDialog:
        contractTypesUIContext.openDeleteContractTypesDialog,
      openEditContractTypePage: contractTypesUIContext.openEditContractTypePage,
      openUpdateContractTypesStatusDialog:
        contractTypesUIContext.openUpdateContractTypesStatusDialog,
      openFetchContractTypesDialog:
        contractTypesUIContext.openFetchContractTypesDialog,
    };
  }, [contractTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("ContractType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={contractTypesUIProps.newContractTypeButtonClick}
          >
            {t("ContractType.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ContractTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ContractTypesUIConsumer>
        <ContractTypesTable />
      </CardBody>
    </Card>
  );
}
