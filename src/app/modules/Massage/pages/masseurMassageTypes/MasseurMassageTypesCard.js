import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { MasseurMassageTypesTable } from "./masseurMassageTypes-table/MasseurMassageTypesTable";
import {
  useMasseurMassageTypesUIContext,
  MasseurMassageTypesUIConsumer,
} from "./MasseurMassageTypesUIContext";
import { useTranslation } from "react-i18next";

export function MasseurMassageTypesCard() {
  const { t } = useTranslation();

  const masseurMassageTypesUIContext = useMasseurMassageTypesUIContext();

  const masseurMassageTypesUIProps = useMemo(() => {
    return {
      ids: masseurMassageTypesUIContext.ids,
      queryParams: masseurMassageTypesUIContext.queryParams,
      setQueryParams: masseurMassageTypesUIContext.setQueryParams,
      newMasseurMassageTypeButtonClick:
        masseurMassageTypesUIContext.newMasseurMassageTypeButtonClick,
      openDeleteMasseurMassageTypesDialog:
        masseurMassageTypesUIContext.openDeleteMasseurMassageTypesDialog,
      openEditMasseurMassageTypePage:
        masseurMassageTypesUIContext.openEditMasseurMassageTypePage,
      openUpdateMasseurMassageTypesStatusDialog:
        masseurMassageTypesUIContext.openUpdateMasseurMassageTypesStatusDialog,
      openFetchMasseurMassageTypesDialog:
        masseurMassageTypesUIContext.openFetchMasseurMassageTypesDialog,
    };
  }, [masseurMassageTypesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("MasseurMassageType.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              masseurMassageTypesUIProps.newMasseurMassageTypeButtonClick
            }
          >
            {t("MasseurMassageType.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MasseurMassageTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </MasseurMassageTypesUIConsumer>
        <MasseurMassageTypesTable />
      </CardBody>
    </Card>
  );
}
