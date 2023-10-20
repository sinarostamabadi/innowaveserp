
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { DocumentTypesTable } from "./documentTypes-table/DocumentTypesTable";
import { useDocumentTypesUIContext, DocumentTypesUIConsumer } from "./DocumentTypesUIContext";
import { useTranslation } from 'react-i18next';

export function DocumentTypesCard() {
  const { t } = useTranslation();

  const documentTypesUIContext = useDocumentTypesUIContext();

  const documentTypesUIProps = useMemo(() => {
    return {
      ids: documentTypesUIContext.ids,
      queryParams: documentTypesUIContext.queryParams,
      setQueryParams: documentTypesUIContext.setQueryParams,
      newDocumentTypeButtonClick: documentTypesUIContext.newDocumentTypeButtonClick,
      openDeleteDocumentTypesDialog: documentTypesUIContext.openDeleteDocumentTypesDialog,
      openEditDocumentTypePage: documentTypesUIContext.openEditDocumentTypePage,
      openUpdateDocumentTypesStatusDialog: documentTypesUIContext.openUpdateDocumentTypesStatusDialog,
      openFetchDocumentTypesDialog: documentTypesUIContext.openFetchDocumentTypesDialog,
    };
  }, [documentTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("DocumentType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={documentTypesUIProps.newDocumentTypeButtonClick}
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DocumentTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </DocumentTypesUIConsumer>
        <DocumentTypesTable />
      </CardBody>
    </Card>
  );
}