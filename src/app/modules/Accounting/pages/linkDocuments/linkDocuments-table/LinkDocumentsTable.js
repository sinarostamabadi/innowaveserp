import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/linkDocuments/linkDocumentsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useLinkDocumentsUIContext } from "../LinkDocumentsUIContext";
import { LinkDocumentModel } from "../../../../../../core/_models/Accounting/LinkDocumentModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function LinkDocumentsTable() {
  const { t } = useTranslation();

  const linkDocumentsUIContext = useLinkDocumentsUIContext();

  const linkDocumentsUIProps = useMemo(() => {
    return {
      ids: linkDocumentsUIContext.ids,
      setIds: linkDocumentsUIContext.setIds,
      queryParams: linkDocumentsUIContext.queryParams,
      setQueryParams: linkDocumentsUIContext.setQueryParams,
      openEditLinkDocumentPage: linkDocumentsUIContext.openEditLinkDocumentPage,
      openDeleteLinkDocumentDialog: linkDocumentsUIContext.openDeleteLinkDocumentDialog,
    };
  }, [linkDocumentsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.linkDocuments }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(LinkDocumentModel);
  const fieldKey = getFields(LinkDocumentModel);
  const fields = LinkDocumentModel;

  const dispatch = useDispatch();
  useEffect(() => {
    linkDocumentsUIProps.setIds([]);
    dispatch(actions.fetchLinkDocuments(linkDocumentsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkDocumentsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("LinkDocument." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("LinkDocument." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditLinkDocumentPage: linkDocumentsUIProps.openEditLinkDocumentPage,
        openDeleteLinkDocumentDialog: linkDocumentsUIProps.openDeleteLinkDocumentDialog,
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
    sizePerPage: linkDocumentsUIProps.queryParams.PageSize,
    page: linkDocumentsUIProps.queryParams.PageNumber,
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
                  linkDocumentsUIProps.setQueryParams
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