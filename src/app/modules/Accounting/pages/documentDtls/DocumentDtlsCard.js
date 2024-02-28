import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { DocumentDtlsTable } from "./documentDtls-table/DocumentDtlsTable";
import {
  useDocumentDtlsUIContext,
  DocumentDtlsUIConsumer,
} from "./DocumentDtlsUIContext";
import { useTranslation } from "react-i18next";

export function DocumentDtlsCard() {
  const { t } = useTranslation();

  const documentDtlsUIContext = useDocumentDtlsUIContext();

  const documentDtlsUIProps = useMemo(() => {
    return {
      ids: documentDtlsUIContext.ids,
      queryParams: documentDtlsUIContext.queryParams,
      setQueryParams: documentDtlsUIContext.setQueryParams,
      newDocumentDtlButtonClick:
        documentDtlsUIContext.newDocumentDtlButtonClick,
      openDeleteDocumentDtlsDialog:
        documentDtlsUIContext.openDeleteDocumentDtlsDialog,
      openEditDocumentDtlPage: documentDtlsUIContext.openEditDocumentDtlPage,
      openUpdateDocumentDtlsStatusDialog:
        documentDtlsUIContext.openUpdateDocumentDtlsStatusDialog,
      openFetchDocumentDtlsDialog:
        documentDtlsUIContext.openFetchDocumentDtlsDialog,
    };
  }, [documentDtlsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("DocumentDtl.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={documentDtlsUIProps.newDocumentDtlButtonClick}
          >
            {t("DocumentDtl.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DocumentDtlsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </DocumentDtlsUIConsumer>
        <DocumentDtlsTable />
      </CardBody>
    </Card>
  );
}
