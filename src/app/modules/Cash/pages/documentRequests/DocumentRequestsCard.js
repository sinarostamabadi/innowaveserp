import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { DocumentRequestsTable } from "./documentRequests-table/DocumentRequestsTable";
import {
  useDocumentRequestsUIContext,
  DocumentRequestsUIConsumer,
} from "./DocumentRequestsUIContext";
import { useTranslation } from "react-i18next";

export function DocumentRequestsCard() {
  const { t } = useTranslation();

  const documentRequestsUIContext = useDocumentRequestsUIContext();

  const documentRequestsUIProps = useMemo(() => {
    return {
      ids: documentRequestsUIContext.ids,
      queryParams: documentRequestsUIContext.queryParams,
      setQueryParams: documentRequestsUIContext.setQueryParams,
      newDocumentRequestButtonClick:
        documentRequestsUIContext.newDocumentRequestButtonClick,
      openDeleteDocumentRequestsDialog:
        documentRequestsUIContext.openDeleteDocumentRequestsDialog,
      openEditDocumentRequestPage:
        documentRequestsUIContext.openEditDocumentRequestPage,
      openUpdateDocumentRequestsStatusDialog:
        documentRequestsUIContext.openUpdateDocumentRequestsStatusDialog,
      openFetchDocumentRequestsDialog:
        documentRequestsUIContext.openFetchDocumentRequestsDialog,
    };
  }, [documentRequestsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("DocumentRequest.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={documentRequestsUIProps.newDocumentRequestButtonClick}
          >
            {t("DocumentRequest.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DocumentRequestsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </DocumentRequestsUIConsumer>
        <DocumentRequestsTable />
      </CardBody>
    </Card>
  );
}
