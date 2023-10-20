import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employmentTypes/employmentTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEmploymentTypesUIContext } from "../EmploymentTypesUIContext";
import { EmploymentTypeModel } from "../../../../../../core/_models/Employment/EmploymentTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EmploymentTypesTable() {
  const { t } = useTranslation();

  const employmentTypesUIContext = useEmploymentTypesUIContext();

  const employmentTypesUIProps = useMemo(() => {
    return {
      ids: employmentTypesUIContext.ids,
      setIds: employmentTypesUIContext.setIds,
      queryParams: employmentTypesUIContext.queryParams,
      setQueryParams: employmentTypesUIContext.setQueryParams,
      openEditEmploymentTypePage: employmentTypesUIContext.openEditEmploymentTypePage,
      openDeleteEmploymentTypeDialog: employmentTypesUIContext.openDeleteEmploymentTypeDialog,
    };
  }, [employmentTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.employmentTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EmploymentTypeModel);
  const fieldKey = getFields(EmploymentTypeModel);
  const fields = EmploymentTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    employmentTypesUIProps.setIds([]);
    dispatch(actions.fetchEmploymentTypes(employmentTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employmentTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("EmploymentType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("EmploymentType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEmploymentTypePage: employmentTypesUIProps.openEditEmploymentTypePage,
        openDeleteEmploymentTypeDialog: employmentTypesUIProps.openDeleteEmploymentTypeDialog,
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
    sizePerPage: employmentTypesUIProps.queryParams.PageSize,
    page: employmentTypesUIProps.queryParams.PageNumber,
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
                  employmentTypesUIProps.setQueryParams
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