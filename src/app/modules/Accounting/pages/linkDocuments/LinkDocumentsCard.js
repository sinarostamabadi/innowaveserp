import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { LinkDocumentsTable } from "./linkDocuments-table/LinkDocumentsTable";
import {
  useLinkDocumentsUIContext,
  LinkDocumentsUIConsumer,
} from "./LinkDocumentsUIContext";
import { useTranslation } from "react-i18next";

export function LinkDocumentsCard() {
  const { t } = useTranslation();

  const linkDocumentsUIContext = useLinkDocumentsUIContext();

  const linkDocumentsUIProps = useMemo(() => {
    return {
      ids: linkDocumentsUIContext.ids,
      queryParams: linkDocumentsUIContext.queryParams,
      setQueryParams: linkDocumentsUIContext.setQueryParams,
      newLinkDocumentButtonClick:
        linkDocumentsUIContext.newLinkDocumentButtonClick,
      openDeleteLinkDocumentsDialog:
        linkDocumentsUIContext.openDeleteLinkDocumentsDialog,
      openEditLinkDocumentPage: linkDocumentsUIContext.openEditLinkDocumentPage,
      openUpdateLinkDocumentsStatusDialog:
        linkDocumentsUIContext.openUpdateLinkDocumentsStatusDialog,
      openFetchLinkDocumentsDialog:
        linkDocumentsUIContext.openFetchLinkDocumentsDialog,
    };
  }, [linkDocumentsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("LinkDocument.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={linkDocumentsUIProps.newLinkDocumentButtonClick}
          >
            {t("LinkDocument.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <LinkDocumentsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </LinkDocumentsUIConsumer>
        <LinkDocumentsTable />
      </CardBody>
    </Card>
  );
}
