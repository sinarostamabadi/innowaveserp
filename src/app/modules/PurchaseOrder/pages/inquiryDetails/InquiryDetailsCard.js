
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { InquiryDetailsTable } from "./inquiryDetails-table/InquiryDetailsTable";
import { useInquiryDetailsUIContext, InquiryDetailsUIConsumer } from "./InquiryDetailsUIContext";
import { useTranslation } from 'react-i18next';

export function InquiryDetailsCard() {
  const { t } = useTranslation();

  const inquiryDetailsUIContext = useInquiryDetailsUIContext();

  const inquiryDetailsUIProps = useMemo(() => {
    return {
      ids: inquiryDetailsUIContext.ids,
      queryParams: inquiryDetailsUIContext.queryParams,
      setQueryParams: inquiryDetailsUIContext.setQueryParams,
      newInquiryDetailButtonClick: inquiryDetailsUIContext.newInquiryDetailButtonClick,
      openDeleteInquiryDetailsDialog: inquiryDetailsUIContext.openDeleteInquiryDetailsDialog,
      openEditInquiryDetailPage: inquiryDetailsUIContext.openEditInquiryDetailPage,
      openUpdateInquiryDetailsStatusDialog: inquiryDetailsUIContext.openUpdateInquiryDetailsStatusDialog,
      openFetchInquiryDetailsDialog: inquiryDetailsUIContext.openFetchInquiryDetailsDialog,
    };
  }, [inquiryDetailsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("InquiryDetail.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={inquiryDetailsUIProps.newInquiryDetailButtonClick}
          >
            {t("InquiryDetail.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <InquiryDetailsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </InquiryDetailsUIConsumer>
        <InquiryDetailsTable />
      </CardBody>
    </Card>
  );
}