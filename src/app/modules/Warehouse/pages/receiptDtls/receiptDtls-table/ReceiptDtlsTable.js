import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/receiptDtls/receiptDtlsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useReceiptDtlsUIContext } from "../ReceiptDtlsUIContext";
import { ReceiptDtlModel } from "../../../../../../core/_models/Warehouse/ReceiptDtlModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ReceiptDtlsTable() {
  const { t } = useTranslation();

  const receiptDtlsUIContext = useReceiptDtlsUIContext();

  const receiptDtlsUIProps = useMemo(() => {
    return {
      ids: receiptDtlsUIContext.ids,
      setIds: receiptDtlsUIContext.setIds,
      queryParams: receiptDtlsUIContext.queryParams,
      setQueryParams: receiptDtlsUIContext.setQueryParams,
      openEditReceiptDtlPage: receiptDtlsUIContext.openEditReceiptDtlPage,
      openDeleteReceiptDtlDialog: receiptDtlsUIContext.openDeleteReceiptDtlDialog,
    };
  }, [receiptDtlsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.receiptDtls }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ReceiptDtlModel);
  const fieldKey = getFields(ReceiptDtlModel);
  const fields = ReceiptDtlModel;

  const dispatch = useDispatch();
  useEffect(() => {
    receiptDtlsUIProps.setIds([]);
    dispatch(actions.fetchReceiptDtls(receiptDtlsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiptDtlsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("ReceiptDtl." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("ReceiptDtl." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditReceiptDtlPage: receiptDtlsUIProps.openEditReceiptDtlPage,
        openDeleteReceiptDtlDialog: receiptDtlsUIProps.openDeleteReceiptDtlDialog,
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
    sizePerPage: receiptDtlsUIProps.queryParams.PageSize,
    page: receiptDtlsUIProps.queryParams.PageNumber,
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
                  receiptDtlsUIProps.setQueryParams
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