import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/entityPoints/entityPointsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useEntityPointsUIContext } from "../EntityPointsUIContext";
import { EntityPointModel } from "../../../../../../core/_models/Crm";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function EntityPointsTable() {
  const { t } = useTranslation();

  const entityPointsUIContext = useEntityPointsUIContext();

  const entityPointsUIProps = useMemo(() => {
    return {
      ids: entityPointsUIContext.ids,
      setIds: entityPointsUIContext.setIds,
      queryParams: entityPointsUIContext.queryParams,
      setQueryParams: entityPointsUIContext.setQueryParams,
      openEditEntityPointPage: entityPointsUIContext.openEditEntityPointPage,
      openDeleteEntityPointDialog:
        entityPointsUIContext.openDeleteEntityPointDialog,
    };
  }, [entityPointsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.entityPoints }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(EntityPointModel);
  const fieldKey = getFields(EntityPointModel);
  const fields = EntityPointModel;

  const dispatch = useDispatch();
  useEffect(() => {
    entityPointsUIProps.setIds([]);
    dispatch(actions.fetchEntityPoints(entityPointsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityPointsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: "Entity.Title",
      text: t("EntityPoint.Entity"),
      sort: fields.EntityId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Point,
      text: t("EntityPoint." + fields.Point.display),
      sort: fields.Point.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Price,
      text: t("EntityPoint." + fields.Price.display),
      sort: fields.Price.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditEntityPointPage: entityPointsUIProps.openEditEntityPointPage,
        openDeleteEntityPointDialog:
          entityPointsUIProps.openDeleteEntityPointDialog,
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
    sizePerPage: entityPointsUIProps.queryParams.PageSize,
    page: entityPointsUIProps.queryParams.PageNumber,
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
                  entityPointsUIProps.setQueryParams
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
