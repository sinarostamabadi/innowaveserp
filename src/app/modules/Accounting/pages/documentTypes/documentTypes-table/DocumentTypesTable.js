import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/documentTypes/documentTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useDocumentTypesUIContext } from "../DocumentTypesUIContext";
import { DocumentTypeModel } from "../../../../../../core/_models/Accounting/DocumentTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import { CheckBoxFormatter } from "../../../../../../core/_formatters";

export function DocumentTypesTable() {
  const { t } = useTranslation();

  const documentTypesUIContext = useDocumentTypesUIContext();

  const documentTypesUIProps = useMemo(() => {
    return {
      ids: documentTypesUIContext.ids,
      setIds: documentTypesUIContext.setIds,
      queryParams: documentTypesUIContext.queryParams,
      setQueryParams: documentTypesUIContext.setQueryParams,
      openEditDocumentTypePage: documentTypesUIContext.openEditDocumentTypePage,
      openDeleteDocumentTypeDialog: documentTypesUIContext.openDeleteDocumentTypeDialog,
    };
  }, [documentTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.documentTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(DocumentTypeModel);
  const fieldKey = getFields(DocumentTypeModel);
  const fields = DocumentTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    documentTypesUIProps.setIds([]);
    dispatch(actions.fetchDocumentTypes(documentTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("DocumentType." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.IsEftetahie,
      text: t("DocumentType." + fields.IsEftetahie.display),
      sort: fields.IsEftetahie.sortable,
      sortCaret: sortCaret,
      formatter: CheckBoxFormatter,
      formatExtraData: { 
        t: t,
        positive: t("Common.Yes"),
        negetive: t("Common.No")
      }
    },
    {
      dataField: fieldKey.IsEkhtetamie,
      text: t("DocumentType." + fields.IsEkhtetamie.display),
      sort: fields.IsEkhtetamie.sortable,
      sortCaret: sortCaret,
      formatter: CheckBoxFormatter,
      formatExtraData: { 
        t: t,
        positive: t("Common.Yes"),
        negetive: t("Common.No")
      }
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditDocumentTypePage: documentTypesUIProps.openEditDocumentTypePage,
        openDeleteDocumentTypeDialog: documentTypesUIProps.openDeleteDocumentTypeDialog,
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
    sizePerPage: documentTypesUIProps.queryParams.PageSize,
    page: documentTypesUIProps.queryParams.PageNumber,
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
                  documentTypesUIProps.setQueryParams
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