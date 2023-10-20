import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/coffeeShops/coffeeShopsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCoffeeShopsUIContext } from "../CoffeeShopsUIContext";
import { CoffeeShopModel } from "../../../../../../core/_models/General/CoffeeShopModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CoffeeShopsTable() {
  const { t } = useTranslation();

  const coffeeShopsUIContext = useCoffeeShopsUIContext();

  const coffeeShopsUIProps = useMemo(() => {
    return {
      ids: coffeeShopsUIContext.ids,
      setIds: coffeeShopsUIContext.setIds,
      queryParams: coffeeShopsUIContext.queryParams,
      setQueryParams: coffeeShopsUIContext.setQueryParams,
      openEditCoffeeShopPage: coffeeShopsUIContext.openEditCoffeeShopPage,
      openDeleteCoffeeShopDialog: coffeeShopsUIContext.openDeleteCoffeeShopDialog,
    };
  }, [coffeeShopsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.coffeeShops }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CoffeeShopModel);
  const fieldKey = getFields(CoffeeShopModel);
  const fields = CoffeeShopModel;

  const dispatch = useDispatch();
  useEffect(() => {
    coffeeShopsUIProps.setIds([]);
    dispatch(actions.fetchCoffeeShops(coffeeShopsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffeeShopsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("CoffeeShop." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("CoffeeShop." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCoffeeShopPage: coffeeShopsUIProps.openEditCoffeeShopPage,
        openDeleteCoffeeShopDialog: coffeeShopsUIProps.openDeleteCoffeeShopDialog,
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
    sizePerPage: coffeeShopsUIProps.queryParams.PageSize,
    page: coffeeShopsUIProps.queryParams.PageNumber,
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
                  coffeeShopsUIProps.setQueryParams
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
