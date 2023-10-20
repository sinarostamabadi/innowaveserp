import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/inquiryDetails/inquiryDetailsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useInquiryDetailsUIContext } from "../InquiryDetailsUIContext";
import { InquiryDetailModel } from "../../../../../../core/_models/PurchaseOrder/InquiryDetailModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function InquiryDetailsTable() {
  const { t } = useTranslation();

  const inquiryDetailsUIContext = useInquiryDetailsUIContext();

  const inquiryDetailsUIProps = useMemo(() => {
    return {
      ids: inquiryDetailsUIContext.ids,
      setIds: inquiryDetailsUIContext.setIds,
      queryParams: inquiryDetailsUIContext.queryParams,
      setQueryParams: inquiryDetailsUIContext.setQueryParams,
      openEditInquiryDetailPage: inquiryDetailsUIContext.openEditInquiryDetailPage,
      openDeleteInquiryDetailDialog: inquiryDetailsUIContext.openDeleteInquiryDetailDialog,
    };
  }, [inquiryDetailsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.inquiryDetails }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(InquiryDetailModel);
  const fieldKey = getFields(InquiryDetailModel);
  const fields = InquiryDetailModel;

  const dispatch = useDispatch();
  useEffect(() => {
    inquiryDetailsUIProps.setIds([]);
    dispatch(actions.fetchInquiryDetails(inquiryDetailsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inquiryDetailsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("InquiryDetail." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("InquiryDetail." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditInquiryDetailPage: inquiryDetailsUIProps.openEditInquiryDetailPage,
        openDeleteInquiryDetailDialog: inquiryDetailsUIProps.openDeleteInquiryDetailDialog,
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
    sizePerPage: inquiryDetailsUIProps.queryParams.PageSize,
    page: inquiryDetailsUIProps.queryParams.PageNumber,
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
                  inquiryDetailsUIProps.setQueryParams
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