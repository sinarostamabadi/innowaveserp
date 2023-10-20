
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ChequeStatusesTable } from "./chequeStatuses-table/ChequeStatusesTable";
import { useChequeStatusesUIContext, ChequeStatusesUIConsumer } from "./ChequeStatusesUIContext";
import { useTranslation } from 'react-i18next';

export function ChequeStatusesCard() {
  const { t } = useTranslation();

  const chequeStatusesUIContext = useChequeStatusesUIContext();

  const chequeStatusesUIProps = useMemo(() => {
    return {
      ids: chequeStatusesUIContext.ids,
      queryParams: chequeStatusesUIContext.queryParams,
      setQueryParams: chequeStatusesUIContext.setQueryParams,
      newChequeStatusButtonClick: chequeStatusesUIContext.newChequeStatusButtonClick,
      openDeleteChequeStatusesDialog: chequeStatusesUIContext.openDeleteChequeStatusesDialog,
      openEditChequeStatusPage: chequeStatusesUIContext.openEditChequeStatusPage,
      openUpdateChequeStatusesStatusDialog: chequeStatusesUIContext.openUpdateChequeStatusesStatusDialog,
      openFetchChequeStatusesDialog: chequeStatusesUIContext.openFetchChequeStatusesDialog,
    };
  }, [chequeStatusesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("ChequeStatus.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={chequeStatusesUIProps.newChequeStatusButtonClick}
          >
            {t("ChequeStatus.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ChequeStatusesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ChequeStatusesUIConsumer>
        <ChequeStatusesTable />
      </CardBody>
    </Card>
  );
}