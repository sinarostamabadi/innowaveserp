import { useMemo } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { useTranslation } from "react-i18next";
import { NoRecordsFoundMessage, PleaseWaitMessage } from "src/core/_helpers";
import { useBalanceContext } from "./Context";
import { ActionsColumnFormatter } from "./ActionsColumnFormatter"
export const Table = () => {
    const { t } = useTranslation();
    const context = useBalanceContext();
    const { items, levelColumns, setFilters, setSteps } = useMemo(() => {
        return {
            items: context.items,
            filters: context.filters,
            setFilters: context.setFilters,
            readyToPrint: context.readyToPrint,
            levelColumns: context.levelColumns,
            setSteps: context.setSteps,
        };
    }, [context]);

    const columns = [
        {
            dataField: "FullCode",
            text: t("Reports.Balance.FullCode"),
            sort: false
        },
        {
            dataField: "FullTitle",
            text: t("Reports.Balance.FullTitle"),
            sort: false
        },
        ...levelColumns,
        {
            dataField: "AccountFloatingTitle",
            text: t("Reports.Balance.AccountFloatingTitle"),
            sort: false
        },
        {
            dataField: "action",
            text: t("Common.Action"),
            formatter: ActionsColumnFormatter,
            formatExtraData: {
                goLevel: (level) => {
                    setFilters(prevState => ({
                        ...prevState,
                        ReportLevel: level.LevelReport,
                        FromAccountId: level.AccountId,
                        ToAccountId: level.AccountId,
                    }))
                },
                setSteps: setSteps,
                t: t,
            },
            classes: "text-right pr-0",
            headerClasses: "text-right pr-3",
            style: {
                minWidth: "50px",
            },
        }
    ]

    return (
        <BootstrapTable
            wrapperClasses="table-responsive"
            classes="table table-head-custom table-vertical-center"
            bootstrap4
            bordered={false}
            remote
            keyField='AccountId'
            data={items === null ? [] : items}
            columns={columns}
        >
            <PleaseWaitMessage entities={items} />
            <NoRecordsFoundMessage entities={items} />
        </BootstrapTable>
    );
}