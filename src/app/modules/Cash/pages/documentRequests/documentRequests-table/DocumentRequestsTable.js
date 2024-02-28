import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/documentRequests/documentRequestsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useDocumentRequestsUIContext } from "../DocumentRequestsUIContext";
import { DocumentRequestModel } from "../../../../../../core/_models/Cash/DocumentRequestModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function DocumentRequestsTable() {
  const { t } = useTranslation();

  const documentRequestsUIContext = useDocumentRequestsUIContext();

  const documentRequestsUIProps = useMemo(() => {
    return {
      ids: documentRequestsUIContext.ids,
      setIds: documentRequestsUIContext.setIds,
      queryParams: documentRequestsUIContext.queryParams,
      setQueryParams: documentRequestsUIContext.setQueryParams,
      openEditDocumentRequestPage:
        documentRequestsUIContext.openEditDocumentRequestPage,
      openDeleteDocumentRequestDialog:
        documentRequestsUIContext.openDeleteDocumentRequestDialog,
    };
  }, [documentRequestsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.documentRequests }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(DocumentRequestModel);
  const fieldKey = getFields(DocumentRequestModel);
  const fields = DocumentRequestModel;

  const dispatch = useDispatch();
  useEffect(() => {
    documentRequestsUIProps.setIds([]);
    dispatch(
      actions.fetchDocumentRequests(documentRequestsUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentRequestsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("DocumentRequest." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("DocumentRequest." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditDocumentRequestPage:
          documentRequestsUIProps.openEditDocumentRequestPage,
        openDeleteDocumentRequestDialog:
          documentRequestsUIProps.openDeleteDocumentRequestDialog,
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
    sizePerPage: documentRequestsUIProps.queryParams.PageSize,
    page: documentRequestsUIProps.queryParams.PageNumber,
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
                  documentRequestsUIProps.setQueryParams
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
