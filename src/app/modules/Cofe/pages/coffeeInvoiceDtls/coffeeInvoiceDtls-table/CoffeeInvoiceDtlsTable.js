import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/coffeeInvoiceDtls/coffeeInvoiceDtlsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCoffeeInvoiceDtlsUIContext } from "../CoffeeInvoiceDtlsUIContext";
import { CoffeeInvoiceDtlModel } from "../../../../../../core/_models/Cofe/CoffeeInvoiceDtlModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CoffeeInvoiceDtlsTable() {
  const { t } = useTranslation();

  const coffeeInvoiceDtlsUIContext = useCoffeeInvoiceDtlsUIContext();

  const coffeeInvoiceDtlsUIProps = useMemo(() => {
    return {
      ids: coffeeInvoiceDtlsUIContext.ids,
      setIds: coffeeInvoiceDtlsUIContext.setIds,
      queryParams: coffeeInvoiceDtlsUIContext.queryParams,
      setQueryParams: coffeeInvoiceDtlsUIContext.setQueryParams,
      openEditCoffeeInvoiceDtlPage:
        coffeeInvoiceDtlsUIContext.openEditCoffeeInvoiceDtlPage,
      openDeleteCoffeeInvoiceDtlDialog:
        coffeeInvoiceDtlsUIContext.openDeleteCoffeeInvoiceDtlDialog,
    };
  }, [coffeeInvoiceDtlsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.coffeeInvoiceDtls }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CoffeeInvoiceDtlModel);
  const fieldKey = getFields(CoffeeInvoiceDtlModel);
  const fields = CoffeeInvoiceDtlModel;

  const dispatch = useDispatch();
  useEffect(() => {
    coffeeInvoiceDtlsUIProps.setIds([]);
    dispatch(
      actions.fetchCoffeeInvoiceDtls(coffeeInvoiceDtlsUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffeeInvoiceDtlsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("CoffeeInvoiceDtl." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("CoffeeInvoiceDtl." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCoffeeInvoiceDtlPage:
          coffeeInvoiceDtlsUIProps.openEditCoffeeInvoiceDtlPage,
        openDeleteCoffeeInvoiceDtlDialog:
          coffeeInvoiceDtlsUIProps.openDeleteCoffeeInvoiceDtlDialog,
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
    sizePerPage: coffeeInvoiceDtlsUIProps.queryParams.PageSize,
    page: coffeeInvoiceDtlsUIProps.queryParams.PageNumber,
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
                  coffeeInvoiceDtlsUIProps.setQueryParams
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
