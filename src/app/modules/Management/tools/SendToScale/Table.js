import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../core/_helpers";
import * as columnFormatters from "./ActionsColumnFormatter";
import { useSendToScaleContext } from "./Context";
import { SendToScaleModel } from "../../../../../core/_models/Report/SendToScaleModel";
import {
  getConfig,
  getFields,
} from "../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import { MoneyColumnFormatter, NumberCommaSeparateFormatter } from "../../../../../core/_formatters";

export function Table() {
  const { t } = useTranslation();
  const context = useSendToScaleContext();

  const uiProps = useMemo(() => {
    return {
      items: context.items,
      gotoSellPricing: context.gotoSellPricing,
    };
  }, [context]);

  const configs = getConfig(SendToScaleModel);
  const fieldKey = getFields(SendToScaleModel);
  const fields = SendToScaleModel;

  const columns = [
    {
      dataField: fieldKey.Code,
      text: t("Tools.SendToScale." + fields.Code.display),
    },
    {
      dataField: fieldKey.Name,
      text: t("Tools.SendToScale." + fields.Name.display),
    },
    {
      dataField: fieldKey.ScalesKeyNumber,
      text: t("Tools.SendToScale." + fields.ScalesKeyNumber.display),
    },
    {
      dataField: fieldKey.PayablePrice,
      text: t("Tools.SendToScale." + fields.PayablePrice.display),
      formatter: NumberCommaSeparateFormatter,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        gotoSellPricing: uiProps.gotoSellPricing,
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
