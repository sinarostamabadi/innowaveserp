import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { FutsalReserveTypesTable } from "./futsalReserveTypes-table/FutsalReserveTypesTable";
import {
  useFutsalReserveTypesUIContext,
  FutsalReserveTypesUIConsumer,
} from "./FutsalReserveTypesUIContext";
import { useTranslation } from "react-i18next";

export function FutsalReserveTypesCard() {
  const { t } = useTranslation();

  const futsalReserveTypesUIContext = useFutsalReserveTypesUIContext();

  const futsalReserveTypesUIProps = useMemo(() => {
    return {
      ids: futsalReserveTypesUIContext.ids,
      queryParams: futsalReserveTypesUIContext.queryParams,
      setQueryParams: futsalReserveTypesUIContext.setQueryParams,
      newFutsalReserveTypeButtonClick:
        futsalReserveTypesUIContext.newFutsalReserveTypeButtonClick,
      openDeleteFutsalReserveTypesDialog:
        futsalReserveTypesUIContext.openDeleteFutsalReserveTypesDialog,
      openEditFutsalReserveTypePage:
        futsalReserveTypesUIContext.openEditFutsalReserveTypePage,
      openUpdateFutsalReserveTypesStatusDialog:
        futsalReserveTypesUIContext.openUpdateFutsalReserveTypesStatusDialog,
      openFetchFutsalReserveTypesDialog:
        futsalReserveTypesUIContext.openFetchFutsalReserveTypesDialog,
    };
  }, [futsalReserveTypesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("FutsalReserveType.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={futsalReserveTypesUIProps.newFutsalReserveTypeButtonClick}
          >
            {t("FutsalReserveType.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <FutsalReserveTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </FutsalReserveTypesUIConsumer>
        <FutsalReserveTypesTable />
      </CardBody>
    </Card>
  );
}
