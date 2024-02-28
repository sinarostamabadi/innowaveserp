import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { PaymentsTable } from "./payments-table/PaymentsTable";
import { usePaymentsUIContext, PaymentsUIConsumer } from "./PaymentsUIContext";
import { useTranslation } from "react-i18next";

export function PaymentsCard() {
  const { t } = useTranslation();

  const paymentsUIContext = usePaymentsUIContext();

  const paymentsUIProps = useMemo(() => {
    return {
      ids: paymentsUIContext.ids,
      queryParams: paymentsUIContext.queryParams,
      setQueryParams: paymentsUIContext.setQueryParams,
      newPaymentButtonClick: paymentsUIContext.newPaymentButtonClick,
      openDeletePaymentsDialog: paymentsUIContext.openDeletePaymentsDialog,
      openEditPaymentPage: paymentsUIContext.openEditPaymentPage,
      openUpdatePaymentsStatusDialog:
        paymentsUIContext.openUpdatePaymentsStatusDialog,
      openFetchPaymentsDialog: paymentsUIContext.openFetchPaymentsDialog,
    };
  }, [paymentsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Payment.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={paymentsUIProps.newPaymentButtonClick}
          >
            {t("Payment.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PaymentsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PaymentsUIConsumer>
        <PaymentsTable />
      </CardBody>
    </Card>
  );
}
