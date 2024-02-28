import React, { useEffect, useState, useMemo } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { getAllFutsalTiming } from "./../../../_redux/futsalTiming/futsalTimingCrud";
import { useFutsalReserveDatesUIContext } from "./FutsalReserveTimeSheetContext";
import moment from "jalali-moment";

export default function FutsalReserveTimeSheet() {
  const reserveDatesUIContext = useFutsalReserveDatesUIContext();
  let dates = [];

  const uiProps = useMemo(() => {
    return {
      timing: reserveDatesUIContext.timing,
      futsalReserveDates: reserveDatesUIContext.futsalReserveDates,
      show: reserveDatesUIContext.showEditPhoneDialog,
      onHide: reserveDatesUIContext.closeEditPhoneDialog,
      personId: reserveDatesUIContext.personId,
      queryParams: reserveDatesUIContext.queryParams,
      initPhone: reserveDatesUIContext.initPhone,
      findPhone: reserveDatesUIContext.findPhone,
      addPhone: reserveDatesUIContext.addPhone,
      updatePhone: reserveDatesUIContext.updatePhone,
    };
  }, [reserveDatesUIContext]);
  if (
    !!uiProps.timing == false ||
    (!!uiProps.timing &&
      (!!uiProps.timing.fromDate == false ||
        !!uiProps.timing.toDate == false ||
        !!uiProps.timing.days.length == 0))
  ) {
    //
  } else {
    const days = uiProps.timing.days;

    let { fromDate, toDate } = "";
    fromDate =
      uiProps.timing.fromDate.year +
      "/" +
      ("0" + uiProps.timing.fromDate.month).slice(-2) +
      "/" +
      ("0" + uiProps.timing.fromDate.day).slice(-2);

    toDate =
      uiProps.timing.toDate.year +
      "/" +
      ("0" + uiProps.timing.toDate.month).slice(-2) +
      "/" +
      ("0" + uiProps.timing.toDate.day).slice(-2);

    const fromDateM = moment
      .from(fromDate, process.env.REACT_APP_DATE, "YYYY/MM/DD")
      .locale("en");
    const toDateM = moment
      .from(toDate, process.env.REACT_APP_DATE, "YYYY/MM/DD")
      .locale("en")
      .add(1, "day");

    do {
      let date = {
        date: fromDateM.locale(process.env.REACT_APP_DATE).format("YYYY/MM/DD"),
        dayName: fromDateM.locale(process.env.REACT_APP_DATE).format("dddd"),
        dayNum: fromDateM.day(),
      };

      if (days.findIndex((model) => model.value == date.dayNum) > -1)
        dates.push(date);

      fromDateM.add(1, "day");
    } while (toDateM.isAfter(fromDateM));
  }

  const [futsalTimings, setFutsalTiming] = useState([]);
  useEffect(() => {
    if (futsalTimings.length == 0)
      getAllFutsalTiming().then(({ data }) =>
        setFutsalTiming((futsalTimings) => [
          ...data.Items.map((model) => {
            model["FromTimeText"] = !!model.FromTime
              ? ("0" + model.FromTime.Hours).slice(-2) +
                ":" +
                ("0" + model.FromTime.Minutes).slice(-2)
              : "";
            model["ToTimeText"] = !!model.ToTime
              ? ("0" + model.ToTime.Hours).slice(-2) +
                ":" +
                ("0" + model.ToTime.Minutes).slice(-2)
              : "";

            return model;
          }),
        ])
      );
  }, [futsalTimings.length]);

  const days = [
    { label: "شنبه", value: 6 },
    { label: "یک‌شنبه", value: 0 },
    { label: "دوشنبه", value: 1 },
    { label: "سه‌شنبه", value: 2 },
    { label: "چهارشنبه", value: 3 },
    { label: "پنج‌شنبه", value: 4 },
    { label: "جمعه", value: 5 },
  ];

  return (
    <>
      {!!uiProps.timing == false ||
      (!!uiProps.timing &&
        (!!uiProps.timing.fromDate == false ||
          !!uiProps.timing.toDate == false ||
          !!uiProps.timing.days.length == 0)) ? (
        <Row>
          <Col>بازه زمانی انتخاب نشده است.</Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <label>انتخاب سانس</label>
            <div className="float-right">
              <span className="mr-4">
                <i className="fas fa-ban"></i> غیرقابل رزرو
              </span>
              <span className="mr-4">
                <i className="far fa-times"></i> حذف رزرو شده‌های خودتان
              </span>
              <span className="mr-4">
                <i className="far fa-times"></i> رزرو
              </span>
            </div>

            <Table
              striped
              bordered
              hover
              style={{ margin: "0px!important", padding: "0px!important" }}
            >
              <thead>
                <tr>
                  <th className="text-center">تاریخ</th>
                  <th className="text-center">روز</th>
                  {futsalTimings.map((time) => (
                    <th
                      className="text-center"
                      key={time.FutsalTimingId}
                      value={time.FutsalTimingId}
                    >
                      {time.FromTimeText.substring(0, 5)} -{" "}
                      {time.ToTimeText.substring(0, 5)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dates.map((time) => (
                  <tr key={time.date}>
                    <td>{time.date}</td>
                    <td>{time.dayName}</td>
                    <td>
                      <i className="fas fa-ban"></i>
                    </td>
                    <td>
                      <i className="fas fa-ban"></i>
                    </td>
                    <td>
                      <i className="fas fa-ban"></i>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </>
  );
}
