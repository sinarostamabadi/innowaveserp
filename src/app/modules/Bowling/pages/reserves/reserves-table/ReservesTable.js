import React, { useEffect, useState, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/reserves/reservesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "src/core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "src/core/_partials/controls";
import { useReservesUIContext } from "../ReservesUIContext";
import { ReserveModel } from "src/core/_models/Bowling/ReserveModel";
import { getConfig, getFields } from "src/core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import {
  MoneyColumnFormatter,
  DateFaColumnFormatter,
  TimeColumnFormatter,
} from "src/core/_formatters";
import { createCashRequest } from "src/app/modules/Cash/_redux/cashDocuments/cashDocumentsCrud";
import config from "src/config";

export function ReservesTable({ history }) {
  const { t } = useTranslation();
  const [baseConfig] = useState(config());
  const reservesUIContext = useReservesUIContext();

  const reservesUIProps = useMemo(() => {
    return {
      ids: reservesUIContext.ids,
      setIds: reservesUIContext.setIds,
      queryParams: reservesUIContext.queryParams,
      setQueryParams: reservesUIContext.setQueryParams,
      openEditReservePage: reservesUIContext.openEditReservePage,
      openDeleteReserveDialog: reservesUIContext.openDeleteReserveDialog,
      openDoneReserveDialog: reservesUIContext.openDoneReserveDialog,
      openAddTimeReserveDialog: reservesUIContext.openAddTimeReserveDialog,
      openRelocationDialog: reservesUIContext.openRelocationDialog,
    };
  }, [reservesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.reserves }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ReserveModel);
  const fieldKey = getFields(ReserveModel);
  const fields = ReserveModel;

  const dispatch = useDispatch();
  useEffect(() => {
    reservesUIProps.setIds([]);
    dispatch(actions.fetchReserves(reservesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservesUIProps.queryParams, dispatch]);

  function checkout(reserveId) {
    createCashRequest(reserveId, 2).then(({ data }) =>
      history.push(`/cash/cashDocuments/quick/${data}`)
    );
  }

  let columns = [
    {
      dataField: "ReserveId",
      text: t("BowlingReserve.ReserveId"),
      sort: fields.ReserveId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Line.Title",
      text: t("BowlingReserve.Line"),
      sort: fields.LineId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Person.FullNameFa",
      text: t("BowlingReserve.Person"),
      sort: fields.PersonId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "PersonCount",
      text: t("BowlingReserve.PersonCount"),
      sort: fields.PersonCount.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "ReserveDate",
      text: t("BowlingReserve.ReserveDate"),
      sort: fields.ReserveDate.sortable,
      formatter: DateFaColumnFormatter,
      sortCaret: sortCaret,
    },
    {
      dataField: "FromTime",
      text: t("BowlingReserve.FromTime"),
      sort: fields.FromTime.sortable,
      formatter: TimeColumnFormatter,
      sortCaret: sortCaret,
    },
  ];

  if (baseConfig.bowling.list == "v1")
    columns.push({
      dataField: "ToTime",
      text: t("BowlingReserve.ToTime"),
      sort: fields.ToTime.sortable,
      formatter: TimeColumnFormatter,
      sortCaret: sortCaret,
    });
  columns.push(
    {
      dataField: "ClosetNumber",
      text: t("BowlingReserve.ClosetNumber"),
      sort: fields.ClosetNumber.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "PayablePrice",
      text: t("BowlingReserve.PayablePrice"),
      sort: fields.PayablePrice.sortable,
      sortCaret: sortCaret,
      formatter: MoneyColumnFormatter,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter:
        baseConfig.bowling.list == "v2"
          ? columnFormatters.ActionsColumnFormatterV2
          : columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditReservePage: reservesUIProps.openEditReservePage,
        openDeleteReserveDialog: reservesUIProps.openDeleteReserveDialog,
        openDoneReserveDialog: reservesUIProps.openDoneReserveDialog,
        openAddTimeReserveDialog: reservesUIProps.openAddTimeReserveDialog,
        openRelocationDialog: reservesUIProps.openRelocationDialog,
        openCashDialog: checkout,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "40px",
      },
    }
  );

  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: configs.sizePerPageList,
    sizePerPage: reservesUIProps.queryParams.PageSize,
    page: reservesUIProps.queryParams.PageNumber,
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
                  reservesUIProps.setQueryParams
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
