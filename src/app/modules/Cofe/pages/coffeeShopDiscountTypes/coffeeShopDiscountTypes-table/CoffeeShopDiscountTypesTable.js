import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/coffeeShopDiscountTypes/coffeeShopDiscountTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCoffeeShopDiscountTypesUIContext } from "../CoffeeShopDiscountTypesUIContext";
import { CoffeeShopDiscountTypeModel } from "../../../../../../core/_models/Cofe/CoffeeShopDiscountTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CoffeeShopDiscountTypesTable() {
  const { t } = useTranslation();

  const coffeeShopDiscountTypesUIContext =
    useCoffeeShopDiscountTypesUIContext();

  const coffeeShopDiscountTypesUIProps = useMemo(() => {
    return {
      ids: coffeeShopDiscountTypesUIContext.ids,
      setIds: coffeeShopDiscountTypesUIContext.setIds,
      queryParams: coffeeShopDiscountTypesUIContext.queryParams,
      setQueryParams: coffeeShopDiscountTypesUIContext.setQueryParams,
      openEditCoffeeShopDiscountTypePage:
        coffeeShopDiscountTypesUIContext.openEditCoffeeShopDiscountTypePage,
      openDeleteCoffeeShopDiscountTypeDialog:
        coffeeShopDiscountTypesUIContext.openDeleteCoffeeShopDiscountTypeDialog,
    };
  }, [coffeeShopDiscountTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.coffeeShopDiscountTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CoffeeShopDiscountTypeModel);
  const fieldKey = getFields(CoffeeShopDiscountTypeModel);
  const fields = CoffeeShopDiscountTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    coffeeShopDiscountTypesUIProps.setIds([]);
    dispatch(
      actions.fetchCoffeeShopDiscountTypes(
        coffeeShopDiscountTypesUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffeeShopDiscountTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("CoffeeShopDiscountType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("CoffeeShopDiscountType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCoffeeShopDiscountTypePage:
          coffeeShopDiscountTypesUIProps.openEditCoffeeShopDiscountTypePage,
        openDeleteCoffeeShopDiscountTypeDialog:
          coffeeShopDiscountTypesUIProps.openDeleteCoffeeShopDiscountTypeDialog,
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
    sizePerPage: coffeeShopDiscountTypesUIProps.queryParams.PageSize,
    page: coffeeShopDiscountTypesUIProps.queryParams.PageNumber,
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
                  coffeeShopDiscountTypesUIProps.setQueryParams
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
