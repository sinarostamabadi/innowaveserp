import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  createRef,
  useRef,
} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Row, Col } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import { DetailAmountColumnFormatter } from "./column-formatters/DetailAmountColumnFormatter";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../core/_helpers";
import { useDetailsUIContext } from "./DetailsUIContext";
import {
  MoneyColumnFormatter,
  RowIndexColumnFormatter,
} from "../../../../../../core/_formatters";
import { suggestProduct } from "../../../../Warehouse/_redux/products/productsCrud";
import {
  getByProduct,
  getByProductCodeUnit,
} from "../../../../Warehouse/_redux/productUnits/productUnitsCrud";
//import { suggestProduct } from "../../../../Sell/_redux/sellPricing/sellPricingCrud";
import {
  Input,
  Select,
  SuggestionField,
} from "../../../../../../core/_partials/controls";

export function DetailsTable() {
  const { t } = useTranslation();
  // const defaultInput = useRef(null);
  const defaultInput = createRef();

  useEffect(() => {
    !!defaultInput.current && defaultInput.current.focus();
  }, [defaultInput]);

  const context = useDetailsUIContext();
  const [hasError, setHasError] = useState(false);
  const [lastProduct, setLastProduct] = useState(false);
  const [barcode, setBarcode] = useState(true);
  const [detailsModel, setDetailsModel] = useState({
    ProductId: null,
    Count: 1,
  });

  const uiProps = useMemo(() => {
    return {
      selectedId: context.selectedId,
      setSelectedId: context.setSelectedId,
      sellDocument: context.sellDocument,
      details: context.details,
      activeDetails: context.activeDetails,
      openEditDetailDialog: context.openEditDetailDialog,
      openSerialDetailDialog: context.openSerialDetailDialog,
      openDeleteDetailDialog: context.openDeleteDetailDialog,
      addDetail: context.addDetail,
      updateDetail: context.updateDetail,
      removeDetail: context.removeDetail,
    };
  }, [context]);

  const columns = [
    {
      dataField: "SellDocumentDetailId",
      text: "#",
      sort: false,
      formatter: RowIndexColumnFormatter,
      style: {
        width: "30px",
        minWidth: "30px",
      },
    },
    {
      dataField: "ProductName",
      text: t("SellDocumentDetail.Product"),
      sort: false,
    },
    {
      dataField: "UnitName",
      text: t("SellDocumentDetail.ProductUnit"),
      sort: false,
    },
    {
      dataField: "Amount",
      text: t("SellDocumentDetail.Amount"),
      sort: false,
      formatter: DetailAmountColumnFormatter,
      formatExtraData: {
        t: t,
        selectedId: uiProps.selectedId,
        updateDetail: uiProps.updateDetail,
      },
    },
    {
      dataField: "PayablePrice",
      text: t("SellDocumentDetail.PayablePrice"),
      sort: false,
      formatter: MoneyColumnFormatter,
      formatExtraData: {
        t: t,
      },
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        t: t,
        selectedId: uiProps.selectedId,
        setSelectedId: uiProps.setSelectedId,
        updateDetail: uiProps.addDetail,
        removeDetail: uiProps.removeDetail,
        openDeleteDetailDialog: uiProps.openDeleteDetailDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  const handleSuggestionProduct = useCallback((query, fnCallback) => {
    suggestProduct(query).then(({ data }) => {
      fnCallback(data.Items);
    });
  });

  function addByBarcode(text) {
    if(!!text == false) {
      setLastProduct(null);
      return;
    }

    let barcode = text;
    let bars = ("" + barcode).split("-");
    let code = bars[0];
    let unit = bars[1] || "4";
    let amount = bars[2];
    let serial = bars[3];

    if(text[0] == 2){
      code = text.substring(1, 6);
      amount = text.substring(6, 9);
      amount = amount + "." + text.substring(9, 12);
      amount = +amount;
    }
    
    suggestProduct(code).then(({ data }) => {
    
      if(data.Items.length == 0)
        return;

      if(!!data.Items[0].SellPricingDetailId) {
        setHasError(false);
        setLastProduct(data.Items[0]);
      } else {
        setHasError(true);
        setLastProduct(data.Items[0]);

        return;
      }

      let temp = {
        SellDocumentId: uiProps.sellDocument.SellDocumentId,
        SellDocumentDetailId: null,
        ProductId: data.Items[0].ProductId,
        ProductUnitId: data.Items[0].BaseUnitId,
        Amount: amount || 1,
        IsDeleted: false,
        SellDocumentDetailSerials: [],
      };

      if (!!serial) temp.SellDocumentDetailSerials.push(serial);

      uiProps.addDetail(temp);
      setOptionList([]);
    });
    defaultInput.current.state.text = "";
  }

  function addDetail(detail) {
    if(!!detail.ProductId[0].SellPricingDetailId) {
      setHasError(false);
      setLastProduct(detail.ProductId[0]);
    } else {
      setHasError(true);
      setLastProduct(detail.ProductId[0]);

      return;
    }

    const temp = {
      SellDocumentId: uiProps.sellDocument.SellDocumentId,
      SellDocumentDetailId: null,
      ProductId: detail.ProductId[0].ProductId,
      ProductUnitId: detail.ProductId[0].BaseUnitId,
      Amount: 1,
      IsDeleted: false,
      SellDocumentDetailSerials: [],
    };

    uiProps.addDetail(temp);
    setOptionList([]);
  }

  const [optionList, setOptionList] = useState([]);
  const [textBarcode, setText] = useState("");
  const [resetingForm, setResetingForm] = useState(false);
  
  function resetFormHard() {
    setText("");

    setResetingForm(true);
    setTimeout(() => {
      setResetingForm(false);
    }, 100);
  }

  return (
    <>
      <Row style={{ height: "100%" }}>
        <Col>
          {!resetingForm && (
            <Formik
              key="BySuggestion"
              enableReinitialize={true}
              initialValues={{}}
              onSubmit={(values) => {
                addDetail(values);
                //saveDetail(cleanDetail(values));
                resetFormHard();
              }}
            >
              {({ handleSubmit }) => (
                <>
                  <SuggestionField
                    name="ProductId"
                    labelKey="Name"
                    customFeedbackLabel=""
                    setref={defaultInput}
                    placeHolder={t("msg.SelectBySuggestion")}
                    handleSearch={handleSuggestionProduct}
                    handleOnChange={(val) => handleSubmit()}
                    // onInputChange={(text, e) => {
                    //   setText(text);
                    //   handleSuggestionProduct(text, (items) => {
                    //     setOptionList(items);
                    //   });
                    // }}
                    // optionList={optionList}
                    onKeyPress={(e) => {
                      if (
                        e.keyCode == 13
                      ) {
                        addByBarcode(defaultInput.current.state.text);
                        // resetFormHard();
                      }
                    }}
                    renderMenuItemChildren={(option, props) => (
                      <div>
                        <h6>{option.Name}</h6>
                        <span>{option.Code}</span>
                      </div>
                    )}
                  />
                </>
              )}
            </Formik>
          )}
          {!hasError && !!lastProduct && (
            <div class="alert alert-success mt-3" role="alert">
              <Row>
                <Col md={12}><b>کالا: </b>{lastProduct.Name}</Col>
              </Row>
              <Row>
                <Col md={6}><b>کد: </b>{lastProduct.Code}</Col>
                <Col md={6}><b>گروه: </b>{lastProduct.ProductGroup?.Title}</Col>
              </Row>
              <Row>
                <Col md={6}><b>قیمت واحد: </b>قیمت‌گذاری نشده</Col>
                <Col md={6}><b>واحد شمارش: </b>{lastProduct.BaseUnit?.Name}</Col>
              </Row>
            </div>
          )}
          {hasError && !!lastProduct && (
            <div class="alert alert-danger mt-3" role="alert">
              <Row>
                <Col md={12}><b>کالا: </b>{lastProduct.Name}</Col>
              </Row>
              <Row>
                <Col md={6}><b>کد: </b>{lastProduct.Code}</Col>
                <Col md={6}><b>گروه: </b>{lastProduct.ProductGroup?.Title}</Col>
              </Row>
              <Row>
                <Col md={6}><b>قیمت واحد: </b>قیمت‌گذاری نشده</Col>
                <Col md={6}><b>واحد شمارش: </b>{lastProduct.BaseUnit?.Name}</Col>
              </Row>
            </div>
          )}
        </Col>
        <Col md={6} style={{ height: "100%", overflowY: "auto" }}>
          <BootstrapTable
            wrapperClasses="table-responsive"
            classes="table table-head-custom table-vertical-center"
            bordered={false}
            bootstrap4
            remote
            keyField="SellDocumentDetailId"
            data={uiProps.activeDetails}
            columns={columns}
          >
            <PleaseWaitMessage entities={uiProps.activeDetails} />
            <NoRecordsFoundMessage entities={uiProps.activeDetails} />
          </BootstrapTable>
        </Col>
      </Row>
    </>
  );
}
