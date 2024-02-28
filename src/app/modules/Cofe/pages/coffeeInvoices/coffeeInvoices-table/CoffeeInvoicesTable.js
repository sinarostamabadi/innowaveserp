import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/coffeeInvoices/coffeeInvoicesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCoffeeInvoicesUIContext } from "../CoffeeInvoicesUIContext";
import { CoffeeInvoiceModel } from "../../../../../../core/_models/Cofe/CoffeeInvoiceModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CoffeeInvoicesTable() {
  const { t } = useTranslation();

  const coffeeInvoicesUIContext = useCoffeeInvoicesUIContext();

  const coffeeInvoicesUIProps = useMemo(() => {
    return {
      ids: coffeeInvoicesUIContext.ids,
      setIds: coffeeInvoicesUIContext.setIds,
      queryParams: coffeeInvoicesUIContext.queryParams,
      setQueryParams: coffeeInvoicesUIContext.setQueryParams,
      openEditCoffeeInvoicePage:
        coffeeInvoicesUIContext.openEditCoffeeInvoicePage,
      openDeleteCoffeeInvoiceDialog:
        coffeeInvoicesUIContext.openDeleteCoffeeInvoiceDialog,
    };
  }, [coffeeInvoicesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.coffeeInvoices }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CoffeeInvoiceModel);
  const fieldKey = getFields(CoffeeInvoiceModel);
  const fields = CoffeeInvoiceModel;

  const dispatch = useDispatch();
  useEffect(() => {
    coffeeInvoicesUIProps.setIds([]);
    dispatch(actions.fetchCoffeeInvoices(coffeeInvoicesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffeeInvoicesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("CoffeeInvoice." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("CoffeeInvoice." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCoffeeInvoicePage:
          coffeeInvoicesUIProps.openEditCoffeeInvoicePage,
        openDeleteCoffeeInvoiceDialog:
          coffeeInvoicesUIProps.openDeleteCoffeeInvoiceDialog,
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
    sizePerPage: coffeeInvoicesUIProps.queryParams.PageSize,
    page: coffeeInvoicesUIProps.queryParams.PageNumber,
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
                  coffeeInvoicesUIProps.setQueryParams
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
