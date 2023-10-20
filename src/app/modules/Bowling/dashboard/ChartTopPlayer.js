/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useState, useEffect } from "react";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "src/core/_helpers";
import { useHtmlClassService } from "src/core/layout";
import { topPlayer } from "../_redux/reports/reports";
import { useTranslation } from "react-i18next";

export function ChartTopPlayer({ id, className, symbolShape, baseColor , mode, title, description}) {
  const {t} = useTranslation();
  const uiService = useHtmlClassService();
  const [ data, setData ] = useState({Scores: [], Persons: []});

  useEffect(() => {
    topPlayer(mode).then(({data}) => setData({Scores: data.map(x=> x.TotalScore), Persons: data.map(x=> x.PersonName)}));
  }, []);

  const layoutProps = useMemo(() => {
    return {
      colorsGrayGray500: objectPath.get(
        uiService.config,
        "js.colors.gray.gray500"
      ),
      colorsGrayGray200: objectPath.get(
        uiService.config,
        "js.colors.gray.gray200"
      ),
      colorsGrayGray300: objectPath.get(
        uiService.config,
        "js.colors.gray.gray300"
      ),
      colorsThemeBaseSuccess: objectPath.get(
        uiService.config,
        `js.colors.theme.base.${baseColor}`
      ),
      colorsThemeLightSuccess: objectPath.get(
        uiService.config,
        `js.colors.theme.base.${baseColor}`
      ),
      fontFamily: objectPath.get(uiService.config, "js.fontFamily"),
    };
  }, [uiService, baseColor]);

  useEffect(() => {
    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    const options = getChartOption(layoutProps, data, t);
    const chart = new ApexCharts(element, options);

    chart.render();
    return function cleanUp() {
      chart.destroy();
    };
  }, [id, data, layoutProps]);

  return (
    <div className={`card card-custom ${className}`}  style={{minHeight: "300px"}}>
      <div className="card-body p-0">
        <div className="d-flex align-items-center justify-content-between card-spacer flex-grow-1">
        <div className="d-flex flex-column text-left">
            <span className="text-dark-75 font-weight-bolder font-size-h3">
              {title}
            </span>
            <span className="text-muted font-weight-bold mt-2">
              {description}
            </span>
          </div>
          <span
            className={`symbol ${symbolShape} symbol-50 symbol-light mr-2`}
          >
            <span className="symbol-label">
              <span className={`svg-icon svg-icon-xl svg-icon-${baseColor}`}>
                <i className={`fad fa-bowling-pins text-${baseColor}`} style={{fontSize: '2.5rem'}}></i>
              </span>
            </span>
          </span>
        </div>
        <div
          id={id}
          className="card-rounded-bottom ltr"
          style={{ height: "150px" }}
        ></div>
      </div>
    </div>
  );
}

function getChartOption(layoutProps, data, t) {
  const options = {
    series: [
      {
        name: t("Common.Score"),
        data: data.Scores,
      },
    ],
    chart: {
      type: "bar",
      height: 300,
      sparkline: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1
    },
    xaxis: {
      categories: data.Persons,
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        show: true,
        rotate: -90,
        rotateAlways: true,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        minHeight: undefined,
        maxHeight: 120,
        style: {
            colors: [],
            fontSize: '10px',
            fontFamily: 'IransansFa',
            fontWeight: 600,
            cssClass: 'apexcharts-xaxis-label',
            top:200
        },
      },
      crosshairs: {
        show: true,
        position: "front",
        stroke: {
          color: layoutProps.colorsGrayGray300,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily,
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        textAnchor: 'start',
        position: 'left',
        borderColor: '#c2c2c2',
        borderWidth: 1,
        borderRadius: 2,
        text: undefined,
        offsetX: 0,
        offsetY: 0,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily,
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: layoutProps.fontFamily,
      },
      y: {
        formatter: function(val) {
          return val;
        },
      },
    },
    colors: [layoutProps.colorsThemeLightSuccess],
    markers: {
      colors: [layoutProps.colorsThemeLightSuccess],
      strokeColor: [layoutProps.colorsThemeBaseSuccess],
      strokeWidth: 3,
    },
  };
  return options;
}
