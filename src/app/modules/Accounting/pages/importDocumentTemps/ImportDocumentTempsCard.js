
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ImportDocumentTempsTable } from "./importDocumentTemps-table/ImportDocumentTempsTable";
import { useImportDocumentTempsUIContext, ImportDocumentTempsUIConsumer } from "./ImportDocumentTempsUIContext";
import { useTranslation } from 'react-i18next';

export function ImportDocumentTempsCard() {
  const { t } = useTranslation();

  const importDocumentTempsUIContext = useImportDocumentTempsUIContext();

  const importDocumentTempsUIProps = useMemo(() => {
    return {
      ids: importDocumentTempsUIContext.ids,
      queryParams: importDocumentTempsUIContext.queryParams,
      setQueryParams: importDocumentTempsUIContext.setQueryParams,
      newImportDocumentTempButtonClick: importDocumentTempsUIContext.newImportDocumentTempButtonClick,
      openDeleteImportDocumentTempsDialog: importDocumentTempsUIContext.openDeleteImportDocumentTempsDialog,
      openEditImportDocumentTempPage: importDocumentTempsUIContext.openEditImportDocumentTempPage,
      openUpdateImportDocumentTempsStatusDialog: importDocumentTempsUIContext.openUpdateImportDocumentTempsStatusDialog,
      openFetchImportDocumentTempsDialog: importDocumentTempsUIContext.openFetchImportDocumentTempsDialog,
    };
  }, [importDocumentTempsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("ImportDocumentTemp.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={importDocumentTempsUIProps.newImportDocumentTempButtonClick}
          >
            {t("ImportDocumentTemp.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ImportDocumentTempsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ImportDocumentTempsUIConsumer>
        <ImportDocumentTempsTable />
      </CardBody>
    </Card>
  );
}