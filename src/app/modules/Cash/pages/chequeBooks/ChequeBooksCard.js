
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { AdvancedFilter } from "src/core/_partials/custom/advanced-filter/AdvancedFilter";
import { ChequeBooksTable } from "./chequeBooks-table/ChequeBooksTable";
import { useChequeBooksUIContext, ChequeBooksUIConsumer } from "./ChequeBooksUIContext";
import { useTranslation } from 'react-i18next';

export function ChequeBooksCard() {
  const { t } = useTranslation();

  const chequeBooksUIContext = useChequeBooksUIContext();

  const chequeBooksUIProps = useMemo(() => {
    return {
      ids: chequeBooksUIContext.ids,
      queryParams: chequeBooksUIContext.queryParams,
      setQueryParams: chequeBooksUIContext.setQueryParams,
      newChequeBookButtonClick: chequeBooksUIContext.newChequeBookButtonClick,
      openDeleteChequeBooksDialog: chequeBooksUIContext.openDeleteChequeBooksDialog,
      openEditChequeBookPage: chequeBooksUIContext.openEditChequeBookPage,
      openUpdateChequeBooksStatusDialog: chequeBooksUIContext.openUpdateChequeBooksStatusDialog,
      openFetchChequeBooksDialog: chequeBooksUIContext.openFetchChequeBooksDialog,
    };
  }, [chequeBooksUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("ChequeBook.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={chequeBooksUIProps.newChequeBookButtonClick}
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ChequeBooksUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ChequeBooksUIConsumer>
        <ChequeBooksTable />
      </CardBody>
    </Card>
  );
}