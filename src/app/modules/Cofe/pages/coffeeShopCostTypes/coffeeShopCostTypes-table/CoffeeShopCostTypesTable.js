import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/coffeeShopCostTypes/coffeeShopCostTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useCoffeeShopCostTypesUIContext } from "../CoffeeShopCostTypesUIContext";
import { CoffeeShopCostTypeModel } from "../../../../../../core/_models/Cofe/CoffeeShopCostTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function CoffeeShopCostTypesTable() {
  const { t } = useTranslation();

  const coffeeShopCostTypesUIContext = useCoffeeShopCostTypesUIContext();

  const coffeeShopCostTypesUIProps = useMemo(() => {
    return {
      ids: coffeeShopCostTypesUIContext.ids,
      setIds: coffeeShopCostTypesUIContext.setIds,
      queryParams: coffeeShopCostTypesUIContext.queryParams,
      setQueryParams: coffeeShopCostTypesUIContext.setQueryParams,
      openEditCoffeeShopCostTypePage: coffeeShopCostTypesUIContext.openEditCoffeeShopCostTypePage,
      openDeleteCoffeeShopCostTypeDialog: coffeeShopCostTypesUIContext.openDeleteCoffeeShopCostTypeDialog,
    };
  }, [coffeeShopCostTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.coffeeShopCostTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(CoffeeShopCostTypeModel);
  const fieldKey = getFields(CoffeeShopCostTypeModel);
  const fields = CoffeeShopCostTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    coffeeShopCostTypesUIProps.setIds([]);
    dispatch(actions.fetchCoffeeShopCostTypes(coffeeShopCostTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffeeShopCostTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("CoffeeShopCostType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("CoffeeShopCostType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCoffeeShopCostTypePage: coffeeShopCostTypesUIProps.openEditCoffeeShopCostTypePage,
        openDeleteCoffeeShopCostTypeDialog: coffeeShopCostTypesUIProps.openDeleteCoffeeShopCostTypeDialog,
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
    sizePerPage: coffeeShopCostTypesUIProps.queryParams.PageSize,
    page: coffeeShopCostTypesUIProps.queryParams.PageNumber,
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
                  coffeeShopCostTypesUIProps.setQueryParams
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