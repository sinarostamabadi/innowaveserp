import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { InquiriesTable } from "./inquiries-table/InquiriesTable";
import {
  useInquiriesUIContext,
  InquiriesUIConsumer,
} from "./InquiriesUIContext";
import { useTranslation } from "react-i18next";

export function InquiriesCard() {
  const { t } = useTranslation();

  const inquiriesUIContext = useInquiriesUIContext();

  const inquiriesUIProps = useMemo(() => {
    return {
      ids: inquiriesUIContext.ids,
      queryParams: inquiriesUIContext.queryParams,
      setQueryParams: inquiriesUIContext.setQueryParams,
      newInquiryButtonClick: inquiriesUIContext.newInquiryButtonClick,
      openDeleteInquiriesDialog: inquiriesUIContext.openDeleteInquiriesDialog,
      openEditInquiryPage: inquiriesUIContext.openEditInquiryPage,
      openUpdateInquiriesStatusDialog:
        inquiriesUIContext.openUpdateInquiriesStatusDialog,
      openFetchInquiriesDialog: inquiriesUIContext.openFetchInquiriesDialog,
    };
  }, [inquiriesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Inquiry.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={inquiriesUIProps.newInquiryButtonClick}
          >
            {t("Inquiry.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <InquiriesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </InquiriesUIConsumer>
        <InquiriesTable />
      </CardBody>
    </Card>
  );
}
