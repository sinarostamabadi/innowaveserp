import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/buyCosts/buyCostsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBuyCostsUIContext } from "../BuyCostsUIContext";
import { BuyCostModel } from "../../../../../../core/_models/PurchaseOrder/BuyCostModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BuyCostsTable() {
  const { t } = useTranslation();

  const buyCostsUIContext = useBuyCostsUIContext();

  const buyCostsUIProps = useMemo(() => {
    return {
      ids: buyCostsUIContext.ids,
      setIds: buyCostsUIContext.setIds,
      queryParams: buyCostsUIContext.queryParams,
      setQueryParams: buyCostsUIContext.setQueryParams,
      openEditBuyCostPage: buyCostsUIContext.openEditBuyCostPage,
      openDeleteBuyCostDialog: buyCostsUIContext.openDeleteBuyCostDialog,
    };
  }, [buyCostsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.buyCosts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BuyCostModel);
  const fieldKey = getFields(BuyCostModel);
  const fields = BuyCostModel;

  const dispatch = useDispatch();
  useEffect(() => {
    buyCostsUIProps.setIds([]);
    dispatch(actions.fetchBuyCosts(buyCostsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyCostsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("BuyCost." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("BuyCost." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBuyCostPage: buyCostsUIProps.openEditBuyCostPage,
        openDeleteBuyCostDialog: buyCostsUIProps.openDeleteBuyCostDialog,
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
    sizePerPage: buyCostsUIProps.queryParams.PageSize,
    page: buyCostsUIProps.queryParams.PageNumber,
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
                  buyCostsUIProps.setQueryParams
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