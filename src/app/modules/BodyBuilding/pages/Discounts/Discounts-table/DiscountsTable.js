import { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Discounts/DiscountsActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "src/core/_helpers";
import {
  MoneyColumnFormatter,
  TimeColumnFormatter,
  DateFaColumnFormatter,
} from "src/core/_formatters";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "src/core/_partials/controls";
import { useDiscountsUIContext } from "../DiscountsUIContext";
import { BodyBuildingDiscountModel } from "src/core/_models/BodyBuilding/BodyBuildingDiscountModel";
import { getConfig, getFields } from "src/core/_models/ModelDescriber";
import { useTranslation } from "react-i18next";

export function DiscountsTable() {
  const { t } = useTranslation();
  const discountsUIContext = useDiscountsUIContext();

  const discountsUIProps = useMemo(() => {
    return {
      ids: discountsUIContext.ids,
      setIds: discountsUIContext.setIds,
      queryParams: discountsUIContext.queryParams,
      setQueryParams: discountsUIContext.setQueryParams,
      openEditDiscountPage: discountsUIContext.openEditDiscountPage,
      openDeleteDiscountDialog: discountsUIContext.openDeleteDiscountDialog,
    };
  }, [discountsUIContext]);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.bodyBuildingDiscounts }),
    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;
  const configs = getConfig(BodyBuildingDiscountModel);
  const fieldKey = getFields(BodyBuildingDiscountModel);
  const fields = BodyBuildingDiscountModel;

  const dispatch = useDispatch();
  useEffect(() => {
    discountsUIProps.setIds([]);
    dispatch(actions.fetchDiscounts(discountsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountsUIProps.queryParams, dispatch]);

  const columns = [
    {
      dataField: "Title",
      text: t("BodyBuildingDiscount.Title"),
      sort: fields.Title.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "Person.FullNameFa",
      text: t("BodyBuildingDiscount.Person"),
      sort: fields.PersonId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "PersonGroup.Title",
      text: t("BodyBuildingDiscount.PersonGroup"),
      sort: fields.PersonGroupId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "BodyBuildingTimeSet.Title",
      text: t("BodyBuildingDiscount.BodyBuildingTimeSet"),
      sort: fields.BodyBuildingTimeSetId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "FromDate",
      text: t("BodyBuildingDiscount.FromDate"),
      sort: fields.FromDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: "ToDate",
      text: t("BodyBuildingDiscount.ToDate"),
      sort: fields.ToDate.sortable,
      sortCaret: sortCaret,
      formatter: DateFaColumnFormatter,
    },
    {
      dataField: "FromTime",
      text: t("BodyBuildingDiscount.FromTime"),
      sort: fields.FromTime.sortable,
      sortCaret: sortCaret,
      formatter: TimeColumnFormatter,
    },
    {
      dataField: "ToTime",
      text: t("BodyBuildingDiscount.ToTime"),
      sort: fields.ToTime.sortable,
      sortCaret: sortCaret,
      formatter: TimeColumnFormatter,
    },
    {
      dataField: "BodyBuildingPack.Title",
      text: t("BodyBuildingDiscount.BodyBuildingPack"),
      sort: fields.BodyBuildingPackId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "BodyBuildingService.Title",
      text: t("BodyBuildingDiscount.BodyBuildingService"),
      sort: fields.BodyBuildingServiceId.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "DiscountPercent",
      text: t("BodyBuildingDiscount.DiscountPercent"),
      sort: fields.DiscountPercent.sortable,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditDiscountPage: discountsUIProps.openEditDiscountPage,
        openDeleteDiscountDialog: discountsUIProps.openDeleteDiscountDialog,
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
    sizePerPage: discountsUIProps.queryParams.PageSize,
    page: discountsUIProps.queryParams.PageNumber,
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
                  discountsUIProps.setQueryParams
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
