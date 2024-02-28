import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/linkDocumentParameters/linkDocumentParametersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useLinkDocumentParametersUIContext } from "../LinkDocumentParametersUIContext";
import { LinkDocumentParameterModel } from "../../../../../../core/_models/Accounting/LinkDocumentParameterModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function LinkDocumentParametersTable() {
  const { t } = useTranslation();

  const linkDocumentParametersUIContext = useLinkDocumentParametersUIContext();

  const linkDocumentParametersUIProps = useMemo(() => {
    return {
      ids: linkDocumentParametersUIContext.ids,
      setIds: linkDocumentParametersUIContext.setIds,
      queryParams: linkDocumentParametersUIContext.queryParams,
      setQueryParams: linkDocumentParametersUIContext.setQueryParams,
      openEditLinkDocumentParameterPage:
        linkDocumentParametersUIContext.openEditLinkDocumentParameterPage,
      openDeleteLinkDocumentParameterDialog:
        linkDocumentParametersUIContext.openDeleteLinkDocumentParameterDialog,
    };
  }, [linkDocumentParametersUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.linkDocumentParameters }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(LinkDocumentParameterModel);
  const fieldKey = getFields(LinkDocumentParameterModel);
  const fields = LinkDocumentParameterModel;

  const dispatch = useDispatch();
  useEffect(() => {
    linkDocumentParametersUIProps.setIds([]);
    dispatch(
      actions.fetchLinkDocumentParameters(
        linkDocumentParametersUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkDocumentParametersUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("LinkDocumentParameter." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("LinkDocumentParameter." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditLinkDocumentParameterPage:
          linkDocumentParametersUIProps.openEditLinkDocumentParameterPage,
        openDeleteLinkDocumentParameterDialog:
          linkDocumentParametersUIProps.openDeleteLinkDocumentParameterDialog,
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
    sizePerPage: linkDocumentParametersUIProps.queryParams.PageSize,
    page: linkDocumentParametersUIProps.queryParams.PageNumber,
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
                  linkDocumentParametersUIProps.setQueryParams
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
