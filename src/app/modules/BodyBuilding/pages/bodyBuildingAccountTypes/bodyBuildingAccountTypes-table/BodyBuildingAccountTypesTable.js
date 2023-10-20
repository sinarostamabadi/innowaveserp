import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bodyBuildingAccountTypes/bodyBuildingAccountTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useBodyBuildingAccountTypesUIContext } from "../BodyBuildingAccountTypesUIContext";
import { BodyBuildingAccountTypeModel } from "../../../../../../core/_models/BodyBuilding/BodyBuildingAccountTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function BodyBuildingAccountTypesTable() {
  const { t } = useTranslation();

  const bodyBuildingAccountTypesUIContext = useBodyBuildingAccountTypesUIContext();

  const bodyBuildingAccountTypesUIProps = useMemo(() => {
    return {
      ids: bodyBuildingAccountTypesUIContext.ids,
      setIds: bodyBuildingAccountTypesUIContext.setIds,
      queryParams: bodyBuildingAccountTypesUIContext.queryParams,
      setQueryParams: bodyBuildingAccountTypesUIContext.setQueryParams,
      openEditBodyBuildingAccountTypePage: bodyBuildingAccountTypesUIContext.openEditBodyBuildingAccountTypePage,
      openDeleteBodyBuildingAccountTypeDialog: bodyBuildingAccountTypesUIContext.openDeleteBodyBuildingAccountTypeDialog,
    };
  }, [bodyBuildingAccountTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.bodyBuildingAccountTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BodyBuildingAccountTypeModel);
  const fieldKey = getFields(BodyBuildingAccountTypeModel);
  const fields = BodyBuildingAccountTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    bodyBuildingAccountTypesUIProps.setIds([]);
    dispatch(actions.fetchBodyBuildingAccountTypes(bodyBuildingAccountTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyBuildingAccountTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("BodyBuildingAccountType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("BodyBuildingAccountType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditBodyBuildingAccountTypePage: bodyBuildingAccountTypesUIProps.openEditBodyBuildingAccountTypePage,
        openDeleteBodyBuildingAccountTypeDialog: bodyBuildingAccountTypesUIProps.openDeleteBodyBuildingAccountTypeDialog,
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
    sizePerPage: bodyBuildingAccountTypesUIProps.queryParams.PageSize,
    page: bodyBuildingAccountTypesUIProps.queryParams.PageNumber,
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
                  bodyBuildingAccountTypesUIProps.setQueryParams
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