import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/chequeStatuses/chequeStatusesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useChequeStatusesUIContext } from "../ChequeStatusesUIContext";
import { ChequeStatusModel } from "../../../../../../core/_models/Cash/ChequeStatusModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ChequeStatusesTable() {
  const { t } = useTranslation();

  const chequeStatusesUIContext = useChequeStatusesUIContext();

  const chequeStatusesUIProps = useMemo(() => {
    return {
      ids: chequeStatusesUIContext.ids,
      setIds: chequeStatusesUIContext.setIds,
      queryParams: chequeStatusesUIContext.queryParams,
      setQueryParams: chequeStatusesUIContext.setQueryParams,
      openEditChequeStatusPage:
        chequeStatusesUIContext.openEditChequeStatusPage,
      openDeleteChequeStatusDialog:
        chequeStatusesUIContext.openDeleteChequeStatusDialog,
    };
  }, [chequeStatusesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.chequeStatuses }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ChequeStatusModel);
  const fieldKey = getFields(ChequeStatusModel);
  const fields = ChequeStatusModel;

  const dispatch = useDispatch();
  useEffect(() => {
    chequeStatusesUIProps.setIds([]);
    dispatch(actions.fetchChequeStatuses(chequeStatusesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chequeStatusesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("ChequeStatus." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("ChequeStatus." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditChequeStatusPage:
          chequeStatusesUIProps.openEditChequeStatusPage,
        openDeleteChequeStatusDialog:
          chequeStatusesUIProps.openDeleteChequeStatusDialog,
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
    sizePerPage: chequeStatusesUIProps.queryParams.PageSize,
    page: chequeStatusesUIProps.queryParams.PageNumber,
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
                  chequeStatusesUIProps.setQueryParams
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
