import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CostsTable } from "./costs-table/CostsTable";
import { useCostsUIContext, CostsUIConsumer } from "./CostsUIContext";
import { useTranslation } from 'react-i18next';

export function CostsCard() {
  const { t } = useTranslation();

  const costsUIContext = useCostsUIContext();

  const costsUIProps = useMemo(() => {
    return {
      ids: costsUIContext.ids,
      queryParams: costsUIContext.queryParams,
      setQueryParams: costsUIContext.setQueryParams,
      newCostButtonClick: costsUIContext.newCostButtonClick,
      openDeleteCostsDialog: costsUIContext.openDeleteCostsDialog,
      openEditCostPage: costsUIContext.openEditCostPage,
      openUpdateCostsStatusDialog: costsUIContext.openUpdateCostsStatusDialog,
      openFetchCostsDialog: costsUIContext.openFetchCostsDialog,
    };
  }, [costsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Cost.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={costsUIProps.newCostButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CostsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CostsUIConsumer>
        <CostsTable />
      </CardBody>
    </Card>
  );
}