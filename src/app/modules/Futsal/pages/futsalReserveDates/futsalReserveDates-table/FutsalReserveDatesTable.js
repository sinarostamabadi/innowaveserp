import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/futsalReserveDates/futsalReserveDatesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useFutsalReserveDatesUIContext } from "../FutsalReserveDatesUIContext";
import { FutsalReserveDateModel } from "../../../../../../core/_models/Futsal/FutsalReserveDateModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function FutsalReserveDatesTable() {
  const { t } = useTranslation();

  const futsalReserveDatesUIContext = useFutsalReserveDatesUIContext();

  const futsalReserveDatesUIProps = useMemo(() => {
    return {
      ids: futsalReserveDatesUIContext.ids,
      setIds: futsalReserveDatesUIContext.setIds,
      queryParams: futsalReserveDatesUIContext.queryParams,
      setQueryParams: futsalReserveDatesUIContext.setQueryParams,
      openEditFutsalReserveDatePage:
        futsalReserveDatesUIContext.openEditFutsalReserveDatePage,
      openDeleteFutsalReserveDateDialog:
        futsalReserveDatesUIContext.openDeleteFutsalReserveDateDialog,
    };
  }, [futsalReserveDatesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.futsalReserveDates }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(FutsalReserveDateModel);
  const fieldKey = getFields(FutsalReserveDateModel);
  const fields = FutsalReserveDateModel;

  const dispatch = useDispatch();
  useEffect(() => {
    futsalReserveDatesUIProps.setIds([]);
    dispatch(
      actions.fetchFutsalReserveDates(futsalReserveDatesUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [futsalReserveDatesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("FutsalReserveDate." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("FutsalReserveDate." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditFutsalReserveDatePage:
          futsalReserveDatesUIProps.openEditFutsalReserveDatePage,
        openDeleteFutsalReserveDateDialog:
          futsalReserveDatesUIProps.openDeleteFutsalReserveDateDialog,
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
    sizePerPage: futsalReserveDatesUIProps.queryParams.PageSize,
    page: futsalReserveDatesUIProps.queryParams.PageNumber,
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
                  futsalReserveDatesUIProps.setQueryParams
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
