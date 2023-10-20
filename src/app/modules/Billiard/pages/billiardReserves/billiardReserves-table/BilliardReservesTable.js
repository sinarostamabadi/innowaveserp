import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/billiardReserves/billiardReservesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBilliardReservesUIContext } from "../BilliardReservesUIContext";
import { BilliardReserveModel } from "../../../../../../core/_models/Billiard/BilliardReserveModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BilliardReservesTable() {
  const { t } = useTranslation();

  const billiardReservesUIContext = useBilliardReservesUIContext();

  const billiardReservesUIProps = useMemo(() => {
    return {
      ids: billiardReservesUIContext.ids,
      setIds: billiardReservesUIContext.setIds,
      queryParams: billiardReservesUIContext.queryParams,
      setQueryParams: billiardReservesUIContext.setQueryParams,
      openEditBilliardReservePage: billiardReservesUIContext.openEditBilliardReservePage,
      openDeleteBilliardReserveDialog: billiardReservesUIContext.openDeleteBilliardReserveDialog,
    };
  }, [billiardReservesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.billiardReserves }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BilliardReserveModel);
  const fieldKey = getFields(BilliardReserveModel);
  const fields = BilliardReserveModel;

  const dispatch = useDispatch();
  useEffect(() => {
    billiardReservesUIProps.setIds([]);
    dispatch(actions.fetchBilliardReserves(billiardReservesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billiardReservesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("BilliardReserve." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("BilliardReserve." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBilliardReservePage: billiardReservesUIProps.openEditBilliardReservePage,
        openDeleteBilliardReserveDialog: billiardReservesUIProps.openDeleteBilliardReserveDialog,
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
    sizePerPage: billiardReservesUIProps.queryParams.PageSize,
    page: billiardReservesUIProps.queryParams.PageNumber,
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
                  billiardReservesUIProps.setQueryParams
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