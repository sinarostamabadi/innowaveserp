import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/inquiryStatuses/inquiryStatusesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useInquiryStatusesUIContext } from "../InquiryStatusesUIContext";
import { InquiryStatusModel } from "../../../../../../core/_models/PurchaseOrder/InquiryStatusModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function InquiryStatusesTable() {
  const { t } = useTranslation();

  const inquiryStatusesUIContext = useInquiryStatusesUIContext();

  const inquiryStatusesUIProps = useMemo(() => {
    return {
      ids: inquiryStatusesUIContext.ids,
      setIds: inquiryStatusesUIContext.setIds,
      queryParams: inquiryStatusesUIContext.queryParams,
      setQueryParams: inquiryStatusesUIContext.setQueryParams,
      openEditInquiryStatusPage:
        inquiryStatusesUIContext.openEditInquiryStatusPage,
      openDeleteInquiryStatusDialog:
        inquiryStatusesUIContext.openDeleteInquiryStatusDialog,
    };
  }, [inquiryStatusesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.inquiryStatuses }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(InquiryStatusModel);
  const fieldKey = getFields(InquiryStatusModel);
  const fields = InquiryStatusModel;

  const dispatch = useDispatch();
  useEffect(() => {
    inquiryStatusesUIProps.setIds([]);
    dispatch(actions.fetchInquiryStatuses(inquiryStatusesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inquiryStatusesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("InquiryStatus." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditInquiryStatusPage:
          inquiryStatusesUIProps.openEditInquiryStatusPage,
        openDeleteInquiryStatusDialog:
          inquiryStatusesUIProps.openDeleteInquiryStatusDialog,
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
    sizePerPage: inquiryStatusesUIProps.queryParams.PageSize,
    page: inquiryStatusesUIProps.queryParams.PageNumber,
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
                  inquiryStatusesUIProps.setQueryParams
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
