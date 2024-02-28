import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeeRewardPenalties/employeeRewardPenaltiesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEmployeeRewardPenaltiesUIContext } from "../EmployeeRewardPenaltiesUIContext";
import { EmployeeRewardPenaltyModel } from "../../../../../../core/_models/Employment/EmployeeRewardPenaltyModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmployeeRewardPenaltiesTable() {
  const { t } = useTranslation();

  const employeeRewardPenaltiesUIContext =
    useEmployeeRewardPenaltiesUIContext();

  const employeeRewardPenaltiesUIProps = useMemo(() => {
    return {
      ids: employeeRewardPenaltiesUIContext.ids,
      setIds: employeeRewardPenaltiesUIContext.setIds,
      queryParams: employeeRewardPenaltiesUIContext.queryParams,
      setQueryParams: employeeRewardPenaltiesUIContext.setQueryParams,
      openEditEmployeeRewardPenaltyPage:
        employeeRewardPenaltiesUIContext.openEditEmployeeRewardPenaltyPage,
      openDeleteEmployeeRewardPenaltyDialog:
        employeeRewardPenaltiesUIContext.openDeleteEmployeeRewardPenaltyDialog,
    };
  }, [employeeRewardPenaltiesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employeeRewardPenalties }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EmployeeRewardPenaltyModel);
  const fieldKey = getFields(EmployeeRewardPenaltyModel);
  const fields = EmployeeRewardPenaltyModel;

  const dispatch = useDispatch();
  useEffect(() => {
    employeeRewardPenaltiesUIProps.setIds([]);
    dispatch(
      actions.fetchEmployeeRewardPenalties(
        employeeRewardPenaltiesUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeRewardPenaltiesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("EmployeeRewardPenalty." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("EmployeeRewardPenalty." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeeRewardPenaltyPage:
          employeeRewardPenaltiesUIProps.openEditEmployeeRewardPenaltyPage,
        openDeleteEmployeeRewardPenaltyDialog:
          employeeRewardPenaltiesUIProps.openDeleteEmployeeRewardPenaltyDialog,
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
    sizePerPage: employeeRewardPenaltiesUIProps.queryParams.PageSize,
    page: employeeRewardPenaltiesUIProps.queryParams.PageNumber,
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
                  employeeRewardPenaltiesUIProps.setQueryParams
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
