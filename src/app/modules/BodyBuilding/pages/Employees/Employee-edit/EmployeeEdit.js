import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/Employees/EmployeesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { EmployeeEditForm } from "./EmployeeEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { CloneObject, getStorage } from "../../../../../../core/_helpers";
import { Tabs, Tab } from "react-bootstrap";
import { EmployeeTypesUIProvider } from "../Employee-employeeTypes/EmployeeTypesUIContext";
import { EmployeeTypes } from "../Employee-employeeTypes/EmployeeTypes";

export function EmployeeEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();
  const [employeeType, setEmployeeType] = useState(null);

  const initModel = {
    BodyBuildingEmployeeId: undefined,
    BodyBuildingEmployeeTypeId: null,
    RealPersonId: null,
    CooperationType: null,
    BodyBuildingEmployeeExpertises: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [employeeObj, setEmployeeObj] = useState(copyModel);
  const [employeeTypeObj, setEmployeeTypeObj] = useState(
    copyModel.BodyBuildingEmployeeExpertises
  );

  const { actionsLoading, employeeForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.employees.actionsLoading,
      employeeForEdit: state.employees.employeeForEdit,
      error: state.employees.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!!id) {
      dispatch(actions.fetchEmployee(id)).then((res) => {
        setEditMode(true);
      });
    }
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " «" + t("BodyBuildingEmployee.Entity") + "»";

    if (employeeForEdit && id) {
      _title = t("Common.Edit") + " «" + t("BodyBuildingEmployee.Entity") + "»";
      setEmployeeObj(employeeForEdit);
      setEmployeeType(employeeForEdit.BodyBuildingEmployeeTypeId);
      setEmployeeTypeObj(employeeForEdit.BodyBuildingEmployeeExpertises);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeForEdit, id]);

  const saveEmployee = (values) => {
    if (!id) {
      dispatch(
        actions.createEmployee(values, () => {
          backToEmployeesList();
        })
      )
        .then((arg) => {
          backToEmployeesList();
        })
        .catch((err) => {});
    } else {
      dispatch(
        actions.updateEmployee(id, values, () => {
          backToEmployeesList();
        })
      )
        .then(() => backToEmployeesList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef("1");
  const btnRefEmployeeTypes = useRef("2");

  const saveEmployeeClick = () => {
    if (!!btnRef && !!btnRef.current) {
      btnRef.current.Collect((datas) => {
        let employeeTypeObj = {};
        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (typeof obj != "object") {
              employeeTypeObj[prop] = obj;
            }
          }
        }

        employeeTypeObj["BodyBuildingEmployeeExpertises"] = [];

        btnRefEmployeeTypes.current.Collect((employeeTypesData) => {
          employeeTypeObj.BodyBuildingEmployeeExpertises = employeeTypesData;
        });

        setTimeout(() => {
          saveEmployee(employeeTypeObj);
        }, 200);
      });
    }
  };

  const backToEmployeesList = () => {
    history.push(`/BodyBuilding/Employees`);
  };

  return (
    <>
      {((!!id && editMode) || !!id == false) && (
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
                onClick={backToEmployeesList}
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
              <button
                type="submit"
                className="btn btn-primary ml-2"
                onClick={saveEmployeeClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <Tabs
              defaultActiveKey="employee"
              transition={false}
              className="nav nav-tabs nav-tabs-line"
            >
              <Tab
                eventKey="employee"
                title={t("Common.BasicInfo")}
                className="nav-item"
              >
                <EmployeeEditForm
                  actionsLoading={actionsLoading}
                  employee={employeeObj}
                  ref={btnRef}
                  setEmployeeType={setEmployeeType}
                />
              </Tab>
              <Tab
                eventKey="employeeExpertises"
                title={t("BodyBuildingEmployeeExpertise.Entity")}
                className="nav-item"
              >
                <EmployeeTypesUIProvider
                  currentPersonId={id}
                  actionsLoading={actionsLoading}
                  employeeType={employeeTypeObj}
                  selectedEmployeeType={employeeType}
                  ref={btnRefEmployeeTypes}
                >
                  <EmployeeTypes />
                </EmployeeTypesUIProvider>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      )}
    </>
  );
}
