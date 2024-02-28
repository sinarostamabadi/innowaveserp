import { useEffect, useState, useRef, createRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import moment from "jalali-moment";
import { useTranslation } from "react-i18next";
import { useReactToPrint } from "react-to-print";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  ModalProgressBar,
  Alerty,
} from "src/core/_partials/controls";
import { getStorage, EnToFaObjDate } from "src/core/_helpers";
import { useSubheader } from "src/core/layout";
import config from "src/config";
import { ReserveEditForm } from "./ReserveEditForm";
import { PrintReserve } from "../print/PrintReserve";
import { PrintGame } from "../print-game/PrintGame";
import { ReservePersonsUIProvider } from "../reserve-persons/ReservePersonsUIContext";
import { ReservePersons } from "../reserve-persons/ReservePersons";
import * as actions from "../../../_redux/reserves/reservesActions";
import { ReserveSimpleForm } from "./ReserveSimpleForm";

export function ReserveEdit({
  history,
  match: {
    params: { id },
  },
  mode,
}) {
  const { t } = useTranslation();
  const [configs] = useState(config());

  const initModel = {
    ReserveId: undefined,
    LineId: "",
    Line: "",
    BowlingCompetitionId: "",
    BowlingTeamId: "",
    BowlingCompetition: null,
    ReserveDateObj: EnToFaObjDate(new Date()),
    ReserveDate: moment.from().locale("en").format("YYYY-MM-DDTHH:mm:ss"),
    PersonId: !!getStorage("defaultPerson")
      ? JSON.parse(getStorage("defaultPerson")).PersonId
      : "",
    Person: !!getStorage("defaultPerson")
      ? JSON.parse(getStorage("defaultPerson"))
      : "",
    PersonCount: "",
    FromTime: moment.from().locale(configs.date).format("HH:mm"),
    FromTimeObj: moment.from().locale(configs.date),
    ToTime: "",
    ToTimeObj: "",
    ClosetNumber: 0,
    IsSet: false,
    UserId: undefined,
    TimePriceId: undefined,
    SetPriceId: undefined,
    DiscountId: undefined,
    PayablePrice: 0,
    ReservePersonScores: [],
  };

  const suhbeader = useSubheader();
  const [editMode, setEditMode] = useState(false);
  const [printModel, setPrintModel] = useState(null);
  const [reserveObj, setReserveObj] = useState({ ...initModel });
  const [reservePersonObj, setReservePersonObj] = useState(
    { ...initModel }.ReservePersonScores
  );
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const { actionsLoading, reserveForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.reserves.actionsLoading,
      reserveForEdit: state.reserves.reserveForEdit,
      error: state.reserves.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!!id) dispatch(actions.fetchReserve(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = !!id
      ? ""
      : t("Common.Create") + " " + t("BowlingReserve.Entity");

    if (reserveForEdit && id && reserveForEdit.ReserveId == id) {
      _title = t("Common.Edit") + " " + t("BowlingReserve.Entity");
      setReserveObj(reserveForEdit);
      setReservePersonObj(reserveForEdit.ReservePersonScores);
      setEditMode(true);

      if (mode == "replay") {
        setReserveObj({
          ...reserveForEdit,
          ReserveId: "",
          FromTime: moment.from().locale(configs.date).format("HH:mm"),
          FromTimeObj: moment.from().locale(configs.date),
          ToTime: "",
          ToTimeObj: "",
          ReserveDateObj: EnToFaObjDate(new Date()),
          ReserveDate: moment.from().locale("en").format("YYYY-MM-DDTHH:mm:ss"),
        });
      }
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reserveForEdit, id]);

  const saveReserve = (values) => {
    let saveObj = {};
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const element = values[key];
        saveObj[key] = element;
      }
    }

    if (!!saveObj.IsSet) saveObj.ToTime = null;
    saveObj.PersonCount = saveObj.ReservePersonScores.length;

    if (!id || mode == "replay") {
      dispatch(
        actions.createReserve(saveObj, (arg) => {
          setPrintModel(arg);
          setTimeout(() => {
            handlePrint();
          }, 300);

          setReserveObj({ ...initModel });
          setReservePersonObj([]);
        })
      )
        .then((arg) => {
          // setPrintModel(arg);
          // handlePrint();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateReserve(id, saveObj))
        .then(() => backToReservesList())
        .catch((err) => {});
    }
  };

  const btnPrintRef = createRef("1");
  const btnRefReservePersons = createRef("2");
  const btnRef = createRef();

  const saveReserveClick = () => {
    if (btnPrintRef && btnPrintRef.current) {
      btnPrintRef.current.Collect((datas) => {
        let reserveObj = {};
        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (typeof obj != "object") reserveObj[prop] = obj;
          }
        }
        reserveObj["ReservePersonScores"] = [];

        if (!!btnRefReservePersons.current)
          btnRefReservePersons.current.Collect((personsData) => {
            reserveObj.ReservePersonScores = personsData;
            saveReserve(reserveObj);
          });
        else saveReserve(reserveObj);
      });
    }
  };

  const backToReservesList = () => {
    history.push(`/bowling/reserves`);
  };

  const Print = () => {
    btnPrintRef.current.Collect((datas) => {
      !!id == true && setPrintModel(reserveObj);
      !!id == false && setPrintModel(datas);

      setTimeout(() => {
        handlePrint();
      }, 300);
    });
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
    pageStyle:
      "@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; overflow-y: hidden !important;} }",
  });

  const PrintGameMode = () => {
    btnPrintRef.current &&
      btnPrintRef.current.Collect((datas) => {
        setPrintModel(datas);
        setTimeout(() => {
          handlePrintGame();
        }, 300);
      });
  };
  const componentRefGame = useRef();
  const handlePrintGame = useReactToPrint({
    content: () => componentRefGame.current,
    copyStyles: true,
    pageStyle:
      "@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; overflow-y: hidden !important;} }",
  });

  return (
    <>
      {((!!id && editMode) || !!id === false) && (
        <Card>
          {actionsLoading && <ModalProgressBar />}
          {!actionsLoading && error != null && (
            <>
              <ModalProgressBar variant="danger" />
              <Alerty
                variant="danger"
                title={t("err.Error")}
                description={error}
              ></Alerty>
            </>
          )}
          <CardHeader title={title}>
            <CardHeaderToolbar>
              <button
                type="button"
                onClick={backToReservesList}
                className="btn btn-light"
              >
                <i className="fa fa-arrow-left"></i> {t("Common.Back")}
              </button>
              {`  `}
              <button className="btn btn-light ml-2">
                <i className="fa fa-redo"></i> {t("Common.Reset")}
              </button>
              {`  `}
              <button
                type="button"
                onClick={Print}
                disabled={
                  !!id === false || (mode !== "replay" && mode === "edit")
                }
                className="btn btn-light ml-2"
              >
                <i className="fa fa-print"></i> {t("Common.Print")}
              </button>
              <button
                type="button"
                onClick={() => PrintGameMode()}
                disabled={
                  !!id === false || (mode !== "replay" && mode === "edit")
                }
                className="btn btn-light ml-2"
              >
                <i className="fa fa-print"></i> {t("Common.PrintGame")}
              </button>
              {`  `}
              <button
                type="button"
                className="btn btn-primary ml-2"
                onClick={saveReserveClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            {configs.bowling.create === 0 ? (
              <>
                <ReserveEditForm
                  actionsLoading={actionsLoading}
                  reserve={reserveObj}
                  saveReserve={saveReserve}
                  setReservePerson={setReservePersonObj}
                  ref={btnPrintRef}
                />
                <ReservePersonsUIProvider
                  currentReserveId={id}
                  actionsLoading={actionsLoading}
                  reservePerson={reservePersonObj}
                  ref={btnRefReservePersons}
                >
                  <ReservePersons />
                </ReservePersonsUIProvider>
              </>
            ) : (
              <>
                <ReserveSimpleForm
                  actionsLoading={actionsLoading}
                  reserve={reserveObj}
                  saveReserve={saveReserve}
                  setReservePerson={setReservePersonObj}
                  ref={btnPrintRef}
                />
                <ReservePersonsUIProvider
                  currentReserveId={id}
                  version={2}
                  actionsLoading={actionsLoading}
                  reservePerson={reservePersonObj}
                  ref={btnRefReservePersons}
                >
                  <ReservePersons />
                </ReservePersonsUIProvider>
              </>
            )}
          </CardBody>
        </Card>
      )}
      <div style={{ display: "none", height: "auto" }}>
        <PrintGame ref={componentRefGame} data={printModel} />
      </div>

      <div style={{ display: "none", height: "auto" }}>
        <PrintReserve ref={componentRef} data={printModel} />
      </div>
    </>
  );
}
