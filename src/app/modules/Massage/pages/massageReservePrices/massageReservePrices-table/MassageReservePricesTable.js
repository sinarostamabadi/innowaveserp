import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/massageReservePrices/massageReservePricesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useMassageReservePricesUIContext } from "../MassageReservePricesUIContext";
import { MassageReservePriceModel } from "../../../../../../core/_models/Massage/MassageReservePriceModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function MassageReservePricesTable() {
  const { t } = useTranslation();

  const massageReservePricesUIContext = useMassageReservePricesUIContext();

  const massageReservePricesUIProps = useMemo(() => {
    return {
      ids: massageReservePricesUIContext.ids,
      setIds: massageReservePricesUIContext.setIds,
      queryParams: massageReservePricesUIContext.queryParams,
      setQueryParams: massageReservePricesUIContext.setQueryParams,
      openEditMassageReservePricePage:
        massageReservePricesUIContext.openEditMassageReservePricePage,
      openDeleteMassageReservePriceDialog:
        massageReservePricesUIContext.openDeleteMassageReservePriceDialog,
    };
  }, [massageReservePricesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.massageReservePrices }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(MassageReservePriceModel);
  const fieldKey = getFields(MassageReservePriceModel);
  const fields = MassageReservePriceModel;

  const dispatch = useDispatch();
  useEffect(() => {
    massageReservePricesUIProps.setIds([]);
    dispatch(
      actions.fetchMassageReservePrices(massageReservePricesUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [massageReservePricesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("MassageReservePrice." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("MassageReservePrice." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditMassageReservePricePage:
          massageReservePricesUIProps.openEditMassageReservePricePage,
        openDeleteMassageReservePriceDialog:
          massageReservePricesUIProps.openDeleteMassageReservePriceDialog,
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
    sizePerPage: massageReservePricesUIProps.queryParams.PageSize,
    page: massageReservePricesUIProps.queryParams.PageNumber,
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
                  massageReservePricesUIProps.setQueryParams
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
