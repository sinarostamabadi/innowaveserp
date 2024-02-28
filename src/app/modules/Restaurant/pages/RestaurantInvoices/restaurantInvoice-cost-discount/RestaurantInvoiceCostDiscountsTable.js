// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { ActionsColumnFormatter } from "./column-formatters/index";
import { Pagination } from "../../../../../../core/_partials/controls";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import { useRestaurantInvoiceCostDiscountsUIContext } from "./RestaurantInvoiceCostDiscountsUIContext";
import { useTranslation } from "react-i18next";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import {
  Input,
  Select,
  DatePickerField,
  SuggestionField,
} from "../../../../../../core/_partials/controls";

export function RestaurantInvoiceCostDiscountsTable() {
  const { t } = useTranslation();

  const detailsmodel = {
    RestaurantMenuItemId: null,
  };
  // Specs UI Context
  const restaurantInvoiceCostDiscountsUIContext =
    useRestaurantInvoiceCostDiscountsUIContext();
  const costDiscountsUIProps = useMemo(() => {
    return {
      costDiscounts: restaurantInvoiceCostDiscountsUIContext.costDiscounts,
      addRestaurantInvoiceCostDiscount:
        restaurantInvoiceCostDiscountsUIContext.addRestaurantInvoiceCostDiscount,
      totalCount: restaurantInvoiceCostDiscountsUIContext.totalCount,
      actionsLoading: restaurantInvoiceCostDiscountsUIContext.actionsLoading,
      openEditPhoneDialog:
        restaurantInvoiceCostDiscountsUIContext.openEditPhoneDialog,
      openDeletePhoneDialog:
        restaurantInvoiceCostDiscountsUIContext.openDeletePhoneDialog,
      ids: restaurantInvoiceCostDiscountsUIContext.ids,
      setIds: restaurantInvoiceCostDiscountsUIContext.setIds,
      personId: restaurantInvoiceCostDiscountsUIContext.personId,
      invoiceDate: restaurantInvoiceCostDiscountsUIContext.invoiceDate,
    };
  }, [restaurantInvoiceCostDiscountsUIContext]);

  const columns = [
    {
      dataField: "Type.Title",
      text: t("Common.Type"),
      sort: false,
    },
    {
      dataField: "Type.Price",
      text: t("Common.Price"),
      sort: false,
    },
    {
      dataField: "Percent",
      text: t("Common.Percent"),
      sort: false,
    },
    {
      dataField: "Price",
      text: t("Common.Payable"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditPhoneDialog: costDiscountsUIProps.openEditPhoneDialog,
        openDeletePhoneDialog: costDiscountsUIProps.openDeletePhoneDialog,
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
        Filters: [{ Property: "NameFa", Operation: 7, Values: [query] }],
        OrderBy: "NameFa asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  const addMenuItem = useCallback((values) => {
    axios
      .post("RestaurantInvoiceDtl/getPrice", {
        RestaurantMenuItemId:
          values.RestaurantMenuItemId[0].RestaurantMenuItemId,
        PersonId: costDiscountsUIProps.personId,
        ExecutionDate: costDiscountsUIProps.invoiceDate,
      })
      .then(({ data }) => {
        costDiscountsUIProps.addRestaurantInvoiceCostDiscount(data);
      });
  });
  console.log("costDiscountsUIProps", costDiscountsUIProps);

  return (
    <div
      style={{
        borderTop: "1px solid rgb(236, 240, 243)",
        paddingTop: "1rem",
      }}
    >
      <Formik
        key="DetailTable"
        id="DetailTable"
        name="DetailTable"
        enableReinitialize={true}
        initialValues={detailsmodel}
        onSubmit={(values) => {
          addMenuItem(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form className="form form-label-right mb-3 text-right">
            <Button variant="outline-success" className="mr-2">
              <i className="fas fa-donate"></i> افزودن هزینه
            </Button>
            <Button variant="outline-success">
              <i className="fas fa-tags"></i> افزودن تخفیف
            </Button>
          </Form>
        )}
      </Formik>
      <BootstrapTable
        wrapperClasses="table-responsive"
        classes="table table-head-custom table-vertical-center"
        bordered={true}
        bootstrap4
        remote
        keyField="PhoneId"
        sort={false}
        data={
          costDiscountsUIProps.costDiscounts === null
            ? []
            : costDiscountsUIProps.costDiscounts
        }
        columns={columns}
      >
        <PleaseWaitMessage entities={costDiscountsUIProps.costDiscounts} />
        <NoRecordsFoundMessage entities={costDiscountsUIProps.costDiscounts} />
      </BootstrapTable>
    </div>
  );
}
