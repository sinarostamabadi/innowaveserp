import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/physicalConditionTypes/physicalConditionTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { usePhysicalConditionTypesUIContext } from "../PhysicalConditionTypesUIContext";
import { PhysicalConditionTypeModel } from "../../../../../../core/_models/Employment/PhysicalConditionTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function PhysicalConditionTypesTable() {
  const { t } = useTranslation();

  const physicalConditionTypesUIContext = usePhysicalConditionTypesUIContext();

  const physicalConditionTypesUIProps = useMemo(() => {
    return {
      ids: physicalConditionTypesUIContext.ids,
      setIds: physicalConditionTypesUIContext.setIds,
      queryParams: physicalConditionTypesUIContext.queryParams,
      setQueryParams: physicalConditionTypesUIContext.setQueryParams,
      openEditPhysicalConditionTypePage:
        physicalConditionTypesUIContext.openEditPhysicalConditionTypePage,
      openDeletePhysicalConditionTypeDialog:
        physicalConditionTypesUIContext.openDeletePhysicalConditionTypeDialog,
    };
  }, [physicalConditionTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.physicalConditionTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(PhysicalConditionTypeModel);
  const fieldKey = getFields(PhysicalConditionTypeModel);
  const fields = PhysicalConditionTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    physicalConditionTypesUIProps.setIds([]);
    dispatch(
      actions.fetchPhysicalConditionTypes(
        physicalConditionTypesUIProps.queryParams
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [physicalConditionTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("PhysicalConditionType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("PhysicalConditionType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPhysicalConditionTypePage:
          physicalConditionTypesUIProps.openEditPhysicalConditionTypePage,
        openDeletePhysicalConditionTypeDialog:
          physicalConditionTypesUIProps.openDeletePhysicalConditionTypeDialog,
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
    sizePerPage: physicalConditionTypesUIProps.queryParams.PageSize,
    page: physicalConditionTypesUIProps.queryParams.PageNumber,
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
                  physicalConditionTypesUIProps.setQueryParams
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
