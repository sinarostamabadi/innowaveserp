
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { SetPricingTable } from "./setPricing-table/SetPricingTable";
import { useSetPricingUIContext, SetPricingUIConsumer } from "./SetPricingUIContext";
import { useTranslation } from 'react-i18next';

export function SetPricingCard() {
  const { t } = useTranslation();

  const setPricingUIContext = useSetPricingUIContext();
 
  const setPricingUIProps = useMemo(() => {
    return {
      ids: setPricingUIContext.ids,
      queryParams: setPricingUIContext.queryParams,
      setQueryParams: setPricingUIContext.setQueryParams,
      newSetPricingButtonClick: setPricingUIContext.newSetPricingButtonClick,
      openDeleteSetPricingDialog: setPricingUIContext.openDeleteSetPricingDialog,
      openEditSetPricingPage: setPricingUIContext.openEditSetPricingPage,
      openUpdateSetPricingStatusDialog: setPricingUIContext.openUpdateSetPricingStatusDialog,
      openFetchSetPricingDialog: setPricingUIContext.openFetchSetPricingDialog,
    };
  }, [setPricingUIContext]);

  return (
    <Card>
      <CardHeader title={t("SetPricing.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={setPricingUIProps.newSetPricingButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SetPricingUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SetPricingUIConsumer>
        <SetPricingTable />
      </CardBody>
    </Card>
  );
}