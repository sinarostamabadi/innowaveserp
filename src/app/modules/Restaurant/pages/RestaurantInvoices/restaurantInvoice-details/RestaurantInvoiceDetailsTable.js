// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { ActionsColumnFormatter } from "./column-formatters/index";
import { CheckboxField } from "../../../../../../core/_partials/controls";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  getStorage,
} from "../../../../../../core/_helpers";
import { useRestaurantInvoiceDetailsUIContext } from "./RestaurantInvoiceDetailsUIContext";
import { useTranslation } from "react-i18next";
import {
  InputGroup,
  Button,
  FormControl,
  Row,
  Col,
  Form as RForm,
} from "react-bootstrap";
import {
  Input,
  Select,
  DatePickerField,
  SuggestionField,
} from "../../../../../../core/_partials/controls";
import { RestaurantInvoiceDetailDeleteDialog } from "./RestaurantInvoiceDetailDeleteDialog";
import { suggestionMenuItem } from "../../../_redux/RestaurantMenuItems/RestaurantMenuItemsCrud";
import { MoneyColumnFormatter } from "../../../../../../core/_formatters";

export function RestaurantInvoiceDetailsTable() {
  const { t } = useTranslation();
  const defaultInput = useRef(null);
  const defaultRestaurant = !!getStorage("defaultRestaurant")
    ? JSON.parse(getStorage("defaultRestaurant"))
    : null;

  const [isReward, setIsReward] = useState(false);
  const [barcode, setBarcode] = useState(true);
  const [detailsModel, setDetailsModel] = useState({
    RestaurantMenuItemId: null,
    Count: 1,
    IsReward: false,
  });
  // Specs UI Context
  const restaurantInvoiceDetailsUIContext =
    useRestaurantInvoiceDetailsUIContext();
  const restaurantInvoiceDetailsUIProps = useMemo(() => {
    return {
      restaurantInvoiceDetails:
        restaurantInvoiceDetailsUIContext.restaurantInvoiceDetails,
      addRestaurantInvoiceDetail:
        restaurantInvoiceDetailsUIContext.addRestaurantInvoiceDetail,
      totalCount: restaurantInvoiceDetailsUIContext.totalCount,
      actionsLoading: restaurantInvoiceDetailsUIContext.actionsLoading,
      openEditDetailDialog:
        restaurantInvoiceDetailsUIContext.openEditDetailDialog,
      openDeleteDetailDialog:
        restaurantInvoiceDetailsUIContext.openDeleteDetailDialog,
      masterSave: restaurantInvoiceDetailsUIContext.masterSave,
      setIds: restaurantInvoiceDetailsUIContext.setIds,
      personId: restaurantInvoiceDetailsUIContext.personId,
      invoiceDate: restaurantInvoiceDetailsUIContext.invoiceDate,
    };
  }, [restaurantInvoiceDetailsUIContext]);

  const columns = [
    {
      dataField: "RestaurantMenuItem.NameFa",
      text: t("RestaurantMenuItem.Entity"),
      sort: false,
    },
    {
      dataField: "UnitPrice",
      text: t("RestaurantInvoiceDetail.UnitPrice"),
      sort: false,
      formatter: MoneyColumnFormatter,
    },
    {
      dataField: "Price",
      text: t("RestaurantInvoiceDetail.Price"),
      sort: false,
      formatter: MoneyColumnFormatter,
    },
    {
      dataField: "RestaurantDiscountType.DiscountPercent",
      text: t("RestaurantInvoiceDetail.DiscountPercent"),
      sort: false,
    },
    {
      dataField: "Count",
      text: t("RestaurantInvoiceDetail.Count"),
      sort: false,
    },
    {
      dataField: "PayablePrice",
      text: t("RestaurantInvoiceDetail.PayablePrice"),
      sort: false,
      formatter: MoneyColumnFormatter,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditDetailDialog:
          restaurantInvoiceDetailsUIProps.openEditDetailDialog,
        openDeleteDetailDialog:
          restaurantInvoiceDetailsUIProps.openDeleteDetailDialog,
        t: t,
      },
      classes: "text-right pl-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  const handleSuggestionPerson = useCallback((query, fnCallback) => {
    axios
      .post("RestaurantMenuItem/get", {
        Filters: [
          { Property: "NameFa", Operation: 7, Values: [query] },
          {
            Property: "RestaurantId",
            Operation: 5,
            Values: [defaultRestaurant.RestaurantId],
          },
        ],
        OrderBy: "NameFa asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  let textInput = null;
  const addMenuItem = useCallback((values) => {
    console.log("values > ", values);
    setDetailsModel(values);

    axios
      .post("RestaurantInvoiceDtl/getPrice", {
        RestaurantId: +defaultRestaurant.RestaurantId,
        RestaurantMenuItemId:
          values.RestaurantMenuItemId[0].RestaurantMenuItemId,
        PersonId: restaurantInvoiceDetailsUIProps.personId,
        ExecutionDate: restaurantInvoiceDetailsUIProps.invoiceDate,
        Count: +values.Count,
        IsReward: values.IsReward,
      })
      .then(({ data }) => {
        restaurantInvoiceDetailsUIProps.addRestaurantInvoiceDetail({
          ...data,
          Count: +values.Count,
          IsReward: values.IsReward,
        });
      });
  });

  const addMenuItemBarcode = (e) => {
    if (e.key == "Enter" && !isNaN(e.target.value) && e.target.value != 9999) {
      suggestionMenuItem(e.target.value + "").then((res) => {
        if (!!res.data.Items && res.data.Items.length > 0) {
          console.log("isReward >> ", isReward);
          addMenuItem({
            RestaurantMenuItemId: [
              {
                RestaurantMenuItemId: res.data.Items[0].RestaurantMenuItemId,
              },
            ],
            Count: 1, //+detailsModel.Count,
            IsReward: isReward,
          });

          setDetailsModel({
            RestaurantMenuItemId: null,
            Count: 1,
            IsReward: isReward,
          });

          !!defaultInput &&
            !!defaultInput.current &&
            defaultInput.current.focus();
        }
      });

      return;
    } else if (
      e.keyCode == 13 &&
      !isNaN(e.target.value) &&
      e.target.value == 9999
    ) {
      restaurantInvoiceDetailsUIProps.masterSave();
      (function (event) {
        //event.target.value = "";
        event.target.select();
      })(e);
    }
  };

  return (
    <div
      style={{
        borderTop: "1px solid rgb(236, 240, 243)",
        paddingTop: "1rem",
      }}
    >
      <RestaurantInvoiceDetailDeleteDialog />
      {/* <PhoneDeleteDialog /> */}
      <Row className="mb-2">
        <Col xs="auto">
          <div style={{ paddingTop: "10px" }}>
            <input type="checkbox" style={{ display: "none" }} />
            <label className="checkbox checkbox-lg checkbox-single">
              <input
                type="checkbox"
                checked={barcode}
                onChange={(val) => setBarcode(val.target.checked)}
              />
              <span />
            </label>
            <label
              style={{
                display: "block",
                marginTop: "-26px",
                marginRight: "30px",
              }}
            >
              With barcode
            </label>
          </div>
        </Col>
        {!!barcode == false ? (
          <Col>
            <Formik
              key="DetailTable"
              id="DetailTable"
              name="DetailTable"
              enableReinitialize={true}
              initialValues={detailsModel}
              onSubmit={(values) => {
                addMenuItem(values);
              }}
            >
              {({ handleSubmit }) => (
                <Form className="form form-label-right">
                  <Row>
                    <Col xs="auto">
                      <CheckboxField
                        name="IsReward"
                        onChange={(val) => setIsReward(val)}
                        inline={true}
                        customFeedbackLabel=""
                        label={t("RestaurantInvoiceDetail.IsReward")}
                      />
                    </Col>
                    <Col>
                      <SuggestionField
                        key="RestaurantMenuItemId"
                        name="RestaurantMenuItemId"
                        id="RestaurantMenuItemId"
                        labelKey="NameFa"
                        searchIcon={false}
                        customFeedbackLabel=""
                        // label={t("RestaurantMenuItem.Entity")}
                        placeHolder={t("msg.SelectBySuggestion")}
                        aria-describedby="basic-addon1"
                        handleSearch={handleSuggestionPerson}
                        ref={(input) => {
                          textInput = input;
                        }}
                        renderMenuItemChildren={(option, props) => (
                          <div>
                            <h6>{option.NameFa}</h6>
                            <span>
                              {t("RestaurantMenuItem.RestaurantMenuGroup")}:{" "}
                              {option.RestaurantMenuGroup.Title}
                            </span>
                            <br />
                            <span>
                              {t("RestaurantMenuItem.PlaceOfPreparation")}:{" "}
                              {option.PlaceOfPreparation.Title}
                            </span>
                          </div>
                        )}
                      />
                    </Col>
                    <Col xs="auto">
                      <Field
                        name="Count"
                        component={Input}
                        type="number"
                        customFeedbackLabel=""
                        // label={t("RestaurantInvoiceDetail.Count")}
                        placeholder={t("RestaurantInvoiceDetail.Count")}
                      />
                    </Col>
                    <Col xs="auto">
                      <button
                        className="btn btn-outline-secondary"
                        type="submit"
                        onSubmit={() => handleSubmit()}
                      >
                        <i className="fas fa-plus text-success"></i>
                      </button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        ) : (
          <Col>
            <Formik
              key="DetailTable"
              id="DetailTable"
              name="DetailTable"
              enableReinitialize={true}
              initialValues={detailsModel}
              onSubmit={(values) => {
                addMenuItemBarcode(values);
              }}
            >
              {({ handleSubmit }) => (
                <Form className="form form-label-right">
                  <Row>
                    <Col xs="auto">
                      <CheckboxField
                        name="IsReward"
                        customFeedbackLabel=""
                        onChange={(val) => setIsReward(val)}
                        inline={true}
                        label={t("RestaurantInvoiceDetail.IsReward")}
                      />
                    </Col>
                    <Col>
                      <Field
                        name="RestaurantMenuItemId"
                        component={Input}
                        type="number"
                        customFeedbackLabel=""
                        setref={defaultInput}
                        // label={t("RestaurantMenuItem.Entity")}
                        onKeyPress={addMenuItemBarcode}
                      />
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        )}
      </Row>
      <BootstrapTable
        wrapperClasses="table-responsive"
        classes="table table-head-custom table-vertical-center"
        bordered={true}
        bootstrap4
        remote
        keyField="RestaurantInvoiceDtlId"
        data={
          restaurantInvoiceDetailsUIProps.restaurantInvoiceDetails === null
            ? []
            : restaurantInvoiceDetailsUIProps.restaurantInvoiceDetails
        }
        columns={columns}
      >
        <PleaseWaitMessage
          entities={restaurantInvoiceDetailsUIProps.restaurantInvoiceDetails}
        />
        <NoRecordsFoundMessage
          entities={restaurantInvoiceDetailsUIProps.restaurantInvoiceDetails}
        />
      </BootstrapTable>
    </div>
  );
}
