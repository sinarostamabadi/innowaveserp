
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { MarridationTypesTable } from "./marridationTypes-table/MarridationTypesTable";
import { useMarridationTypesUIContext, MarridationTypesUIConsumer } from "./MarridationTypesUIContext";
import { useTranslation } from 'react-i18next';

export function MarridationTypesCard() {
  const { t } = useTranslation();

  const marridationTypesUIContext = useMarridationTypesUIContext();

  const marridationTypesUIProps = useMemo(() => {
    return {
      ids: marridationTypesUIContext.ids,
      queryParams: marridationTypesUIContext.queryParams,
      setQueryParams: marridationTypesUIContext.setQueryParams,
      newMarridationTypeButtonClick: marridationTypesUIContext.newMarridationTypeButtonClick,
      openDeleteMarridationTypesDialog: marridationTypesUIContext.openDeleteMarridationTypesDialog,
      openEditMarridationTypePage: marridationTypesUIContext.openEditMarridationTypePage,
      openUpdateMarridationTypesStatusDialog: marridationTypesUIContext.openUpdateMarridationTypesStatusDialog,
      openFetchMarridationTypesDialog: marridationTypesUIContext.openFetchMarridationTypesDialog,
    };
  }, [marridationTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("MarridationType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={marridationTypesUIProps.newMarridationTypeButtonClick}
          >
            {t("MarridationType.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MarridationTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </MarridationTypesUIConsumer>
        <MarridationTypesTable />
      </CardBody>
    </Card>
  );
}