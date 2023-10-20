import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/inquiries/inquiriesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useInquiriesUIContext } from "../InquiriesUIContext";
import { InquiryModel } from "../../../../../../core/_models/PurchaseOrder/InquiryModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function InquiriesTable() {
  const { t } = useTranslation();

  const inquiriesUIContext = useInquiriesUIContext();

  const inquiriesUIProps = useMemo(() => {
    return {
      ids: inquiriesUIContext.ids,
      setIds: inquiriesUIContext.setIds,
      queryParams: inquiriesUIContext.queryParams,
      setQueryParams: inquiriesUIContext.setQueryParams,
      openEditInquiryPage: inquiriesUIContext.openEditInquiryPage,
      openDeleteInquiryDialog: inquiriesUIContext.openDeleteInquiryDialog,
    };
  }, [inquiriesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.inquiries }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(InquiryModel);
  const fieldKey = getFields(InquiryModel);
  const fields = InquiryModel;

  const dispatch = useDispatch();
  useEffect(() => {
    inquiriesUIProps.setIds([]);
    dispatch(actions.fetchInquiries(inquiriesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inquiriesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: "Person.FullNameFa",
      text: t("Inquiry." + fields.PersonId.display),
      sort: fields.PersonId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "InquiryStatus.Title",
      text: t("Inquiry." + fields.InquiryStatusId.display),
      sort: fields.InquiryStatusId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditInquiryPage: inquiriesUIProps.openEditInquiryPage,
        openDeleteInquiryDialog: inquiriesUIProps.openDeleteInquiryDialog,
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
    sizePerPage: inquiriesUIProps.queryParams.PageSize,
    page: inquiriesUIProps.queryParams.PageNumber,
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
                  inquiriesUIProps.setQueryParams
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