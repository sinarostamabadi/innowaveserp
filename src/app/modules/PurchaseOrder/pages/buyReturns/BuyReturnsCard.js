
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BuyReturnsTable } from "./buyReturns-table/BuyReturnsTable";
import { useBuyReturnsUIContext, BuyReturnsUIConsumer } from "./BuyReturnsUIContext";
import { useTranslation } from 'react-i18next';

export function BuyReturnsCard() {
  const { t } = useTranslation();

  const buyReturnsUIContext = useBuyReturnsUIContext();

  const buyReturnsUIProps = useMemo(() => {
    return {
      ids: buyReturnsUIContext.ids,
      queryParams: buyReturnsUIContext.queryParams,
      setQueryParams: buyReturnsUIContext.setQueryParams,
      newBuyReturnButtonClick: buyReturnsUIContext.newBuyReturnButtonClick,
      openDeleteBuyReturnsDialog: buyReturnsUIContext.openDeleteBuyReturnsDialog,
      openEditBuyReturnPage: buyReturnsUIContext.openEditBuyReturnPage,
      openUpdateBuyReturnsStatusDialog: buyReturnsUIContext.openUpdateBuyReturnsStatusDialog,
      openFetchBuyReturnsDialog: buyReturnsUIContext.openFetchBuyReturnsDialog,
    };
  }, [buyReturnsUIContext]);

  return (
    <Card>
      <CardHeader title={t("BuyReturn.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={buyReturnsUIProps.newBuyReturnButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BuyReturnsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BuyReturnsUIConsumer>
        <BuyReturnsTable />
      </CardBody>
    </Card>
  );
}