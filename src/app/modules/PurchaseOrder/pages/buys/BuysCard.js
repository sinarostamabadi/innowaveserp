
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BuysTable } from "./buys-table/BuysTable";
import { useBuysUIContext, BuysUIConsumer } from "./BuysUIContext";
import { useTranslation } from 'react-i18next';

export function BuysCard() {
  const { t } = useTranslation();

  const buysUIContext = useBuysUIContext();

  const buysUIProps = useMemo(() => {
    return {
      ids: buysUIContext.ids,
      queryParams: buysUIContext.queryParams,
      setQueryParams: buysUIContext.setQueryParams,
      newBuyButtonClick: buysUIContext.newBuyButtonClick,
      openDeleteBuysDialog: buysUIContext.openDeleteBuysDialog,
      openEditBuyPage: buysUIContext.openEditBuyPage,
      openUpdateBuysStatusDialog: buysUIContext.openUpdateBuysStatusDialog,
      openFetchBuysDialog: buysUIContext.openFetchBuysDialog,
    };
  }, [buysUIContext]);

  return (
    <Card>
      <CardHeader title={t("Buy.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={buysUIProps.newBuyButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BuysUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BuysUIConsumer>
        <BuysTable />
      </CardBody>
    </Card>
  );
}