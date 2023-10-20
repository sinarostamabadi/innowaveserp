import React, { createRef } from "react";
import { useTranslation } from "react-i18next";
import { Filter } from "./Filter";
import { Table } from "./Table";
import { ProductLifeCycleProvider, ProductLifeCycleConsumer } from "./Context";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";

export function ProductLifeCycle({ history }) {
  const { t } = useTranslation();

  const events = {
    gotoEditBuy: (id) => {
      history.push(`/PurchaseOrder/buys/${id}/edit`);
    },
    gotoEditAssignment: (id) => {
      history.push(`/warehouse/assignments/${id}/edit`);
    },
    gotoEditSellPricing: (id) => {
      history.push(`/Sell/sellPricings/${id}/edit`);
    },
    gotoEditReceipt: (id) => {
      history.push(`/warehouse/receipts/${id}/edit`);
    },
    gotoEditSellDiscount: (id) => {
      history.push(`/Sell/sellDiscounts/${id}/edit`);
    },
  };

  const btnSearchRef = createRef("1");
  const searchClick = () => {
    if (btnSearchRef && btnSearchRef.current) {
      btnSearchRef.current.Search();
    }
  };

  return (
    <ProductLifeCycleProvider events={events}>
      <Card>
        <CardHeader
          title={
            t("Common.Report") + " " + t("Reports.ProductLifeCycle.Report")
          }
        >
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={searchClick}
            >
              <i class="fas fa-search"></i> {t("Common.Search")}
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <Filter ref={btnSearchRef} />
          <Table />
        </CardBody>
      </Card>
    </ProductLifeCycleProvider>
  );
}
