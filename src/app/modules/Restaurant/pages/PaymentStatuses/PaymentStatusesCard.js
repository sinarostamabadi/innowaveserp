
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { PaymentStatusesTable } from "./paymentStatuses-table/PaymentStatusesTable";
import { usePaymentStatusesUIContext, PaymentStatusesUIConsumer } from "./PaymentStatusesUIContext";
import { useTranslation } from 'react-i18next';

export function PaymentStatusesCard() {
  const { t } = useTranslation();

  const paymentStatusesUIContext = usePaymentStatusesUIContext();

  const paymentStatusesUIProps = useMemo(() => {
    return {
      ids: paymentStatusesUIContext.ids,
      queryParams: paymentStatusesUIContext.queryParams,
      setQueryParams: paymentStatusesUIContext.setQueryParams,
      newPaymentStatusButtonClick: paymentStatusesUIContext.newPaymentStatusButtonClick,
      openDeletePaymentStatusesDialog: paymentStatusesUIContext.openDeletePaymentStatusesDialog,
      openEditPaymentStatusPage: paymentStatusesUIContext.openEditPaymentStatusPage,
      openUpdatePaymentStatusesStatusDialog: paymentStatusesUIContext.openUpdatePaymentStatusesStatusDialog,
      openFetchPaymentStatusesDialog: paymentStatusesUIContext.openFetchPaymentStatusesDialog,
    };
  }, [paymentStatusesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("PaymentStatus.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={paymentStatusesUIProps.newPaymentStatusButtonClick}
          >
            {t("PaymentStatus.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PaymentStatusesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PaymentStatusesUIConsumer>
        <PaymentStatusesTable />
      </CardBody>
    </Card>
  );
}