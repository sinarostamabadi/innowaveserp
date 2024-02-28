import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/EmployeeTypes/EmployeeTypesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../core/_partials/controls";
import { EmployeeTypeEditForm } from "./EmployeeTypeEditForm";
import { useSubheader } from "../../../../../../core/layout";
import {
  ModalProgressBar,
  Alerty,
} from "../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";
import { CloneObject, getStorage } from "../../../../../../core/_helpers";
import { Tabs, Tab } from "react-bootstrap";
import { ExpertisesUIProvider } from "../EmployeeType-expertises/ExpertisesUIContext";
import { Expertises } from "../EmployeeType-expertises/Expertises";

export function EmployeeTypeEdit({
  history,
  match: {
    params: { id },
  },
}) {
  const { t } = useTranslation();
  const defaultRestaurant = !!getStorage("defaultRestaurant")
    ? JSON.parse(getStorage("defaultRestaurant"))
    : null;

  const initModel = {
    BodyBuildingEmployeeTypeId: undefined,
    Title: "",
    Description: "",
    BodyBuildingEmployeeTypeExpertises: [],
  };
  let copyModel = CloneObject(initModel);

  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [employeeTypeObj, setEmployeeTypeObj] = useState(copyModel);
  const [expertiseObj, setExpertiseObj] = useState(
    copyModel.BodyBuildingEmployeeTypeExpertises
  );

  const { actionsLoading, employeeTypeForEdit, error } = useSelector(
    (state) => ({
      actionsLoading: state.employeeTypes.actionsLoading,
      employeeTypeForEdit: state.employeeTypes.employeeTypeForEdit,
      error: state.employeeTypes.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!!id) {
      dispatch(actions.fetchEmployeeType(id)).then((res) => {
        setEditMode(true);
      });
    }
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id
      ? ""
      : t("Common.Create") + " «" + t("BodyBuildingEmployeeType.Entity") + "»";

    if (employeeTypeForEdit && id) {
      _title = t("Common.Edit") + " «" + employeeTypeForEdit.Title + "»";
      setEmployeeTypeObj(employeeTypeForEdit);
      setExpertiseObj(employeeTypeForEdit.BodyBuildingEmployeeTypeExpertises);
    }

    setTitle(_title);
    suhbeader.setTitle(_title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeTypeForEdit, id]);

  const saveEmployeeType = (values) => {
    if (!id) {
      dispatch(
        actions.createEmployeeType(values, () => {
          backToEmployeeTypesList();
        })
      )
        .then((arg) => {
          backToEmployeeTypesList();
        })
        .catch((err) => {});
    } else {
      dispatch(
        actions.updateEmployeeType(id, values, () => {
          backToEmployeeTypesList();
        })
      )
        .then(() => backToEmployeeTypesList())
        .catch((err) => {});
    }
  };

  const btnRef = useRef("1");
  const btnRefExpertises = useRef("2");

  const saveEmployeeTypeClick = () => {
    if (!!btnRef && !!btnRef.current) {
      btnRef.current.Collect((datas) => {
        let expertiseObj = {};
        for (const prop in datas) {
          if (datas.hasOwnProperty(prop)) {
            const obj = datas[prop];
            if (typeof obj != "object") {
              expertiseObj[prop] = obj;
            }
          }
        }

        expertiseObj["BodyBuildingEmployeeTypeExpertises"] = [];

        btnRefExpertises.current.Collect((expertisesData) => {
          expertiseObj.BodyBuildingEmployeeTypeExpertises = expertisesData;
        });

        setTimeout(() => {
          saveEmployeeType(expertiseObj);
        }, 200);
      });
    }
  };

  const backToEmployeeTypesList = () => {
    history.push(`/BodyBuilding/EmployeeTypes`);
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
                onClick={backToEmployeeTypesList}
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
                onClick={saveEmployeeTypeClick}
              >
                <i className="fa fa-save"></i> {t("Common.Save")}
              </button>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <Tabs
              defaultActiveKey="employeeType"
              transition={false}
              className="nav nav-tabs nav-tabs-line"
            >
              <Tab
                eventKey="employeeType"
                title={t("Common.BasicInfo")}
                className="nav-item"
              >
                <EmployeeTypeEditForm
                  actionsLoading={actionsLoading}
                  employeeType={employeeTypeObj}
                  ref={btnRef}
                />
              </Tab>
              <Tab
                eventKey="expertises"
                title={t("BodyBuildingEmployeeTypeExpertise.Entity")}
                className="nav-item"
              >
                <ExpertisesUIProvider
                  currentPersonId={id}
                  actionsLoading={actionsLoading}
                  expertise={expertiseObj}
                  ref={btnRefExpertises}
                >
                  <Expertises />
                </ExpertisesUIProvider>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      )}
    </>
  );
}
