import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/restaurantMenuGroups/restaurantMenuGroupsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRestaurantMenuGroupsUIContext } from "../RestaurantMenuGroupsUIContext";
import { RestaurantMenuGroupModel } from "../../../../../../core/_models/Restaurant/RestaurantMenuGroupModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function RestaurantMenuGroupsTable() {
  const { t } = useTranslation();

  const restaurantMenuGroupsUIContext = useRestaurantMenuGroupsUIContext();

  const restaurantMenuGroupsUIProps = useMemo(() => {
    return {
      ids: restaurantMenuGroupsUIContext.ids,
      setIds: restaurantMenuGroupsUIContext.setIds,
      queryParams: restaurantMenuGroupsUIContext.queryParams,
      setQueryParams: restaurantMenuGroupsUIContext.setQueryParams,
      openEditRestaurantMenuGroupPage: restaurantMenuGroupsUIContext.openEditRestaurantMenuGroupPage,
      openDeleteRestaurantMenuGroupDialog: restaurantMenuGroupsUIContext.openDeleteRestaurantMenuGroupDialog,
    };
  }, [restaurantMenuGroupsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.restaurantMenuGroups }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RestaurantMenuGroupModel);
  const fieldKey = getFields(RestaurantMenuGroupModel);
  const fields = RestaurantMenuGroupModel;

  const dispatch = useDispatch();
  useEffect(() => {
    restaurantMenuGroupsUIProps.setIds([]);
    dispatch(actions.fetchRestaurantMenuGroups(restaurantMenuGroupsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantMenuGroupsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("RestaurantMenuGroup." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("RestaurantMenuGroup." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRestaurantMenuGroupPage: restaurantMenuGroupsUIProps.openEditRestaurantMenuGroupPage,
        openDeleteRestaurantMenuGroupDialog: restaurantMenuGroupsUIProps.openDeleteRestaurantMenuGroupDialog,
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
    sizePerPage: restaurantMenuGroupsUIProps.queryParams.PageSize,
    page: restaurantMenuGroupsUIProps.queryParams.PageNumber,
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
                  restaurantMenuGroupsUIProps.setQueryParams
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