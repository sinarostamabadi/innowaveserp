import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useState,
  useEffect,
  createRef,
} from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  Input,
  DatePickerField,
  Select,
  SuggestionField,
  CheckboxField,
  TimePickerField,
} from "src/core/_partials/controls";
import { getAllLines } from "./../../../_redux/lines/linesCrud";
import { getBowlingCompetitionById } from "./../../../_redux/bowlingCompetitions/bowlingCompetitionsCrud";

export const ReserveEditForm = forwardRef(
  ({ reserve, btnRef, saveReserve, setReservePerson }, ref) => {
    const { t } = useTranslation();
    const defaultInput = createRef();

    useEffect(() => {
      defaultInput.current.focus();
    }, [defaultInput]);

    let callBack;
    useImperativeHandle(ref, () => ({
      Collect(fn) {
        callBack = fn;

        const btnSend = document.getElementById("BtnReserveSend");
        btnSend.click();
      },
    }));

    const ReserveEditSchema = Yup.object().shape({
      LineId: Yup.number().required(
        t("err.IsRequired", { 0: t("BowlingReserve.Line") })
      ),
      PersonId: Yup.array()
        .nullable()
        .min(1, t("err.IsRequired", { 0: t("BowlingReserve.Person") })),
      ReserveDateObj: Yup.object().required(
        t("err.IsRequired", { 0: t("BowlingReserve.ReserveDate") })
      ),
      FromTimeObj: Yup.object()
        .nullable()
        .required(t("err.IsRequired", { 0: t("BowlingReserve.FromTime") })),
      PersonCount: Yup.number().required(
        t("err.IsRequired", { 0: t("BowlingReserve.PersonCount") })
      ),
      ClosetNumber: Yup.number().required(
        t("err.IsRequired", { 0: t("BowlingReserve.ClosetNumber") })
      ),
    });
    const [lines, setLines] = useState([]);
    const [isSet, setIsSet] = useState(null);

    useEffect(() => {
      if (lines.length == 0)
        getAllLines().then(({ data }) =>
          setLines((lines) => [
            { LineId: "", Title: t("Common.WithoutSelect") },
            ...data.Items,
          ])
        );
    }, [lines.length, t]);

    const handleSuggestionPerson = useCallback((query, fnCallback) => {
      axios
        .post("person/get", {
          Filters: [{ Property: "FullNameFa", Operation: 7, Values: [query] }],
          OrderBy: "FullNameFa asc",
          PageNumber: 1,
          PageSize: 10,
        })
        .then(({ data }) => {
          fnCallback(data.Items);
        });
    });

    const handleSuggestionBowlingCompetition = useCallback(
      (query, fnCallback) => {
        axios
          .post("bowlingCompetition/get", {
            Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
            OrderBy: "Title asc",
            PageNumber: 1,
            PageSize: 10,
          })
          .then(({ data }) => {
            fnCallback(data.Items);
          });
      }
    );

    const [bowlingTeams, setBowlingTeams] = useState([]);

    function getTeams(bowlingCompetitionId) {
      let teams = [
        {
          BowlingTeamId: null,
          Title: t("Common.DoSelect"),
          Persons: [],
        },
      ];

      getBowlingCompetitionById(bowlingCompetitionId).then(({ data }) => {
        if (data) {
          data.BowlingCompetitionGroups.map((g) => {
            g.BowlingCompetitionGroupTeams.map((t) => {
              let groupTeam = {
                BowlingTeamId: t.BowlingCompetitionGroupTeamId,
                Title: g.Title + " -> " + t.BowlingTeam.Title,
                Persons: t.BowlingTeam.BowlingTeamPersons.map((p) => {
                  return {
                    ReservePersonScoreId:
                      "temp_" + Math.floor(Math.random() * 100),
                    ReserveId: reserve.ReserveId,
                    Person: p.Person,
                    PersonId: p.PersonId,
                    IsDeleted: false,
                  };
                }),
              };

              teams.push(groupTeam);
            });
          });
        }

        setBowlingTeams(teams);
      });
    }

    function addPerson(teamId) {
      if (teamId != null && teamId != 0) {
        setReservePerson((persons) => [
          ...persons,
          ...(bowlingTeams
            ? bowlingTeams.filter((x) => x.BowlingTeamId == teamId)[0].Persons
            : []),
        ]);
      }
    }

    function clean(dirty) {
      return {
        ReserveId: dirty.ReserveId,
        LineId: !!dirty.LineId? +dirty.LineId: null,
        BowlingCompetitionId: !!dirty.BowlingCompetitionId? +dirty.BowlingCompetitionId: null,
        BowlingTeamId: !!dirty.BowlingTeamId? +dirty.BowlingTeamId: null,
        ReserveDate: dirty.ReserveDate,
        PersonId: !!dirty.PersonId? +dirty.PersonId: null,
        PersonCount: +dirty.PersonCount,
        FromTime: dirty.FromTime,
        ToTime: dirty.ToTime,
        ClosetNumber: dirty.ClosetNumber != null? +dirty.ClosetNumber: null,
        IsSet: dirty.IsSet,
        ReservePersonScores: dirty.ReservePersonScores
      };
    }

    return (
      <>
        <Formik
          enableReinitialize={true}
          initialValues={reserve}
          validationSchema={ReserveEditSchema}
          onSubmit={(values) => {
            !!callBack && callBack(clean(values));
          }}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <>
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-md-4">
                    <Select
                      name="LineId"
                      label={t("BowlingReserve.Line")}
                      setref={defaultInput}
                    >
                      {lines.map((line) => (
                        <option key={line.LineId} value={line.LineId}>
                          {line.Title}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-md-4">
                    <SuggestionField
                      name="PersonId"
                      labelKey="FullNameFa"
                      objectName="Person"
                      version={2}
                      customFeedbackLabel=""
                      label={t("BowlingReserve.Person")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionPerson}
                      defaultValue={reserve ? [reserve.Person] : []}
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.FullNameFa}</h6>
                        </div>
                      )}
                      extraAction={[
                        {
                          icon: "far fa-plus",
                          title: t("RealPerson.Entity"),
                          url: "/Core/realPersons/new",
                        },
                      ]}
                    />
                  </div>
                  <div className="col-md-4">
                    <DatePickerField
                      name="ReserveDate"
                      version={2}
                      customFeedbackLabel=""
                      label={t("BowlingReserve.ReserveDate")}
                      value={reserve.ReserveDateObj}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-4">
                    <CheckboxField
                      name="IsSet"
                      version={2}
                      customFeedbackLabel=""
                      onChange={(val) => setIsSet(val)}
                      label={t("BowlingReserve.IsSet")}
                    />
                  </div>
                  <div className="col-md-4">
                    <TimePickerField
                      name="FromTimeObj"
                      version={2}
                      customFeedbackLabel=""
                      showSecond={false}
                      label={t("BowlingReserve.FromTime")}
                      disabled={true}
                    />
                  </div>
                  <div className="col-md-4">
                    <TimePickerField
                      name="ToTimeObj"
                      customFeedbackLabel=""
                      showSecond={false}
                      disabled={isSet}
                      label={t("BowlingReserve.ToTime")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-4">
                    <Field
                      name="PersonCount"
                      component={Input}
                      type="number"
                      customFeedbackLabel="ff"
                      label={t("BowlingReserve.PersonCount")}
                    />
                  </div>
                  <div className="col-md-4">
                    <Field
                      name="ClosetNumber"
                      component={Input}
                      type="number"
                      customFeedbackLabel=""
                      label={t("BowlingReserve.ClosetNumber")}
                    />
                  </div>
                  <div className="col-md-4">
                    <Field
                      name="PayablePrice"
                      component={Input}
                      type="number"
                      customFeedbackLabel=""
                      label={t("BowlingReserve.PayablePrice")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-4">
                    <SuggestionField
                      name="BowlingCompetitionId"
                      labelKey="Title"
                      customFeedbackLabel=""
                      label={t("BowlingReserve.BowlingCompetition")}
                      placeHolder={t("msg.SelectBySuggestion")}
                      handleSearch={handleSuggestionBowlingCompetition}
                      defaultValue={
                        reserve && reserve.BowlingCompetition
                          ? [reserve.BowlingCompetition]
                          : []
                      }
                      handleOnChange={(val) => getTeams(val)}
                      renderMenuItemChildren={(option, props) => (
                        <div>
                          <h6>{option.Title}</h6>
                        </div>
                      )}
                    />
                  </div>
                  <div className="col-md-4">
                    <Select
                      name="BowlingTeamId"
                      label={t("BowlingReserve.Team")}
                    >
                      {bowlingTeams.map((bowlingTeam) => (
                        <option
                          key={bowlingTeam.BowlingTeamId}
                          value={bowlingTeam.BowlingTeamId}
                        >
                          {bowlingTeam.Title}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="col-auto">
                    <label className="d-block w-100">&nbsp;</label>
                    <button
                      className="btn btn-primary"
                      onClick={() => addPerson(+values["BowlingTeamId"])}
                    >
                      <i className="fad fa-user-plus"></i>{" "}
                      {t("BowlingReserve.AddTeamMembersToPlayers")}
                    </button>
                  </div>
                </div>
                <button
                  id="BtnReserveSend"
                  type="submit"
                  style={{ display: "none" }}
                  onSubmit={() => handleSubmit()}
                ></button>
              </Form>
            </>
          )}
        </Formik>
      </>
    );
  }
);
