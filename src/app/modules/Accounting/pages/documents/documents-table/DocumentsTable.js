import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/documents/documentsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useDocumentsUIContext } from "../DocumentsUIContext";
import { DocumentModel } from "../../../../../../core/_models/Accounting/DocumentModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import { DateFaColumnFormatter, CheckBoxFormatter } from "../../../../../../core/_formatters";

export function DocumentsTable() {
  const { t } = useTranslation();

  const documentsUIContext = useDocumentsUIContext();

  const documentsUIProps = useMemo(() => {
    return {
      ids: documentsUIContext.ids,
      setIds: documentsUIContext.setIds,
      queryParams: documentsUIContext.queryParams,
      setQueryParams: documentsUIContext.setQueryParams,
      openEditDocumentPage: documentsUIContext.openEditDocumentPage,
      openDeleteDocumentDialog: documentsUIContext.openDeleteDocumentDialog,
    };
  }, [documentsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.documents }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(DocumentModel, "DocumentNo", "desc");
  const fieldKey = getFields(DocumentModel);
  const fields = DocumentModel;

  const dispatch = useDispatch();
  useEffect(() => {
    documentsUIProps.setIds([]);
    dispatch(actions.fetchDocuments(documentsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: "DocumentNo",
      text: t("Document.DocumentNo"),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "DocumentType.Title",
      text: t("Document.DocumentType"),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "YearId",
      text: t("Document.YearId"),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "RefNo",
      text: t("Document.RefNo"),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "PrintCount",
      text: t("Document.PrintCount"),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "AtfNo",
      text: t("Document.AtfNo"),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "DailyNumber",
      text: t("Document.DailyNumber"),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "SysReference",
      text: t("Document.SysReference"),
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "Cancel",
      text: t("Document.Cancel"),
      sort: true,
      sortCaret: sortCaret,
      formatter: CheckBoxFormatter,
      formatExtraData: {
        t: t,
        positive: t("Common.Yes"),
        negetive: t("Common.No"),
      }
    },
    {
      dataField: "Control",
      text: t("Document.Control"),
      sort: true,
      sortCaret: sortCaret,
      formatter: CheckBoxFormatter,
      formatExtraData: {
        t: t,
        positive: t("Common.Yes"),
        negetive: t("Common.No"),
      }
    },
    {
      dataField: "Archive",
      text: t("Document.Archive"),
      sort: true,
      sortCaret: sortCaret,
      formatter: CheckBoxFormatter,
      formatExtraData: {
        t: t,
        positive: t("Common.Yes"),
        negetive: t("Common.No"),
      }
    },
    {
      dataField: "Empty",
      text: t("Document.Empty"),
      sort: true,
      sortCaret: sortCaret,
      formatter: CheckBoxFormatter,
      formatExtraData: {
        t: t,
        positive: t("Common.Yes"),
        negetive: t("Common.No"),
      }
    },
    {
      dataField: "IsDraft",
      text: t("Document.IsDraft"),
      sort: true,
      sortCaret: sortCaret,
      formatter: CheckBoxFormatter,
      formatExtraData: {
        t: t,
        positive: t("Common.Yes"),
        negetive: t("Common.No"),
      }
    },
    {
      dataField: "DocumentDate",
      text: t("Document.DocumentDate"),
      sort: true,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditDocumentPage: documentsUIProps.openEditDocumentPage,
        openDeleteDocumentDialog: documentsUIProps.openDeleteDocumentDialog,
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
    sizePerPage: documentsUIProps.queryParams.PageSize,
    page: documentsUIProps.queryParams.PageNumber,
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
                  documentsUIProps.setQueryParams
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