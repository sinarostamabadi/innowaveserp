import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/monthlyEmployeeIOs/monthlyEmployeeIOsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useMonthlyEmployeeIOsUIContext } from "../MonthlyEmployeeIOsUIContext";
import { MonthlyEmployeeIOModel } from "../../../../../../core/_models/Employment/MonthlyEmployeeIOModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function MonthlyEmployeeIOsTable() {
  const { t } = useTranslation();

  const monthlyEmployeeIOsUIContext = useMonthlyEmployeeIOsUIContext();

  const monthlyEmployeeIOsUIProps = useMemo(() => {
    return {
      ids: monthlyEmployeeIOsUIContext.ids,
      setIds: monthlyEmployeeIOsUIContext.setIds,
      queryParams: monthlyEmployeeIOsUIContext.queryParams,
      setQueryParams: monthlyEmployeeIOsUIContext.setQueryParams,
      openEditMonthlyEmployeeIOPage: monthlyEmployeeIOsUIContext.openEditMonthlyEmployeeIOPage,
      openDeleteMonthlyEmployeeIODialog: monthlyEmployeeIOsUIContext.openDeleteMonthlyEmployeeIODialog,
    };
  }, [monthlyEmployeeIOsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.monthlyEmployeeIOs }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(MonthlyEmployeeIOModel);
  const fieldKey = getFields(MonthlyEmployeeIOModel);
  const fields = MonthlyEmployeeIOModel;

  const dispatch = useDispatch();
  useEffect(() => {
    monthlyEmployeeIOsUIProps.setIds([]);
    dispatch(actions.fetchMonthlyEmployeeIOs(monthlyEmployeeIOsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthlyEmployeeIOsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("MonthlyEmployeeIO." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("MonthlyEmployeeIO." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditMonthlyEmployeeIOPage: monthlyEmployeeIOsUIProps.openEditMonthlyEmployeeIOPage,
        openDeleteMonthlyEmployeeIODialog: monthlyEmployeeIOsUIProps.openDeleteMonthlyEmployeeIODialog,
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
    sizePerPage: monthlyEmployeeIOsUIProps.queryParams.PageSize,
    page: monthlyEmployeeIOsUIProps.queryParams.PageNumber,
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
                  monthlyEmployeeIOsUIProps.setQueryParams
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