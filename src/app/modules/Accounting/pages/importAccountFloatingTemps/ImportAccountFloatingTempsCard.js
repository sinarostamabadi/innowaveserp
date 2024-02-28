import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ImportAccountFloatingTempsTable } from "./importAccountFloatingTemps-table/ImportAccountFloatingTempsTable";
import {
  useImportAccountFloatingTempsUIContext,
  ImportAccountFloatingTempsUIConsumer,
} from "./ImportAccountFloatingTempsUIContext";
import { useTranslation } from "react-i18next";

export function ImportAccountFloatingTempsCard() {
  const { t } = useTranslation();

  const importAccountFloatingTempsUIContext =
    useImportAccountFloatingTempsUIContext();

  const importAccountFloatingTempsUIProps = useMemo(() => {
    return {
      ids: importAccountFloatingTempsUIContext.ids,
      queryParams: importAccountFloatingTempsUIContext.queryParams,
      setQueryParams: importAccountFloatingTempsUIContext.setQueryParams,
      newImportAccountFloatingTempButtonClick:
        importAccountFloatingTempsUIContext.newImportAccountFloatingTempButtonClick,
      openDeleteImportAccountFloatingTempsDialog:
        importAccountFloatingTempsUIContext.openDeleteImportAccountFloatingTempsDialog,
      openEditImportAccountFloatingTempPage:
        importAccountFloatingTempsUIContext.openEditImportAccountFloatingTempPage,
      openUpdateImportAccountFloatingTempsStatusDialog:
        importAccountFloatingTempsUIContext.openUpdateImportAccountFloatingTempsStatusDialog,
      openFetchImportAccountFloatingTempsDialog:
        importAccountFloatingTempsUIContext.openFetchImportAccountFloatingTempsDialog,
    };
  }, [importAccountFloatingTempsUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("ImportAccountFloatingTemp.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              importAccountFloatingTempsUIProps.newImportAccountFloatingTempButtonClick
            }
          >
            {t("ImportAccountFloatingTemp.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ImportAccountFloatingTempsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ImportAccountFloatingTempsUIConsumer>
        <ImportAccountFloatingTempsTable />
      </CardBody>
    </Card>
  );
}
