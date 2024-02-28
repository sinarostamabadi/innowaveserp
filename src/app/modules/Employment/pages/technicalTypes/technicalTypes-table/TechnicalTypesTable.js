import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/technicalTypes/technicalTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useTechnicalTypesUIContext } from "../TechnicalTypesUIContext";
import { TechnicalTypeModel } from "../../../../../../core/_models/Employment/TechnicalTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function TechnicalTypesTable() {
  const { t } = useTranslation();

  const technicalTypesUIContext = useTechnicalTypesUIContext();

  const technicalTypesUIProps = useMemo(() => {
    return {
      ids: technicalTypesUIContext.ids,
      setIds: technicalTypesUIContext.setIds,
      queryParams: technicalTypesUIContext.queryParams,
      setQueryParams: technicalTypesUIContext.setQueryParams,
      openEditTechnicalTypePage:
        technicalTypesUIContext.openEditTechnicalTypePage,
      openDeleteTechnicalTypeDialog:
        technicalTypesUIContext.openDeleteTechnicalTypeDialog,
    };
  }, [technicalTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.technicalTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(TechnicalTypeModel);
  const fieldKey = getFields(TechnicalTypeModel);
  const fields = TechnicalTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    technicalTypesUIProps.setIds([]);
    dispatch(actions.fetchTechnicalTypes(technicalTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [technicalTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("TechnicalType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("TechnicalType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditTechnicalTypePage:
          technicalTypesUIProps.openEditTechnicalTypePage,
        openDeleteTechnicalTypeDialog:
          technicalTypesUIProps.openDeleteTechnicalTypeDialog,
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
    sizePerPage: technicalTypesUIProps.queryParams.PageSize,
    page: technicalTypesUIProps.queryParams.PageNumber,
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
                  technicalTypesUIProps.setQueryParams
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
