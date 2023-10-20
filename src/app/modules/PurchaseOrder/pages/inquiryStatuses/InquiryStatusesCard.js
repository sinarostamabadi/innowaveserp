
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { InquiryStatusesTable } from "./inquiryStatuses-table/InquiryStatusesTable";
import { useInquiryStatusesUIContext, InquiryStatusesUIConsumer } from "./InquiryStatusesUIContext";
import { useTranslation } from 'react-i18next';

export function InquiryStatusesCard() {
  const { t } = useTranslation();

  const inquiryStatusesUIContext = useInquiryStatusesUIContext();

  const inquiryStatusesUIProps = useMemo(() => {
    return {
      ids: inquiryStatusesUIContext.ids,
      queryParams: inquiryStatusesUIContext.queryParams,
      setQueryParams: inquiryStatusesUIContext.setQueryParams,
      newInquiryStatusButtonClick: inquiryStatusesUIContext.newInquiryStatusButtonClick,
      openDeleteInquiryStatusesDialog: inquiryStatusesUIContext.openDeleteInquiryStatusesDialog,
      openEditInquiryStatusPage: inquiryStatusesUIContext.openEditInquiryStatusPage,
      openUpdateInquiryStatusesStatusDialog: inquiryStatusesUIContext.openUpdateInquiryStatusesStatusDialog,
      openFetchInquiryStatusesDialog: inquiryStatusesUIContext.openFetchInquiryStatusesDialog,
    };
  }, [inquiryStatusesUIContext]);

  return (
    <Card>
      <CardHeader title={t("InquiryStatus.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={inquiryStatusesUIProps.newInquiryStatusButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <InquiryStatusesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </InquiryStatusesUIConsumer>
        <InquiryStatusesTable />
      </CardBody>
    </Card>
  );
}