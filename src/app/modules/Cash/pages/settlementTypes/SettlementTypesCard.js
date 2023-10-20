
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { SettlementTypesTable } from "./settlementTypes-table/SettlementTypesTable";
import { useSettlementTypesUIContext, SettlementTypesUIConsumer } from "./SettlementTypesUIContext";
import { useTranslation } from 'react-i18next';

export function SettlementTypesCard() {
  const { t } = useTranslation();

  const settlementTypesUIContext = useSettlementTypesUIContext();

  const settlementTypesUIProps = useMemo(() => {
    return {
      ids: settlementTypesUIContext.ids,
      queryParams: settlementTypesUIContext.queryParams,
      setQueryParams: settlementTypesUIContext.setQueryParams,
      newSettlementTypeButtonClick: settlementTypesUIContext.newSettlementTypeButtonClick,
      openDeleteSettlementTypesDialog: settlementTypesUIContext.openDeleteSettlementTypesDialog,
      openEditSettlementTypePage: settlementTypesUIContext.openEditSettlementTypePage,
      openUpdateSettlementTypesStatusDialog: settlementTypesUIContext.openUpdateSettlementTypesStatusDialog,
      openFetchSettlementTypesDialog: settlementTypesUIContext.openFetchSettlementTypesDialog,
    };
  }, [settlementTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("SettlementType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={settlementTypesUIProps.newSettlementTypeButtonClick}
          >
            {t("SettlementType.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SettlementTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SettlementTypesUIConsumer>
        <SettlementTypesTable />
      </CardBody>
    </Card>
  );
}