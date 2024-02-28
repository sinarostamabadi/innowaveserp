import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/coffeeInvoiceCosts/coffeeInvoiceCostsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCoffeeInvoiceCostsUIContext } from "../CoffeeInvoiceCostsUIContext";
import { CoffeeInvoiceCostModel } from "../../../../../../core/_models/Cofe/CoffeeInvoiceCostModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CoffeeInvoiceCostsTable() {
  const { t } = useTranslation();

  const coffeeInvoiceCostsUIContext = useCoffeeInvoiceCostsUIContext();

  const coffeeInvoiceCostsUIProps = useMemo(() => {
    return {
      ids: coffeeInvoiceCostsUIContext.ids,
      setIds: coffeeInvoiceCostsUIContext.setIds,
      queryParams: coffeeInvoiceCostsUIContext.queryParams,
      setQueryParams: coffeeInvoiceCostsUIContext.setQueryParams,
      openEditCoffeeInvoiceCostPage:
        coffeeInvoiceCostsUIContext.openEditCoffeeInvoiceCostPage,
      openDeleteCoffeeInvoiceCostDialog:
        coffeeInvoiceCostsUIContext.openDeleteCoffeeInvoiceCostDialog,
    };
  }, [coffeeInvoiceCostsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.coffeeInvoiceCosts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CoffeeInvoiceCostModel);
  const fieldKey = getFields(CoffeeInvoiceCostModel);
  const fields = CoffeeInvoiceCostModel;

  const dispatch = useDispatch();
  useEffect(() => {
    coffeeInvoiceCostsUIProps.setIds([]);
    dispatch(
      actions.fetchCoffeeInvoiceCosts(coffeeInvoiceCostsUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffeeInvoiceCostsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("CoffeeInvoiceCost." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("CoffeeInvoiceCost." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCoffeeInvoiceCostPage:
          coffeeInvoiceCostsUIProps.openEditCoffeeInvoiceCostPage,
        openDeleteCoffeeInvoiceCostDialog:
          coffeeInvoiceCostsUIProps.openDeleteCoffeeInvoiceCostDialog,
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
    sizePerPage: coffeeInvoiceCostsUIProps.queryParams.PageSize,
    page: coffeeInvoiceCostsUIProps.queryParams.PageNumber,
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
                  coffeeInvoiceCostsUIProps.setQueryParams
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
