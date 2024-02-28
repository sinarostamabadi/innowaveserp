import { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/TimeSets/TimeSetsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "src/core/_helpers";
import { DataFormatter, TimeColumnFormatter } from "src/core/_formatters";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "src/core/_partials/controls";
import { useTimeSetsUIContext } from "../TimeSetsUIContext";
import { BodyBuildingTimeSetModel } from "src/core/_models/BodyBuilding/BodyBuildingTimeSetModel";
import { getConfig, getFields } from "src/core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function TimeSetsTable() {
  const { t } = useTranslation();
  const days = {
    7: t("Common.Saturday"),
    1: t("Common.Sunday"),
    2: t("Common.Monday"),
    3: t("Common.Tuesday"),
    4: t("Common.Wednesday"),
    5: t("Common.Thursday"),
    6: t("Common.Friday"),
  };
  const timeSetsUIContext = useTimeSetsUIContext();

  const timeSetsUIProps = useMemo(() => {
    return {
      ids: timeSetsUIContext.ids,
      setIds: timeSetsUIContext.setIds,
      queryParams: timeSetsUIContext.queryParams,
      setQueryParams: timeSetsUIContext.setQueryParams,
      openEditTimeSetPage: timeSetsUIContext.openEditTimeSetPage,
      openDeleteTimeSetDialog: timeSetsUIContext.openDeleteTimeSetDialog,
    };
  }, [timeSetsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.timeSets }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BodyBuildingTimeSetModel);
  const fieldKey = getFields(BodyBuildingTimeSetModel);
  const fields = BodyBuildingTimeSetModel;

  const dispatch = useDispatch();
  useEffect(() => {
    timeSetsUIProps.setIds([]);
    dispatch(actions.fetchTimeSets(timeSetsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeSetsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("BodyBuildingTimeSet." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.DayId,
      text: t("BodyBuildingTimeSet.Day"),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
      formatter: DataFormatter,
      formatExtraData: { data: days },
    },
    {
      dataField: fieldKey.Gender,
      text: t("BodyBuildingTimeSet." + fields.Gender.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
      formatter: DataFormatter,
      formatExtraData: { data: { 0: t("Common.Female"), 1: t("Common.Male") } },
    },
    {
      dataField: fieldKey.FromTime,
      text: t("BodyBuildingTimeSet." + fields.FromTime.display),
      sort: fields.FromTime.sortable,
      sortCaret: sortCaret,
      formatter: TimeColumnFormatter,
    },
    {
      dataField: fieldKey.ToTime,
      text: t("BodyBuildingTimeSet." + fields.ToTime.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
      formatter: TimeColumnFormatter,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditTimeSetPage: timeSetsUIProps.openEditTimeSetPage,
        openDeleteTimeSetDialog: timeSetsUIProps.openDeleteTimeSetDialog,
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
    sizePerPage: timeSetsUIProps.queryParams.PageSize,
    page: timeSetsUIProps.queryParams.PageNumber,
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
                  timeSetsUIProps.setQueryParams
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
