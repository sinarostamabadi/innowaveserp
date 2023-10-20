
import { useMemo, useState, useRef } from "react";

import { useTranslation } from 'react-i18next';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from "src/core/_partials/controls";
import { AdvancedFilter } from "src/core/_partials/custom/advanced-filter/AdvancedFilter";
import { CashDocumentsTable } from "./cashDocuments-table/CashDocumentsTable";
import { useCashDocumentsUIContext, CashDocumentsUIConsumer } from "./CashDocumentsUIContext";

export function CashDocumentsCard({ history }) {
  const { t } = useTranslation();

  const uiContext = useCashDocumentsUIContext();

  const uiProps = useMemo(() => {
    return {
      newButtonClick: uiContext.newCashDocumentButtonClick,
      openReportDialog: uiContext.openReportDialog,
      openCloseCashDialog: uiContext.openCloseCashDialog,
    };
  }, [uiContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("CashDocument.Entity")}>
        <CardHeaderToolbar>
        <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={uiProps.openCloseCashDialog}
          >
            {t("CashDocument.CloseTodayCash")}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={uiProps.newButtonClick}
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CashDocumentsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CashDocumentsUIConsumer>
        <CashDocumentsTable />
      </CardBody>
    </Card>
  );
}