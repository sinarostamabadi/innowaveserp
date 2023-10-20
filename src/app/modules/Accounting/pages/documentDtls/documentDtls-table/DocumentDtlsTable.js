import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/documentDtls/documentDtlsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useDocumentDtlsUIContext } from "../DocumentDtlsUIContext";
import { DocumentDtlModel } from "../../../../../../core/_models/Accounting/DocumentDtlModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function DocumentDtlsTable() {
  const { t } = useTranslation();

  const documentDtlsUIContext = useDocumentDtlsUIContext();

  const documentDtlsUIProps = useMemo(() => {
    return {
      ids: documentDtlsUIContext.ids,
      setIds: documentDtlsUIContext.setIds,
      queryParams: documentDtlsUIContext.queryParams,
      setQueryParams: documentDtlsUIContext.setQueryParams,
      openEditDocumentDtlPage: documentDtlsUIContext.openEditDocumentDtlPage,
      openDeleteDocumentDtlDialog: documentDtlsUIContext.openDeleteDocumentDtlDialog,
    };
  }, [documentDtlsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.documentDtls }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(DocumentDtlModel);
  const fieldKey = getFields(DocumentDtlModel);
  const fields = DocumentDtlModel;

  const dispatch = useDispatch();
  useEffect(() => {
    documentDtlsUIProps.setIds([]);
    dispatch(actions.fetchDocumentDtls(documentDtlsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentDtlsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("DocumentDtl." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("DocumentDtl." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditDocumentDtlPage: documentDtlsUIProps.openEditDocumentDtlPage,
        openDeleteDocumentDtlDialog: documentDtlsUIProps.openDeleteDocumentDtlDialog,
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
    sizePerPage: documentDtlsUIProps.queryParams.PageSize,
    page: documentDtlsUIProps.queryParams.PageNumber,
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
                  documentDtlsUIProps.setQueryParams
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