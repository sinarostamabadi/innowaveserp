import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/sellDiscountDetails/sellDiscountDetailsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSellDiscountDetailsUIContext } from "../SellDiscountDetailsUIContext";
import { SellDiscountDetailModel } from "../../../../../../core/_models/Sell/SellDiscountDetailModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function SellDiscountDetailsTable() {
  const { t } = useTranslation();

  const sellDiscountDetailsUIContext = useSellDiscountDetailsUIContext();

  const sellDiscountDetailsUIProps = useMemo(() => {
    return {
      ids: sellDiscountDetailsUIContext.ids,
      setIds: sellDiscountDetailsUIContext.setIds,
      queryParams: sellDiscountDetailsUIContext.queryParams,
      setQueryParams: sellDiscountDetailsUIContext.setQueryParams,
      openEditSellDiscountDetailPage: sellDiscountDetailsUIContext.openEditSellDiscountDetailPage,
      openDeleteSellDiscountDetailDialog: sellDiscountDetailsUIContext.openDeleteSellDiscountDetailDialog,
    };
  }, [sellDiscountDetailsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.sellDiscountDetails }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SellDiscountDetailModel);
  const fieldKey = getFields(SellDiscountDetailModel);
  const fields = SellDiscountDetailModel;

  const dispatch = useDispatch();
  useEffect(() => {
    sellDiscountDetailsUIProps.setIds([]);
    dispatch(actions.fetchSellDiscountDetails(sellDiscountDetailsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellDiscountDetailsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("SellDiscountDetail." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("SellDiscountDetail." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSellDiscountDetailPage: sellDiscountDetailsUIProps.openEditSellDiscountDetailPage,
        openDeleteSellDiscountDetailDialog: sellDiscountDetailsUIProps.openDeleteSellDiscountDetailDialog,
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
    sizePerPage: sellDiscountDetailsUIProps.queryParams.PageSize,
    page: sellDiscountDetailsUIProps.queryParams.PageNumber,
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
                  sellDiscountDetailsUIProps.setQueryParams
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