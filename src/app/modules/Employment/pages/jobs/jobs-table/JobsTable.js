import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/jobs/jobsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useJobsUIContext } from "../JobsUIContext";
import { JobModel } from "../../../../../../core/_models/Employment/JobModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function JobsTable() {
  const { t } = useTranslation();

  const jobsUIContext = useJobsUIContext();

  const jobsUIProps = useMemo(() => {
    return {
      ids: jobsUIContext.ids,
      setIds: jobsUIContext.setIds,
      queryParams: jobsUIContext.queryParams,
      setQueryParams: jobsUIContext.setQueryParams,
      openEditJobPage: jobsUIContext.openEditJobPage,
      openDeleteJobDialog: jobsUIContext.openDeleteJobDialog,
    };
  }, [jobsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.jobs }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(JobModel);
  const fieldKey = getFields(JobModel);
  const fields = JobModel;

  const dispatch = useDispatch();
  useEffect(() => {
    jobsUIProps.setIds([]);
    dispatch(actions.fetchJobs(jobsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("Job." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("Job." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditJobPage: jobsUIProps.openEditJobPage,
        openDeleteJobDialog: jobsUIProps.openDeleteJobDialog,
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
    sizePerPage: jobsUIProps.queryParams.PageSize,
    page: jobsUIProps.queryParams.PageNumber,
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
                  jobsUIProps.setQueryParams
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