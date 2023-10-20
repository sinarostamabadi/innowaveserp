import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/sellDocumentDetails/sellDocumentDetailsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSellDocumentDetailsUIContext } from "../SellDocumentDetailsUIContext";
import { SellDocumentDetailModel } from "../../../../../../core/_models/Sell/SellDocumentDetailModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function SellDocumentDetailsTable() {
  const { t } = useTranslation();

  const sellDocumentDetailsUIContext = useSellDocumentDetailsUIContext();

  const sellDocumentDetailsUIProps = useMemo(() => {
    return {
      ids: sellDocumentDetailsUIContext.ids,
      setIds: sellDocumentDetailsUIContext.setIds,
      queryParams: sellDocumentDetailsUIContext.queryParams,
      setQueryParams: sellDocumentDetailsUIContext.setQueryParams,
      openEditSellDocumentDetailPage: sellDocumentDetailsUIContext.openEditSellDocumentDetailPage,
      openDeleteSellDocumentDetailDialog: sellDocumentDetailsUIContext.openDeleteSellDocumentDetailDialog,
    };
  }, [sellDocumentDetailsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.sellDocumentDetails }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SellDocumentDetailModel);
  const fieldKey = getFields(SellDocumentDetailModel);
  const fields = SellDocumentDetailModel;

  const dispatch = useDispatch();
  useEffect(() => {
    sellDocumentDetailsUIProps.setIds([]);
    dispatch(actions.fetchSellDocumentDetails(sellDocumentDetailsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellDocumentDetailsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("SellDocumentDetail." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("SellDocumentDetail." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSellDocumentDetailPage: sellDocumentDetailsUIProps.openEditSellDocumentDetailPage,
        openDeleteSellDocumentDetailDialog: sellDocumentDetailsUIProps.openDeleteSellDocumentDetailDialog,
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
    sizePerPage: sellDocumentDetailsUIProps.queryParams.PageSize,
    page: sellDocumentDetailsUIProps.queryParams.PageNumber,
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
                  sellDocumentDetailsUIProps.setQueryParams
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