
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { SellDocumentCostsTable } from "./sellDocumentCosts-table/SellDocumentCostsTable";
import { useSellDocumentCostsUIContext, SellDocumentCostsUIConsumer } from "./SellDocumentCostsUIContext";
import { useTranslation } from 'react-i18next';

export function SellDocumentCostsCard() {
  const { t } = useTranslation();

  const sellDocumentCostsUIContext = useSellDocumentCostsUIContext();

  const sellDocumentCostsUIProps = useMemo(() => {
    return {
      ids: sellDocumentCostsUIContext.ids,
      queryParams: sellDocumentCostsUIContext.queryParams,
      setQueryParams: sellDocumentCostsUIContext.setQueryParams,
      newSellDocumentCostButtonClick: sellDocumentCostsUIContext.newSellDocumentCostButtonClick,
      openDeleteSellDocumentCostsDialog: sellDocumentCostsUIContext.openDeleteSellDocumentCostsDialog,
      openEditSellDocumentCostPage: sellDocumentCostsUIContext.openEditSellDocumentCostPage,
      openUpdateSellDocumentCostsStatusDialog: sellDocumentCostsUIContext.openUpdateSellDocumentCostsStatusDialog,
      openFetchSellDocumentCostsDialog: sellDocumentCostsUIContext.openFetchSellDocumentCostsDialog,
    };
  }, [sellDocumentCostsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("SellDocumentCost.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={sellDocumentCostsUIProps.newSellDocumentCostButtonClick}
          >
            {t("SellDocumentCost.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SellDocumentCostsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SellDocumentCostsUIConsumer>
        <SellDocumentCostsTable />
      </CardBody>
    </Card>
  );
}