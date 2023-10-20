import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bodyBuildingReserveUsedDates/bodyBuildingReserveUsedDatesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBodyBuildingReserveUsedDatesUIContext } from "../BodyBuildingReserveUsedDatesUIContext";
import { BodyBuildingReserveUsedDateModel } from "../../../../../../core/_models/BodyBuilding/BodyBuildingReserveUsedDateModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BodyBuildingReserveUsedDatesTable() {
  const { t } = useTranslation();

  const bodyBuildingReserveUsedDatesUIContext = useBodyBuildingReserveUsedDatesUIContext();

  const bodyBuildingReserveUsedDatesUIProps = useMemo(() => {
    return {
      ids: bodyBuildingReserveUsedDatesUIContext.ids,
      setIds: bodyBuildingReserveUsedDatesUIContext.setIds,
      queryParams: bodyBuildingReserveUsedDatesUIContext.queryParams,
      setQueryParams: bodyBuildingReserveUsedDatesUIContext.setQueryParams,
      openEditBodyBuildingReserveUsedDatePage: bodyBuildingReserveUsedDatesUIContext.openEditBodyBuildingReserveUsedDatePage,
      openDeleteBodyBuildingReserveUsedDateDialog: bodyBuildingReserveUsedDatesUIContext.openDeleteBodyBuildingReserveUsedDateDialog,
    };
  }, [bodyBuildingReserveUsedDatesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.bodyBuildingReserveUsedDates }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BodyBuildingReserveUsedDateModel);
  const fieldKey = getFields(BodyBuildingReserveUsedDateModel);
  const fields = BodyBuildingReserveUsedDateModel;

  const dispatch = useDispatch();
  useEffect(() => {
    bodyBuildingReserveUsedDatesUIProps.setIds([]);
    dispatch(actions.fetchBodyBuildingReserveUsedDates(bodyBuildingReserveUsedDatesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyBuildingReserveUsedDatesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("BodyBuildingReserveUsedDate." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("BodyBuildingReserveUsedDate." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBodyBuildingReserveUsedDatePage: bodyBuildingReserveUsedDatesUIProps.openEditBodyBuildingReserveUsedDatePage,
        openDeleteBodyBuildingReserveUsedDateDialog: bodyBuildingReserveUsedDatesUIProps.openDeleteBodyBuildingReserveUsedDateDialog,
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
    sizePerPage: bodyBuildingReserveUsedDatesUIProps.queryParams.PageSize,
    page: bodyBuildingReserveUsedDatesUIProps.queryParams.PageNumber,
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
                  bodyBuildingReserveUsedDatesUIProps.setQueryParams
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