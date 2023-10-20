
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ChequesTable } from "./cheques-table/ChequesTable";
import { useChequesUIContext, ChequesUIConsumer } from "./ChequesUIContext";
import { useTranslation } from 'react-i18next';

export function ChequesCard() {
  const { t } = useTranslation();

  const chequesUIContext = useChequesUIContext();

  const chequesUIProps = useMemo(() => {
    return {
      ids: chequesUIContext.ids,
      queryParams: chequesUIContext.queryParams,
      setQueryParams: chequesUIContext.setQueryParams,
      newChequeButtonClick: chequesUIContext.newChequeButtonClick,
      openDeleteChequesDialog: chequesUIContext.openDeleteChequesDialog,
      openEditChequePage: chequesUIContext.openEditChequePage,
      openUpdateChequesStatusDialog: chequesUIContext.openUpdateChequesStatusDialog,
      openFetchChequesDialog: chequesUIContext.openFetchChequesDialog,
    };
  }, [chequesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("Cheque.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={chequesUIProps.newChequeButtonClick}
          >
            {t("Cheque.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ChequesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ChequesUIConsumer>
        <ChequesTable />
      </CardBody>
    </Card>
  );
}