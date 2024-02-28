import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CodingTable } from "./coding-table/CodingTable";
import { useCodingUIContext, CodingUIConsumer } from "./CodingUIContext";
import { useTranslation } from "react-i18next";

export function CodingCard() {
  const { t } = useTranslation();

  const codingUIContext = useCodingUIContext();

  const codingUIProps = useMemo(() => {
    return {
      ids: codingUIContext.ids,
      queryParams: codingUIContext.queryParams,
      setQueryParams: codingUIContext.setQueryParams,
      newCodingButtonClick: codingUIContext.newCodingButtonClick,
      openDeleteCodingDialog: codingUIContext.openDeleteCodingDialog,
      openEditCodingPage: codingUIContext.openEditCodingPage,
      openUpdateCodingStatusDialog:
        codingUIContext.openUpdateCodingStatusDialog,
      openFetchCodingDialog: codingUIContext.openFetchCodingDialog,
    };
  }, [codingUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Coding.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={codingUIProps.newCodingButtonClick}
          >
            {t("Coding.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CodingUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CodingUIConsumer>
        <CodingTable />
      </CardBody>
    </Card>
  );
}
