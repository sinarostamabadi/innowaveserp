import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/assignments/assignmentsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { AssignmentEditForm } from "./AssignmentEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";
import { DetailsUIProvider } from "../assignments-details/DetailsUIContext";
import { Details } from "../assignments-details/Details";
import { EnToFaObjDate, CloneObject, getStorage } from "../../../../../../core/_helpers";
import moment from "jalali-moment";

export function AssignmentEdit({
  history,
  match: {
    params: { id },
  },
  mode,
}) {
  const { t } = useTranslation();
  const modeTrans = {
    1: "حواله",
    2: "حواله بین انبار",
    3: "موجودی پایان دوره",
    4: "حواله اتوماتیک",
  };

  const defaultWarehouse = !!getStorage("defaultWarehouse")
    ? JSON.parse(getStorage("defaultWarehouse"))
    : null;
  const defaultYear = !!getStorage("defaultYear")
  ? JSON.parse(getStorage("defaultYear"))
  : null;
  
  const initModel = {
    AssignmentId: undefined,
    AssignmentNo: "",
    PersonId: "",
    Person: "",
    WarehouseId: !!defaultWarehouse ? defaultWarehouse.WarehouseId: "",
    Warehouse: defaultWarehouse,
    YearId: !!defaultYear ? defaultYear.YearId : "",
    Year: defaultYear,
    AssignmentDateObj: EnToFaObjDate(new Date()),
    AssignmentDate: moment
      .from()
      .locale("en")
      .format("YYYY-MM-DDTHH:mm:ss"),    
    AssignmentTypeId: mode || 1,
    AssignmentType: "",
    BaseAssignmentId: null,
    BaseAssignment: "",
    OtherWareHouseId: null,
    OtherWareHouse: "",
    Des: "",
    Archive: false,
    AssignmentDtls: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [assignmentObj, setAssignmentObj] = useState(copyModel);
  const [dependency, setDependency] = useState({YearId: !!defaultYear ? +defaultYear.YearId: null, WarehouseId: !!defaultWarehouse ? +defaultWarehouse.WarehouseId: null});
  const [assignmentDtlObj, setAssignmentDtlObj] = useState(copyModel.AssignmentDtls);

  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, assignmentForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.assignments.actionsLoading,
      assignmentForEdit: state.assignments.assignmentForEdit,
      error: state.assignments.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchAssignment(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") +
    " «" +
    (!!mode 
      ? modeTrans[mode]
      : t("Assignment.Entity")) +
    "»"

    if (assignmentForEdit && id) {
      _title =
        t("Common.Edit") + " " + (!!mode
          ? modeTrans[mode]
          : t("Assignment.Entity") + " «" + assignmentForEdit.AssignmentNo + "»");

      setAssignmentObj({...assignmentForEdit, AssignmentDateObj: EnToFaObjDate(assignmentForEdit.AssignmentDate)});
      setAssignmentDtlObj(assignmentForEdit.AssignmentDtls);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentForEdit, id]);

  const saveAssignment = (values) => {
    if (!id) {
      dispatch(actions.createAssignment(values, ()=>{
        backToAssignmentsList();
      }))
        .then((arg) => {
          backToAssignmentsList();
        })
        .catch((err) => {});
    } else {
      dispatch(actions.updateAssignment(id, values, ()=>{
        backToAssignmentsList();
      }))
        .then(() => backToAssignmentsList())
        .catch((err) => {});
    }
  };

  const btnRefAssignment = useRef("1");
  const btnRefDetails = useRef("2");

  const saveAssignmentClick = () => {
    if (btnRefAssignment && btnRefAssignment.current) {
      btnRefAssignment.current.Collect((datas) => {
        let assignmentObj = {};
        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (typeof obj != "object") {
              assignmentObj[prop] = obj;
            }
          }
        }
        assignmentObj["AssignmentDtls"] = [];

        btnRefDetails.current.Collect((detailsData) => {
          assignmentObj.AssignmentDtls = detailsData;
          saveAssignment(assignmentObj);
        });
      });
    }
  };

  const backToAssignmentsList = () => {
    history.push(!!mode ? `/warehouse/assignments/${mode}` : `/warehouse/assignments`);
  };
  
  return (
    <>
      {((!!id && !!assignmentObj.AssignmentId) || !!id == false) && (
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
                onClick={backToAssignmentsList}
                className="btn btn-light"
              >
                <i className="fa fa-arrow-left"></i> {t("Common.Back")}
              </button>
              {`  `}
              <button className="btn btn-light ml-2">
                <i className="fa fa-redo"></i> {t("Common.Reset")}
              </button>
              {`  `}
              <button type="submit" className="btn btn-light ml-2">
                <i className="fa fa-print"></i> {t("Common.Print")}
              </button>
              {`  `}
              {(!!id == false || (!!id && assignmentObj.Archive)) && (
                <button
                  type="submit"
                  className="btn btn-primary ml-2"
                  onClick={saveAssignmentClick}
                >
                  <i className="fa fa-save"></i> {t("Common.Save")}
                </button>
              )}
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <AssignmentEditForm
              actionsLoading={actionsLoading}
              assignment={assignmentObj}
              ref={btnRefAssignment}
              setDependency={setDependency}
            />
            <DetailsUIProvider
              currentPersonId={id}
              actionsLoading={actionsLoading}
              detail={assignmentDtlObj}
              dependency={dependency}
              ref={btnRefDetails}
            >
              <Details />
            </DetailsUIProvider>
          </CardBody>
        </Card>
      )}
    </>
  );
}
