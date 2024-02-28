import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BankAccountsTable } from "./bankAccounts-table/BankAccountsTable";
import {
  useBankAccountsUIContext,
  BankAccountsUIConsumer,
} from "./BankAccountsUIContext";
import { useTranslation } from "react-i18next";

export function BankAccountsCard() {
  const { t } = useTranslation();

  const uiContext = useBankAccountsUIContext();
  const uiProps = useMemo(() => {
    return {
      new: uiContext.newBankAccountButtonClick,
    };
  }, [uiContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("BankAccount.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={uiProps.new}
          >
            <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BankAccountsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BankAccountsUIConsumer>
        <BankAccountsTable />
      </CardBody>
    </Card>
  );
}
