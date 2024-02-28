import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/poolDiscounts/poolDiscountsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { usePoolDiscountsUIContext } from "../PoolDiscountsUIContext";
import { PoolDiscountModel } from "../../../../../../core/_models/Pool/PoolDiscountModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function PoolDiscountsTable() {
  const { t } = useTranslation();

  const poolDiscountsUIContext = usePoolDiscountsUIContext();

  const poolDiscountsUIProps = useMemo(() => {
    return {
      ids: poolDiscountsUIContext.ids,
      setIds: poolDiscountsUIContext.setIds,
      queryParams: poolDiscountsUIContext.queryParams,
      setQueryParams: poolDiscountsUIContext.setQueryParams,
      openEditPoolDiscountPage: poolDiscountsUIContext.openEditPoolDiscountPage,
      openDeletePoolDiscountDialog:
        poolDiscountsUIContext.openDeletePoolDiscountDialog,
    };
  }, [poolDiscountsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.poolDiscounts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(PoolDiscountModel);
  const fieldKey = getFields(PoolDiscountModel);
  const fields = PoolDiscountModel;

  const dispatch = useDispatch();
  useEffect(() => {
    poolDiscountsUIProps.setIds([]);
    dispatch(actions.fetchPoolDiscounts(poolDiscountsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolDiscountsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("PoolDiscount." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("PoolDiscount." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPoolDiscountPage: poolDiscountsUIProps.openEditPoolDiscountPage,
        openDeletePoolDiscountDialog:
          poolDiscountsUIProps.openDeletePoolDiscountDialog,
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
    sizePerPage: poolDiscountsUIProps.queryParams.PageSize,
    page: poolDiscountsUIProps.queryParams.PageNumber,
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
                  poolDiscountsUIProps.setQueryParams
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
