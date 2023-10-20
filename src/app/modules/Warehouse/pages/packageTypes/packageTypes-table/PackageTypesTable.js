import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/packageTypes/packageTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { usePackageTypesUIContext } from "../PackageTypesUIContext";
import { PackageTypeModel } from "../../../../../../core/_models/Warehouse/PackageTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function PackageTypesTable() {
  const { t } = useTranslation();

  const packageTypesUIContext = usePackageTypesUIContext();

  const packageTypesUIProps = useMemo(() => {
    return {
      ids: packageTypesUIContext.ids,
      setIds: packageTypesUIContext.setIds,
      queryParams: packageTypesUIContext.queryParams,
      setQueryParams: packageTypesUIContext.setQueryParams,
      openEditPackageTypePage: packageTypesUIContext.openEditPackageTypePage,
      openDeletePackageTypeDialog: packageTypesUIContext.openDeletePackageTypeDialog,
    };
  }, [packageTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.packageTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(PackageTypeModel);
  const fieldKey = getFields(PackageTypeModel);
  const fields = PackageTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    packageTypesUIProps.setIds([]);
    dispatch(actions.fetchPackageTypes(packageTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packageTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.Title,
      text: t("PackageType." + fields.Title.display),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPackageTypePage: packageTypesUIProps.openEditPackageTypePage,
        openDeletePackageTypeDialog: packageTypesUIProps.openDeletePackageTypeDialog,
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
    sizePerPage: packageTypesUIProps.queryParams.PageSize,
    page: packageTypesUIProps.queryParams.PageNumber,
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
                  packageTypesUIProps.setQueryParams
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