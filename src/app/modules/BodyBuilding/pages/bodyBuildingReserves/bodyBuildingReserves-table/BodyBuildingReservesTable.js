import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bodyBuildingReserves/bodyBuildingReservesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBodyBuildingReservesUIContext } from "../BodyBuildingReservesUIContext";
import { BodyBuildingReserveModel } from "../../../../../../core/_models/BodyBuilding/BodyBuildingReserveModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BodyBuildingReservesTable() {
  const { t } = useTranslation();

  const bodyBuildingReservesUIContext = useBodyBuildingReservesUIContext();

  const bodyBuildingReservesUIProps = useMemo(() => {
    return {
      ids: bodyBuildingReservesUIContext.ids,
      setIds: bodyBuildingReservesUIContext.setIds,
      queryParams: bodyBuildingReservesUIContext.queryParams,
      setQueryParams: bodyBuildingReservesUIContext.setQueryParams,
      openEditBodyBuildingReservePage: bodyBuildingReservesUIContext.openEditBodyBuildingReservePage,
      openDeleteBodyBuildingReserveDialog: bodyBuildingReservesUIContext.openDeleteBodyBuildingReserveDialog,
    };
  }, [bodyBuildingReservesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.bodyBuildingReserves }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BodyBuildingReserveModel);
  const fieldKey = getFields(BodyBuildingReserveModel);
  const fields = BodyBuildingReserveModel;

  const dispatch = useDispatch();
  useEffect(() => {
    bodyBuildingReservesUIProps.setIds([]);
    dispatch(actions.fetchBodyBuildingReserves(bodyBuildingReservesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyBuildingReservesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("BodyBuildingReserve." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("BodyBuildingReserve." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBodyBuildingReservePage: bodyBuildingReservesUIProps.openEditBodyBuildingReservePage,
        openDeleteBodyBuildingReserveDialog: bodyBuildingReservesUIProps.openDeleteBodyBuildingReserveDialog,
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
    sizePerPage: bodyBuildingReservesUIProps.queryParams.PageSize,
    page: bodyBuildingReservesUIProps.queryParams.PageNumber,
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
                  bodyBuildingReservesUIProps.setQueryParams
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