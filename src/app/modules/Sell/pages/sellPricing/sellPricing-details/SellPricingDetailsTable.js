import React, { useMemo, useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { useSellPricingDetailsUIContext } from "./SellPricingDetailsUIContext";
import { useTranslation } from "react-i18next";
import {
  CheckBoxFormatter,
  MoneyColumnFormatter,
  RowIndexColumnFormatter
} from "../../../../../../core/_formatters";
import { InputGroup } from "react-bootstrap";

export function SellPricingDetailsTable() {
  const { t } = useTranslation();
  const [filterText, setFilterText] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);

  const sellPricingDetailsUIContext = useSellPricingDetailsUIContext();
  const sellPricingDetailsUIProps = useMemo(() => {
    return {
      sellPricingDetails: sellPricingDetailsUIContext.sellPricingDetails,
      activeSellPricingDetails:
        sellPricingDetailsUIContext.activeSellPricingDetails,
      openEditSellPricingDetailDialog:
        sellPricingDetailsUIContext.openEditSellPricingDetailDialog,
      openSerialSellPricingDetailDialog:
        sellPricingDetailsUIContext.openSerialSellPricingDetailDialog,
      openDeleteSellPricingDetailDialog:
        sellPricingDetailsUIContext.openDeleteSellPricingDetailDialog,
    };
  }, [sellPricingDetailsUIContext]);

  useEffect(() => {
    setFilterProduct(
      sellPricingDetailsUIProps.activeSellPricingDetails.filter(
        (x) =>
          x.Product.Name.indexOf(filterText) > -1 ||
          x.Product.Code == filterText
      )
    );
    console.log("filterText > ", filterText);
    console.log(
      "setFilterProduct > ",
      sellPricingDetailsUIProps.activeSellPricingDetails.filter(
        (x) =>
          x.Product.Name.indexOf(filterText) > -1 ||
          x.Product.Code == filterText
      )
    );
  }, [filterText]);

  const columns = [
    {
      dataField: "SellPricingDetailId",
      text: "#",
      sort: false,
      formatter: RowIndexColumnFormatter,
      style: {
        width: "30px",
        minWidth: "30px",
      },
    },
    {
      dataField: "Product.Name",
      text: t("SellPricingDetail.Product"),
      sort: false,
    },
    {
      dataField: "Price",
      text: t("SellPricingDetail.Price"),
      sort: false,
      formatter: MoneyColumnFormatter,
    },
    {
      dataField: "PayablePrice",
      text: t("SellPricingDetail.PayablePrice"),
      sort: false,
      formatter: MoneyColumnFormatter,
    },
    {
      dataField: "IsAccepted",
      text: t("SellPricingDetail.IsAccepted"),
      sort: false,
      formatter: CheckBoxFormatter,
      formatExtraData: {
        t: t,
        positive: t("Common.Yes"),
        negetive: t("Common.No"),
      },
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditSellPricingDetailDialog:
          sellPricingDetailsUIProps.openEditSellPricingDetailDialog,
        openDeleteSellPricingDetailDialog:
          sellPricingDetailsUIProps.openDeleteSellPricingDetailDialog,
        t: t,
      },
      classes: "text-right",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-4">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon2">فیلتر کالا</InputGroup.Text>
            </InputGroup.Prepend>
            <input
              className="form-control"
              value={filterText}
              onChange={(val) => setFilterText(val.target.value)}
            />
          </InputGroup>
        </div>
      </div>
      <BootstrapTable
        wrapperClasses="table-responsive"
        classes="table table-head-custom table-vertical-center table-striped"
        bordered={false}
        bootstrap4
        remote
        keyField="SellPricingDetailId"
        data={
          filterText.length > 0
            ? filterProduct
            : sellPricingDetailsUIProps.activeSellPricingDetails === null
            ? []
            : sellPricingDetailsUIProps.activeSellPricingDetails
        }
        columns={columns}
      >
        <PleaseWaitMessage
          entities={
            filterText.length > 0
              ? filterProduct
              : sellPricingDetailsUIProps.activeSellPricingDetails
          }
        />
        <NoRecordsFoundMessage
          entities={
            filterText.length > 0
              ? filterProduct
              : sellPricingDetailsUIProps.activeSellPricingDetails
          }
        />
      </BootstrapTable>
    </>
  );
}
