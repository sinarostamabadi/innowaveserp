
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "src/core/_partials/controls";
import { AdvancedFilter } from "src/core/_partials/custom/advanced-filter/AdvancedFilter";
import { BankCardsTable } from "./bankCards-table/BankCardsTable";
import { useBankCardsUIContext, BankCardsUIConsumer } from "./BankCardsUIContext";
import { useTranslation } from 'react-i18next';

export function BankCardsCard() {
  const { t } = useTranslation();

  const bankCardsUIContext = useBankCardsUIContext();

  const bankCardsUIProps = useMemo(() => {
    return {
      ids: bankCardsUIContext.ids,
      queryParams: bankCardsUIContext.queryParams,
      setQueryParams: bankCardsUIContext.setQueryParams,
      newBankCardButtonClick: bankCardsUIContext.newBankCardButtonClick,
      openDeleteBankCardsDialog: bankCardsUIContext.openDeleteBankCardsDialog,
      openEditBankCardPage: bankCardsUIContext.openEditBankCardPage,
      openUpdateBankCardsStatusDialog: bankCardsUIContext.openUpdateBankCardsStatusDialog,
      openFetchBankCardsDialog: bankCardsUIContext.openFetchBankCardsDialog,
    };
  }, [bankCardsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("BankCard.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={bankCardsUIProps.newBankCardButtonClick}
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BankCardsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BankCardsUIConsumer>
        <BankCardsTable />
      </CardBody>
    </Card>
  );
}