import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/restaurantCostTypes/restaurantCostTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useRestaurantCostTypesUIContext } from "../RestaurantCostTypesUIContext";
import { RestaurantCostTypeModel } from "../../../../../../core/_models/Restaurant/RestaurantCostTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function RestaurantCostTypesTable() {
  const { t } = useTranslation();

  const restaurantCostTypesUIContext = useRestaurantCostTypesUIContext();

  const restaurantCostTypesUIProps = useMemo(() => {
    return {
      ids: restaurantCostTypesUIContext.ids,
      setIds: restaurantCostTypesUIContext.setIds,
      queryParams: restaurantCostTypesUIContext.queryParams,
      setQueryParams: restaurantCostTypesUIContext.setQueryParams,
      openEditRestaurantCostTypePage: restaurantCostTypesUIContext.openEditRestaurantCostTypePage,
      openDeleteRestaurantCostTypeDialog: restaurantCostTypesUIContext.openDeleteRestaurantCostTypeDialog,
    };
  }, [restaurantCostTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.restaurantCostTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(RestaurantCostTypeModel);
  const fieldKey = getFields(RestaurantCostTypeModel);
  const fields = RestaurantCostTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    restaurantCostTypesUIProps.setIds([]);
    dispatch(actions.fetchRestaurantCostTypes(restaurantCostTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantCostTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("RestaurantCostType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("RestaurantCostType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRestaurantCostTypePage: restaurantCostTypesUIProps.openEditRestaurantCostTypePage,
        openDeleteRestaurantCostTypeDialog: restaurantCostTypesUIProps.openDeleteRestaurantCostTypeDialog,
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
    sizePerPage: restaurantCostTypesUIProps.queryParams.PageSize,
    page: restaurantCostTypesUIProps.queryParams.PageNumber,
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
                  restaurantCostTypesUIProps.setQueryParams
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