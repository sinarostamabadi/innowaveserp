import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/coffeeInvoiceDiscounts/coffeeInvoiceDiscountsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCoffeeInvoiceDiscountsUIContext } from "../CoffeeInvoiceDiscountsUIContext";
import { CoffeeInvoiceDiscountModel } from "../../../../../../core/_models/Cofe/CoffeeInvoiceDiscountModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CoffeeInvoiceDiscountsTable() {
  const { t } = useTranslation();

  const coffeeInvoiceDiscountsUIContext = useCoffeeInvoiceDiscountsUIContext();

  const coffeeInvoiceDiscountsUIProps = useMemo(() => {
    return {
      ids: coffeeInvoiceDiscountsUIContext.ids,
      setIds: coffeeInvoiceDiscountsUIContext.setIds,
      queryParams: coffeeInvoiceDiscountsUIContext.queryParams,
      setQueryParams: coffeeInvoiceDiscountsUIContext.setQueryParams,
      openEditCoffeeInvoiceDiscountPage: coffeeInvoiceDiscountsUIContext.openEditCoffeeInvoiceDiscountPage,
      openDeleteCoffeeInvoiceDiscountDialog: coffeeInvoiceDiscountsUIContext.openDeleteCoffeeInvoiceDiscountDialog,
    };
  }, [coffeeInvoiceDiscountsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.coffeeInvoiceDiscounts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CoffeeInvoiceDiscountModel);
  const fieldKey = getFields(CoffeeInvoiceDiscountModel);
  const fields = CoffeeInvoiceDiscountModel;

  const dispatch = useDispatch();
  useEffect(() => {
    coffeeInvoiceDiscountsUIProps.setIds([]);
    dispatch(actions.fetchCoffeeInvoiceDiscounts(coffeeInvoiceDiscountsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffeeInvoiceDiscountsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("CoffeeInvoiceDiscount." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("CoffeeInvoiceDiscount." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCoffeeInvoiceDiscountPage: coffeeInvoiceDiscountsUIProps.openEditCoffeeInvoiceDiscountPage,
        openDeleteCoffeeInvoiceDiscountDialog: coffeeInvoiceDiscountsUIProps.openDeleteCoffeeInvoiceDiscountDialog,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: configs.sizePerPageList,
    sizePerPage: coffeeInvoiceDiscountsUIProps.queryParams.PageSize,
    page: coffeeInvoiceDiscountsUIProps.queryParams.PageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center"
                bootstrap4
                bordered={false}
                remote
                keyField={configs.id}
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={configs.defaultSorted}
                onTableChange={getHandlerTableChange(
                  coffeeInvoiceDiscountsUIProps.setQueryParams
                )}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}