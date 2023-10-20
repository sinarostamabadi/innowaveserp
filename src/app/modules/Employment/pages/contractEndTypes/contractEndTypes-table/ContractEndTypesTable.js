import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/contractEndTypes/contractEndTypesActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../core/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../core/_partials/controls";
import { useContractEndTypesUIContext } from "../ContractEndTypesUIContext";
import { ContractEndTypeModel } from "../../../../../../core/_models/Employment/ContractEndTypeModel";
import {
  getConfig,
  getFields,
} from "../../../../../../core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ContractEndTypesTable() {
  const { t } = useTranslation();

  const contractEndTypesUIContext = useContractEndTypesUIContext();

  const contractEndTypesUIProps = useMemo(() => {
    return {
      ids: contractEndTypesUIContext.ids,
      setIds: contractEndTypesUIContext.setIds,
      queryParams: contractEndTypesUIContext.queryParams,
      setQueryParams: contractEndTypesUIContext.setQueryParams,
      openEditContractEndTypePage: contractEndTypesUIContext.openEditContractEndTypePage,
      openDeleteContractEndTypeDialog: contractEndTypesUIContext.openDeleteContractEndTypeDialog,
    };
  }, [contractEndTypesUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.contractEndTypes }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(ContractEndTypeModel);
  const fieldKey = getFields(ContractEndTypeModel);
  const fields = ContractEndTypeModel;

  const dispatch = useDispatch();
  useEffect(() => {
    contractEndTypesUIProps.setIds([]);
    dispatch(actions.fetchContractEndTypes(contractEndTypesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractEndTypesUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: fieldKey.TitleFa,
      text: t("ContractEndType." + fields.TitleFa.display),
      sort: fields.TitleFa.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.TitleEn,
      text: t("ContractEndType." + fields.TitleEn.display),
      sort: fields.TitleEn.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditContractEndTypePage: contractEndTypesUIProps.openEditContractEndTypePage,
        openDeleteContractEndTypeDialog: contractEndTypesUIProps.openDeleteContractEndTypeDialog,
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
    sizePerPage: contractEndTypesUIProps.queryParams.PageSize,
    page: contractEndTypesUIProps.queryParams.PageNumber,
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
                  contractEndTypesUIProps.setQueryParams
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