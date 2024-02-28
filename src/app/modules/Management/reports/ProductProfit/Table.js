import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../core/_helpers";
import * as columnFormatters from "./ActionsColumnFormatter";
import { useProductLifeCycleContext } from "./Context";
import { ProductLifeCycleModel } from "../../../../../core/_models/Report/ProductLifeCycleModel";
import {
  getConfig,
  getFields,
} from "../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import {
  MoneyColumnFormatter,
  NumberCommaSeparateFormatter,
} from "../../../../../core/_formatters";

export function Table() {
  const { t } = useTranslation();
  const context = useProductLifeCycleContext();

  const uiProps = useMemo(() => {
    return {
      items: context.items,
      gotoEditBuy: context.gotoEditBuy,
      gotoEditAssignment: context.gotoEditAssignment,
      gotoEditSellPricing: context.gotoEditSellPricing,
      gotoEditReceipt: context.gotoEditReceipt,
      gotoEditSellDiscount: context.gotoEditSellDiscount,
    };
  }, [context]);

  const configs = getConfig(ProductLifeCycleModel);
  const fieldKey = getFields(ProductLifeCycleModel);
  const fields = ProductLifeCycleModel;

  const columns = [
    {
      dataField: fieldKey.EntityTypeTitle,
      text: t("Reports.ProductLifeCycle." + fields.EntityTypeTitle.display),
    },
    {
      dataField: fieldKey.Id,
      text: t("Reports.ProductLifeCycle." + fields.Id.display),
    },
    {
      dataField: fieldKey.Title,
      text: t("Reports.ProductLifeCycle." + fields.Title.display),
    },
    {
      dataField: fieldKey.Amount,
      text: t("Reports.ProductLifeCycle." + fields.Amount.display),
      formatter: NumberCommaSeparateFormatter,
    },
    {
      dataField: fieldKey.Price,
      text: t("Reports.ProductLifeCycle." + fields.Price.display),
      formatter: MoneyColumnFormatter,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        gotoEditBuy: uiProps.gotoEditBuy,
        gotoEditAssignment: uiProps.gotoEditAssignment,
        gotoEditSellPricing: uiProps.gotoEditSellPricing,
        gotoEditReceipt: uiProps.gotoEditReceipt,
        gotoEditSellDiscount: uiProps.gotoEditSellDiscount,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  return (
    <BootstrapTable
      wrapperClasses="table-responsive"
      classes="table table-head-custom table-vertical-center"
      bootstrap4
      bordered={false}
      remote
      keyField={configs.id}
      data={uiProps.items === null ? [] : uiProps.items}
      columns={columns}
    >
      <PleaseWaitMessage entities={uiProps.items} />
      <NoRecordsFoundMessage entities={uiProps.items} />
    </BootstrapTable>
  );
}
