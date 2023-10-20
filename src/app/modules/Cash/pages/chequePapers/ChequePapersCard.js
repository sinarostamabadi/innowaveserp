
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { AdvancedFilter } from "src/core/_partials/custom/advanced-filter/AdvancedFilter";
import { ChequePapersTable } from "./chequePapers-table/ChequePapersTable";
import { useChequePapersUIContext, ChequePapersUIConsumer } from "./ChequePapersUIContext";
import { useTranslation } from 'react-i18next';

export function ChequePapersCard() {
  const { t } = useTranslation();

  const chequePapersUIContext = useChequePapersUIContext();

  const chequePapersUIProps = useMemo(() => {
    return {
      ids: chequePapersUIContext.ids,
      queryParams: chequePapersUIContext.queryParams,
      setQueryParams: chequePapersUIContext.setQueryParams,
      newChequePaperButtonClick: chequePapersUIContext.newChequePaperButtonClick,
      openDeleteChequePapersDialog: chequePapersUIContext.openDeleteChequePapersDialog,
      openEditChequePaperPage: chequePapersUIContext.openEditChequePaperPage,
      openUpdateChequePapersStatusDialog: chequePapersUIContext.openUpdateChequePapersStatusDialog,
      openFetchChequePapersDialog: chequePapersUIContext.openFetchChequePapersDialog,
    };
  }, [chequePapersUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("ChequePaper.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={chequePapersUIProps.newChequePaperButtonClick}
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ChequePapersUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ChequePapersUIConsumer>
        <ChequePapersTable />
      </CardBody>
    </Card>
  );
}