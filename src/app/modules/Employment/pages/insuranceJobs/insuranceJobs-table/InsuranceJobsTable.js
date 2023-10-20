import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/insuranceJobs/insuranceJobsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useInsuranceJobsUIContext } from "../InsuranceJobsUIContext";
import { InsuranceJobModel } from "../../../../../../core/_models/Employment/InsuranceJobModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function InsuranceJobsTable() {
  const { t } = useTranslation();

  const insuranceJobsUIContext = useInsuranceJobsUIContext();

  const insuranceJobsUIProps = useMemo(() => {
    return {
      ids: insuranceJobsUIContext.ids,
      setIds: insuranceJobsUIContext.setIds,
      queryParams: insuranceJobsUIContext.queryParams,
      setQueryParams: insuranceJobsUIContext.setQueryParams,
      openEditInsuranceJobPage: insuranceJobsUIContext.openEditInsuranceJobPage,
      openDeleteInsuranceJobDialog: insuranceJobsUIContext.openDeleteInsuranceJobDialog,
    };
  }, [insuranceJobsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.insuranceJobs }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(InsuranceJobModel);
  const fieldKey = getFields(InsuranceJobModel);
  const fields = InsuranceJobModel;

  const dispatch = useDispatch();
  useEffect(() => {
    insuranceJobsUIProps.setIds([]);
    dispatch(actions.fetchInsuranceJobs(insuranceJobsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insuranceJobsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("InsuranceJob." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("InsuranceJob." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditInsuranceJobPage: insuranceJobsUIProps.openEditInsuranceJobPage,
        openDeleteInsuranceJobDialog: insuranceJobsUIProps.openDeleteInsuranceJobDialog,
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
    sizePerPage: insuranceJobsUIProps.queryParams.PageSize,
    page: insuranceJobsUIProps.queryParams.PageNumber,
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
                  insuranceJobsUIProps.setQueryParams
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