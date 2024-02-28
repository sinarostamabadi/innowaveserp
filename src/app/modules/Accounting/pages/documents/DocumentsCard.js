import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { DocumentsTable } from "./documents-table/DocumentsTable";
import {
  useDocumentsUIContext,
  DocumentsUIConsumer,
} from "./DocumentsUIContext";
import { useTranslation } from "react-i18next";

export function DocumentsCard() {
  const { t } = useTranslation();

  const documentsUIContext = useDocumentsUIContext();

  const documentsUIProps = useMemo(() => {
    return {
      ids: documentsUIContext.ids,
      queryParams: documentsUIContext.queryParams,
      setQueryParams: documentsUIContext.setQueryParams,
      newDocumentButtonClick: documentsUIContext.newDocumentButtonClick,
      openDeleteDocumentsDialog: documentsUIContext.openDeleteDocumentsDialog,
      openEditDocumentPage: documentsUIContext.openEditDocumentPage,
      openUpdateDocumentsStatusDialog:
        documentsUIContext.openUpdateDocumentsStatusDialog,
      openFetchDocumentsDialog: documentsUIContext.openFetchDocumentsDialog,
    };
  }, [documentsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Document.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={documentsUIProps.newDocumentButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DocumentsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </DocumentsUIConsumer>
        <DocumentsTable />
      </CardBody>
    </Card>
  );
}
