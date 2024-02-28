import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { MassageTypesTable } from "./massageTypes-table/MassageTypesTable";
import {
  useMassageTypesUIContext,
  MassageTypesUIConsumer,
} from "./MassageTypesUIContext";
import { useTranslation } from "react-i18next";

export function MassageTypesCard() {
  const { t } = useTranslation();

  const massageTypesUIContext = useMassageTypesUIContext();

  const massageTypesUIProps = useMemo(() => {
    return {
      ids: massageTypesUIContext.ids,
      queryParams: massageTypesUIContext.queryParams,
      setQueryParams: massageTypesUIContext.setQueryParams,
      newMassageTypeButtonClick:
        massageTypesUIContext.newMassageTypeButtonClick,
      openDeleteMassageTypesDialog:
        massageTypesUIContext.openDeleteMassageTypesDialog,
      openEditMassageTypePage: massageTypesUIContext.openEditMassageTypePage,
      openUpdateMassageTypesStatusDialog:
        massageTypesUIContext.openUpdateMassageTypesStatusDialog,
      openFetchMassageTypesDialog:
        massageTypesUIContext.openFetchMassageTypesDialog,
    };
  }, [massageTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("MassageType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={massageTypesUIProps.newMassageTypeButtonClick}
          >
            {t("MassageType.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MassageTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </MassageTypesUIConsumer>
        <MassageTypesTable />
      </CardBody>
    </Card>
  );
}
