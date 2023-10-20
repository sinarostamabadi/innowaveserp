
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ImportAccountTempsTable } from "./importAccountTemps-table/ImportAccountTempsTable";
import { useImportAccountTempsUIContext, ImportAccountTempsUIConsumer } from "./ImportAccountTempsUIContext";
import { useTranslation } from 'react-i18next';

export function ImportAccountTempsCard() {
  const { t } = useTranslation();

  const importAccountTempsUIContext = useImportAccountTempsUIContext();

  const importAccountTempsUIProps = useMemo(() => {
    return {
      ids: importAccountTempsUIContext.ids,
      queryParams: importAccountTempsUIContext.queryParams,
      setQueryParams: importAccountTempsUIContext.setQueryParams,
      newImportAccountTempButtonClick: importAccountTempsUIContext.newImportAccountTempButtonClick,
      openDeleteImportAccountTempsDialog: importAccountTempsUIContext.openDeleteImportAccountTempsDialog,
      openEditImportAccountTempPage: importAccountTempsUIContext.openEditImportAccountTempPage,
      openUpdateImportAccountTempsStatusDialog: importAccountTempsUIContext.openUpdateImportAccountTempsStatusDialog,
      openFetchImportAccountTempsDialog: importAccountTempsUIContext.openFetchImportAccountTempsDialog,
    };
  }, [importAccountTempsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("ImportAccountTemp.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={importAccountTempsUIProps.newImportAccountTempButtonClick}
          >
            {t("ImportAccountTemp.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ImportAccountTempsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ImportAccountTempsUIConsumer>
        <ImportAccountTempsTable />
      </CardBody>
    </Card>
  );
}