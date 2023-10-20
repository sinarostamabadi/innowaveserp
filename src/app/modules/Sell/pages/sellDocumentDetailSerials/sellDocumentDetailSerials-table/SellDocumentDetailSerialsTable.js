import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/sellDocumentDetailSerials/sellDocumentDetailSerialsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useSellDocumentDetailSerialsUIContext } from "../SellDocumentDetailSerialsUIContext";
import { SellDocumentDetailSerialModel } from "../../../../../../core/_models/Sell/SellDocumentDetailSerialModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function SellDocumentDetailSerialsTable() {
  const { t } = useTranslation();

  const sellDocumentDetailSerialsUIContext = useSellDocumentDetailSerialsUIContext();

  const sellDocumentDetailSerialsUIProps = useMemo(() => {
    return {
      ids: sellDocumentDetailSerialsUIContext.ids,
      setIds: sellDocumentDetailSerialsUIContext.setIds,
      queryParams: sellDocumentDetailSerialsUIContext.queryParams,
      setQueryParams: sellDocumentDetailSerialsUIContext.setQueryParams,
      openEditSellDocumentDetailSerialPage: sellDocumentDetailSerialsUIContext.openEditSellDocumentDetailSerialPage,
      openDeleteSellDocumentDetailSerialDialog: sellDocumentDetailSerialsUIContext.openDeleteSellDocumentDetailSerialDialog,
    };
  }, [sellDocumentDetailSerialsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.sellDocumentDetailSerials }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(SellDocumentDetailSerialModel);
  const fieldKey = getFields(SellDocumentDetailSerialModel);
  const fields = SellDocumentDetailSerialModel;

  const dispatch = useDispatch();
  useEffect(() => {
    sellDocumentDetailSerialsUIProps.setIds([]);
    dispatch(actions.fetchSellDocumentDetailSerials(sellDocumentDetailSerialsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellDocumentDetailSerialsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("SellDocumentDetailSerial." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("SellDocumentDetailSerial." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditSellDocumentDetailSerialPage: sellDocumentDetailSerialsUIProps.openEditSellDocumentDetailSerialPage,
        openDeleteSellDocumentDetailSerialDialog: sellDocumentDetailSerialsUIProps.openDeleteSellDocumentDetailSerialDialog,
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
    sizePerPage: sellDocumentDetailSerialsUIProps.queryParams.PageSize,
    page: sellDocumentDetailSerialsUIProps.queryParams.PageNumber,
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
                  sellDocumentDetailSerialsUIProps.setQueryParams
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