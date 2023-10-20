import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/takeAwayRequests/takeAwayRequestsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useTakeAwayRequestsUIContext } from "../TakeAwayRequestsUIContext";
import { TakeAwayRequestModel } from "../../../../../../core/_models/TakeAway/TakeAwayRequestModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import { MoneyColumnFormatter, CheckBoxFormatter } from "../../../../../../core/_formatters";

export function TakeAwayRequestsTable() {
  const { t } = useTranslation();

  const takeAwayRequestsUIContext = useTakeAwayRequestsUIContext();

  const takeAwayRequestsUIProps = useMemo(() => {
    return {
      ids: takeAwayRequestsUIContext.ids,
      setIds: takeAwayRequestsUIContext.setIds,
      queryParams: takeAwayRequestsUIContext.queryParams,
      setQueryParams: takeAwayRequestsUIContext.setQueryParams,
      openEditTakeAwayRequestPage: takeAwayRequestsUIContext.openEditTakeAwayRequestPage,
      openDeleteTakeAwayRequestDialog:
        takeAwayRequestsUIContext.openDeleteTakeAwayRequestDialog,
    };
  }, [takeAwayRequestsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.takeAwayRequests }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(TakeAwayRequestModel, "TakeAwayRequestNumber", "desc");
  const fieldKey = getFields(TakeAwayRequestModel);
  const fields = TakeAwayRequestModel;

  const dispatch = useDispatch();
  useEffect(() => {
    takeAwayRequestsUIProps.setIds([]);
    dispatch(actions.fetchTakeAwayRequests(takeAwayRequestsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [takeAwayRequestsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.EntityType.Title,
      text: t("TakeAwayRequest." + fields.EntityType.display),
      sort: fields.EntityTypeId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Person.FullNameFa,
      text: t("TakeAwayRequest." + fields.Person.display),
      sort: fields.PersonId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Settlement.Title,
      text: t("TakeAwayRequest." + fields.Settlement.display),
      sort: fields.SettlementId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Description,
      text: t("TakeAwayRequest." + fields.Description.display),
      sort: fields.Description.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Pos.SerialNo,
      text: t("TakeAwayRequest." + fields.Pos.display),
      sort: fields.PosId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Price,
      text: t("TakeAwayRequest." + fields.Price.display),
      sort: fields.Price.sortable,
      sortCaret: sortCaret,
      formatter: MoneyColumnFormatter
    },
    {
      dataField: fieldKey.CostPrice,
      text: t("TakeAwayRequest." + fields.CostPrice.display),
      sort: fields.CostPrice.sortable,
      sortCaret: sortCaret,
      formatter: MoneyColumnFormatter
    },
    {
      dataField: fieldKey.PayablePrice,
      text: t("TakeAwayRequest." + fields.PayablePrice.display),
      sort: fields.PayablePrice.sortable,
      sortCaret: sortCaret,
      formatter: MoneyColumnFormatter
    },
    {
      dataField: fieldKey.IsCanceled,
      text: t("TakeAwayRequest." + fields.IsCanceled.display),
      sort: fields.IsCanceled.sortable,
      sortCaret: sortCaret,
      formatter: CheckBoxFormatter,
      formatExtraData: {
          positive: t("Common.Yes"),
          negetive: t("Common.No")
      }
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditTakeAwayRequestPage: takeAwayRequestsUIProps.openEditTakeAwayRequestPage,
        openDeleteTakeAwayRequestDialog:
          takeAwayRequestsUIProps.openDeleteTakeAwayRequestDialog,
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
    sizePerPage: takeAwayRequestsUIProps.queryParams.PageSize,
    page: takeAwayRequestsUIProps.queryParams.PageNumber,
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
                  takeAwayRequestsUIProps.setQueryParams
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
