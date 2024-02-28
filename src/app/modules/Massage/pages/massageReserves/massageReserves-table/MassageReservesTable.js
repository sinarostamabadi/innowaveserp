import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/massageReserves/massageReservesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useMassageReservesUIContext } from "../MassageReservesUIContext";
import { MassageReserveModel } from "../../../../../../core/_models/Massage/MassageReserveModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function MassageReservesTable() {
  const { t } = useTranslation();

  const massageReservesUIContext = useMassageReservesUIContext();

  const massageReservesUIProps = useMemo(() => {
    return {
      ids: massageReservesUIContext.ids,
      setIds: massageReservesUIContext.setIds,
      queryParams: massageReservesUIContext.queryParams,
      setQueryParams: massageReservesUIContext.setQueryParams,
      openEditMassageReservePage:
        massageReservesUIContext.openEditMassageReservePage,
      openDeleteMassageReserveDialog:
        massageReservesUIContext.openDeleteMassageReserveDialog,
    };
  }, [massageReservesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.massageReserves }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(MassageReserveModel);
  const fieldKey = getFields(MassageReserveModel);
  const fields = MassageReserveModel;

  const dispatch = useDispatch();
  useEffect(() => {
    massageReservesUIProps.setIds([]);
    dispatch(actions.fetchMassageReserves(massageReservesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [massageReservesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("MassageReserve." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("MassageReserve." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditMassageReservePage:
          massageReservesUIProps.openEditMassageReservePage,
        openDeleteMassageReserveDialog:
          massageReservesUIProps.openDeleteMassageReserveDialog,
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
    sizePerPage: massageReservesUIProps.queryParams.PageSize,
    page: massageReservesUIProps.queryParams.PageNumber,
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
                  massageReservesUIProps.setQueryParams
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
