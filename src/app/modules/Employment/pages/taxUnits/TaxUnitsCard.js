
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { TaxUnitsTable } from "./taxUnits-table/TaxUnitsTable";
import { useTaxUnitsUIContext, TaxUnitsUIConsumer } from "./TaxUnitsUIContext";
import { useTranslation } from 'react-i18next';

export function TaxUnitsCard() {
  const { t } = useTranslation();

  const taxUnitsUIContext = useTaxUnitsUIContext();

  const taxUnitsUIProps = useMemo(() => {
    return {
      ids: taxUnitsUIContext.ids,
      queryParams: taxUnitsUIContext.queryParams,
      setQueryParams: taxUnitsUIContext.setQueryParams,
      newTaxUnitButtonClick: taxUnitsUIContext.newTaxUnitButtonClick,
      openDeleteTaxUnitsDialog: taxUnitsUIContext.openDeleteTaxUnitsDialog,
      openEditTaxUnitPage: taxUnitsUIContext.openEditTaxUnitPage,
      openUpdateTaxUnitsStatusDialog: taxUnitsUIContext.openUpdateTaxUnitsStatusDialog,
      openFetchTaxUnitsDialog: taxUnitsUIContext.openFetchTaxUnitsDialog,
    };
  }, [taxUnitsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("TaxUnit.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={taxUnitsUIProps.newTaxUnitButtonClick}
          >
            {t("TaxUnit.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <TaxUnitsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </TaxUnitsUIConsumer>
        <TaxUnitsTable />
      </CardBody>
    </Card>
  );
}