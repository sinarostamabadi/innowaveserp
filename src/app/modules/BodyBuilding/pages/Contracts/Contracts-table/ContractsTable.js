import { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Contracts/ContractsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "src/core/_helpers";
import * as columnFormatters from "./column-formatters";
import { DataFormatter, DateFaColumnFormatter } from "src/core/_formatters";
import { Pagination } from "src/core/_partials/controls";
import { useContractsUIContext } from "../ContractsUIContext";
import { BodyBuildingContractModel } from "src/core/_models/BodyBuilding/BodyBuildingContractModel";
import { getConfig, getFields } from "src/core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function ContractsTable() {
  const { t } = useTranslation();

  const uiContext = useContractsUIContext();

  const uiProps = useMemo(() => {
    return {
      ids: uiContext.ids,
      setIds: uiContext.setIds,
      queryParams: uiContext.queryParams,
      setQueryParams: uiContext.setQueryParams,
      openEditContractPage: uiContext.openEditContractPage,
      openDeleteContractDialog: uiContext.openDeleteContractDialog,
      openShowContractDialog: uiContext.openShowContractDialog
    };
  }, [uiContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.contracts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BodyBuildingContractModel);
  const fieldKey = getFields(BodyBuildingContractModel);
  const fields = BodyBuildingContractModel;

  const dispatch = useDispatch();

  useEffect(() => {
    uiProps.setIds([]);
    dispatch(actions.fetchContracts(uiProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiProps.queryParams, dispatch]);

  const bloodGroups = {
    1: "A+",
    2: "A-",
    3: "B+",
    4: "B-",
    5: "AB+",
    6: "AB-",
    7: "O+",
    8: "O-",
  };

  const columns = [
    {
      dataField: "Person.FullNameFa",
      text: t("BodyBuildingContract.Person"),
      sort: fields.PersonId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Weight,
      text: t("BodyBuildingContract." + fields.Weight.display),
      sort: fields.Weight.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.Height,
      text: t("BodyBuildingContract." + fields.Height.display),
      sort: fields.Height.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: fieldKey.BloodGroup,
      text: t("BodyBuildingContract." + fields.BloodGroup.display),
      sort: fields.BloodGroup.sortable,
      sortCaret: sortCaret,
      formatter: DataFormatter,
      formatExtraData: { data: bloodGroups },
    },
    {
      dataField: fieldKey.FromDate,
      text: t("BodyBuildingContract." + fields.FromDate.display),
      sort: fields.FromDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: fieldKey.ToDate,
      text: t("BodyBuildingContract." + fields.ToDate.display),
      sort: fields.ToDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditContractPage: uiProps.openEditContractPage,
        openDeleteContractDialog: uiProps.openDeleteContractDialog,
        openShowContractDialog: uiProps.openShowContractDialog,
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
    sizePerPage: uiProps.queryParams.PageSize,
    page: uiProps.queryParams.PageNumber,
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
                onTableChange={getHandlerTableChange(uiProps.setQueryParams)}
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
