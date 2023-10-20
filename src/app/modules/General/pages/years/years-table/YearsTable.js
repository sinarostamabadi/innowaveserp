import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/years/yearsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useYearsUIContext } from "../YearsUIContext";
import { YearModel } from "../../../../../../core/_models/General/YearModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";
import { DateFaColumnFormatter } from "../../../../../../core/_formatters";

export function YearsTable() {
  const { t } = useTranslation();

  const yearsUIContext = useYearsUIContext();

  const yearsUIProps = useMemo(() => {
    return {
      ids: yearsUIContext.ids,
      setIds: yearsUIContext.setIds,
      queryParams: yearsUIContext.queryParams,
      setQueryParams: yearsUIContext.setQueryParams,
      openEditYearPage: yearsUIContext.openEditYearPage,
      openDeleteYearDialog: yearsUIContext.openDeleteYearDialog,
    };
  }, [yearsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.years }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(YearModel);
  const fieldKey = getFields(YearModel);
  const fields = YearModel;

  const dispatch = useDispatch();
  useEffect(() => {
    yearsUIProps.setIds([]);
    dispatch(actions.fetchYears(yearsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("Year." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.FromDate,
      text: t("Year." + fields.FromDate.display),
      sort: fields.FromDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: fieldKey.ToDate,
      text: t("Year." + fields.ToDate.display),
      sort: fields.ToDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditYearPage: yearsUIProps.openEditYearPage,
        openDeleteYearDialog: yearsUIProps.openDeleteYearDialog,
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
    sizePerPage: yearsUIProps.queryParams.PageSize,
    page: yearsUIProps.queryParams.PageNumber,
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
                  yearsUIProps.setQueryParams
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