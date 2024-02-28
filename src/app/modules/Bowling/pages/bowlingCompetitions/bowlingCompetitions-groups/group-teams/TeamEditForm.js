import React, { useState, useRef, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import axios from "axios";
import * as Yup from "yup";
import {
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { Formik, Field } from "formik";
import { useGroupsUIContext } from "../GroupsUIContext";
import BootstrapTable from "react-bootstrap-table-next";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../../../core/_helpers";
import { ActionsColumnFormatter } from "./team-column-formatters/ActionsColumnFormatter";
import {
  Input,
  CheckboxField,
  SuggestionField,
} from "../../../../../../../core/_partials/controls";

export function TeamEditForm({ group, actionsLoading, onHide }) {
  const { t } = useTranslation();
  const defaultInput = useRef(null);
  !!defaultInput && !!defaultInput.current && defaultInput.current.focus();

  const [teamObj, setTeamObj] = useState({
    BowlingTeamId: "",
  });

  const groupsUIContext = useGroupsUIContext();
  const groupsUIProps = useMemo(() => {
    return {
      selectedItem: groupsUIContext.selectedItem,
      addTeam: groupsUIContext.addTeam,
      removeTeam: groupsUIContext.removeTeam,
      checkTeam: groupsUIContext.checkTeam,
    };
  }, [groupsUIContext]);

  const BowlingCompetitionGroupTeamEditSchema = Yup.object().shape({});

  const columns = [
    {
      dataField: "BowlingTeam.Title",
      text: t("BowlingTeam.Title"),
      sort: false,
    },
    {
      dataField: "action",
      text: t("Common.Action"),
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        actionDelete: groupsUIProps.removeTeam,
        t: t,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  function addTeam(values) {
    groupsUIProps.addTeam({
      BowlingCompetitionGroupTeamId: values.BowlingCompetitionGroupTeamId,
      BowlingCompetitionGroupId:
        groupsUIProps.selectedItem.BowlingCompetitionGroupId,
      BowlingTeamId:
        Array.isArray(values.BowlingTeamId) && values.BowlingTeamId.length == 1
          ? values.BowlingTeamId[0].BowlingTeamId
          : !!values.BowlingTeamId
          ? values.BowlingTeamId
          : null,
      BowlingTeam:
        Array.isArray(values.BowlingTeamId) && values.BowlingTeamId.length == 1
          ? values.BowlingTeamId[0]
          : !!values.BowlingTeamId
          ? values.BowlingTeam
          : null,
    });

    setTimeout(() => {
      !!defaultInput && !!defaultInput.current && defaultInput.current.focus();
      !!defaultInput && !!defaultInput.current && defaultInput.current.select();

      setTeamObj({
        BowlingTeamId: "",
      });
    }, 50);
  }

  const handleSuggestionTeam = useCallback((query, fnCallback) => {
    axios
      .post("bowlingTeam/get", {
        Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
        OrderBy: "Title asc",
        PageNumber: 1,
        PageSize: 10,
      })
      .then(({ data }) => {
        fnCallback(data.Items);
      });
  });

  return (
    <>
      <Modal.Body className="">
        {actionsLoading && (
          <div className="overlay-layer bg-transparent">
            <div className="spinner spinner-lg spinner-success" />
          </div>
        )}
        <Row>
          <Col>
            <Formik
              enableReinitialize={true}
              initialValues={teamObj}
              validationSchema={BowlingCompetitionGroupTeamEditSchema}
              onSubmit={(values) => {
                addTeam(values);
              }}
            >
              {({ handleSubmit }) => (
                <>
                  <Row>
                    <Col>
                      <SuggestionField
                        name="BowlingTeamId"
                        labelKey="Title"
                        customFeedbackLabel=""
                        label={t("BowlingCompetitionGroupTeam.BowlingTeam")}
                        placeHolder={t("msg.SelectBySuggestion")}
                        handleSearch={handleSuggestionTeam}
                        renderMenuItemChildren={(option, props) => (
                          <div>
                            <h6>{option.Title}</h6>
                          </div>
                        )}
                      />
                    </Col>
                    <Col xs="auto">
                      <label style={{ visibility: "hidden", display: "block" }}>
                        {"1"}
                      </label>
                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        <i className="fas fa-plus"></i> افزودن
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            </Formik>
          </Col>
        </Row>
        <Row>
          <Col>
            <BootstrapTable
              wrapperClasses="table-responsive"
              classes="table table-head-custom table-vertical-center"
              bordered={false}
              bootstrap4
              remote
              keyField="BowlingCompetitionGroupTeamId"
              data={
                groupsUIProps.selectedItem.BowlingCompetitionGroupTeams === null
                  ? []
                  : groupsUIProps.selectedItem.BowlingCompetitionGroupTeams
              }
              columns={columns}
            >
              <PleaseWaitMessage
                entities={
                  groupsUIProps.selectedItem.BowlingCompetitionGroupTeams
                }
              />
              <NoRecordsFoundMessage
                entities={
                  groupsUIProps.selectedItem.BowlingCompetitionGroupTeams
                }
              />
            </BootstrapTable>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            بستن
          </button>
        </div>
      </Modal.Footer>
    </>
  );
}
