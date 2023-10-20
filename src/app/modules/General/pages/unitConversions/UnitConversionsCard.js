
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { UnitConversionsTable } from "./unitConversions-table/UnitConversionsTable";
import { useUnitConversionsUIContext, UnitConversionsUIConsumer } from "./UnitConversionsUIContext";
import { useTranslation } from 'react-i18next';

export function UnitConversionsCard() {
  const { t } = useTranslation();

  const unitConversionsUIContext = useUnitConversionsUIContext();

  const unitConversionsUIProps = useMemo(() => {
    return {
      ids: unitConversionsUIContext.ids,
      queryParams: unitConversionsUIContext.queryParams,
      setQueryParams: unitConversionsUIContext.setQueryParams,
      newUnitConversionButtonClick: unitConversionsUIContext.newUnitConversionButtonClick,
      openDeleteUnitConversionsDialog: unitConversionsUIContext.openDeleteUnitConversionsDialog,
      openEditUnitConversionPage: unitConversionsUIContext.openEditUnitConversionPage,
      openUpdateUnitConversionsStatusDialog: unitConversionsUIContext.openUpdateUnitConversionsStatusDialog,
      openFetchUnitConversionsDialog: unitConversionsUIContext.openFetchUnitConversionsDialog,
    };
  }, [unitConversionsUIContext]);

  return (
    <Card>
      <CardHeader title={t("UnitConversion.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={unitConversionsUIProps.newUnitConversionButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <UnitConversionsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </UnitConversionsUIConsumer>
        <UnitConversionsTable />
      </CardBody>
    </Card>
  );
}