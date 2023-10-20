
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BankTransfersTable } from "./bankTransfers-table/BankTransfersTable";
import { useBankTransfersUIContext, BankTransfersUIConsumer } from "./BankTransfersUIContext";
import { useTranslation } from 'react-i18next';

export function BankTransfersCard() {
  const { t } = useTranslation();

  const bankTransfersUIContext = useBankTransfersUIContext();

  const bankTransfersUIProps = useMemo(() => {
    return {
      ids: bankTransfersUIContext.ids,
      queryParams: bankTransfersUIContext.queryParams,
      setQueryParams: bankTransfersUIContext.setQueryParams,
      newBankTransferButtonClick: bankTransfersUIContext.newBankTransferButtonClick,
      openDeleteBankTransfersDialog: bankTransfersUIContext.openDeleteBankTransfersDialog,
      openEditBankTransferPage: bankTransfersUIContext.openEditBankTransferPage,
      openUpdateBankTransfersStatusDialog: bankTransfersUIContext.openUpdateBankTransfersStatusDialog,
      openFetchBankTransfersDialog: bankTransfersUIContext.openFetchBankTransfersDialog,
    };
  }, [bankTransfersUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("BankTransfer.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={bankTransfersUIProps.newBankTransferButtonClick}
          >
            {t("BankTransfer.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BankTransfersUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BankTransfersUIConsumer>
        <BankTransfersTable />
      </CardBody>
    </Card>
  );
}