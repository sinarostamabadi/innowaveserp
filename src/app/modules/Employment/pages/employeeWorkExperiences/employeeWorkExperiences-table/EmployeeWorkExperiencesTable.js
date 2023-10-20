import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employeeWorkExperiences/employeeWorkExperiencesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEmployeeWorkExperiencesUIContext } from "../EmployeeWorkExperiencesUIContext";
import { EmployeeWorkExperienceModel } from "../../../../../../core/_models/Employment/EmployeeWorkExperienceModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmployeeWorkExperiencesTable() {
  const { t } = useTranslation();

  const employeeWorkExperiencesUIContext = useEmployeeWorkExperiencesUIContext();

  const employeeWorkExperiencesUIProps = useMemo(() => {
    return {
      ids: employeeWorkExperiencesUIContext.ids,
      setIds: employeeWorkExperiencesUIContext.setIds,
      queryParams: employeeWorkExperiencesUIContext.queryParams,
      setQueryParams: employeeWorkExperiencesUIContext.setQueryParams,
      openEditEmployeeWorkExperiencePage: employeeWorkExperiencesUIContext.openEditEmployeeWorkExperiencePage,
      openDeleteEmployeeWorkExperienceDialog: employeeWorkExperiencesUIContext.openDeleteEmployeeWorkExperienceDialog,
    };
  }, [employeeWorkExperiencesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employeeWorkExperiences }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EmployeeWorkExperienceModel);
  const fieldKey = getFields(EmployeeWorkExperienceModel);
  const fields = EmployeeWorkExperienceModel;

  const dispatch = useDispatch();
  useEffect(() => {
    employeeWorkExperiencesUIProps.setIds([]);
    dispatch(actions.fetchEmployeeWorkExperiences(employeeWorkExperiencesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeWorkExperiencesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("EmployeeWorkExperience." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("EmployeeWorkExperience." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmployeeWorkExperiencePage: employeeWorkExperiencesUIProps.openEditEmployeeWorkExperiencePage,
        openDeleteEmployeeWorkExperienceDialog: employeeWorkExperiencesUIProps.openDeleteEmployeeWorkExperienceDialog,
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
    sizePerPage: employeeWorkExperiencesUIProps.queryParams.PageSize,
    page: employeeWorkExperiencesUIProps.queryParams.PageNumber,
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
                  employeeWorkExperiencesUIProps.setQueryParams
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