import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BuySettlementTypesTable } from "./buySettlementTypes-table/BuySettlementTypesTable";
import {
  useBuySettlementTypesUIContext,
  BuySettlementTypesUIConsumer,
} from "./BuySettlementTypesUIContext";
import { useTranslation } from "react-i18next";

export function BuySettlementTypesCard() {
  const { t } = useTranslation();

  const buySettlementTypesUIContext = useBuySettlementTypesUIContext();

  const buySettlementTypesUIProps = useMemo(() => {
    return {
      ids: buySettlementTypesUIContext.ids,
      queryParams: buySettlementTypesUIContext.queryParams,
      setQueryParams: buySettlementTypesUIContext.setQueryParams,
      newBuySettlementTypeButtonClick:
        buySettlementTypesUIContext.newBuySettlementTypeButtonClick,
      openDeleteBuySettlementTypesDialog:
        buySettlementTypesUIContext.openDeleteBuySettlementTypesDialog,
      openEditBuySettlementTypePage:
        buySettlementTypesUIContext.openEditBuySettlementTypePage,
      openUpdateBuySettlementTypesStatusDialog:
        buySettlementTypesUIContext.openUpdateBuySettlementTypesStatusDialog,
      openFetchBuySettlementTypesDialog:
        buySettlementTypesUIContext.openFetchBuySettlementTypesDialog,
    };
  }, [buySettlementTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("BuySettlementType.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={buySettlementTypesUIProps.newBuySettlementTypeButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BuySettlementTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BuySettlementTypesUIConsumer>
        <BuySettlementTypesTable />
      </CardBody>
    </Card>
  );
}
