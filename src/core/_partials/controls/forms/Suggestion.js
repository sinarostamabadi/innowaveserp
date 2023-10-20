import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import { ClearButton, AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Spinner } from "react-bootstrap";
import "./styles/Suggestion.css";

export function SuggestionField({ version = 1, ...props }) {
  const { setFieldValue, errors, touched } = useFormikContext();
  const [field] = useField(props);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(props.initOptions);
  return (
    <>
      {props.label && <label htmlFor={field.name}>{props.label}</label>}
      {!!props.defaultValue && !!props.defaultValue.length ? (
        <AsyncTypeahead
          id={field.name}
          style={{ width: "100%" }}
          {...props}
          {...field}
          {...(!!props.setref ? { ref: props.setref } : {})}
          onKeyDown={props.onKeyPress}
          labelKey={props.labelKey}
          onChange={(val) => {
            version === 1 && setFieldValue(field.name, val);

            version === 2 &&
              setFieldValue(
                field.name,
                val.length
                  ? !!props.fieldKey == false
                    ? val[0][props.name]
                    : val[0][props.fieldKey]
                  : null
              );
            version === 2 && setFieldValue(props.objectName, val[0]);

            !!props.handleOnChange &&
              props.handleOnChange(
                !!val && val.length > 0
                  ? !!props.fieldKey == false
                    ? val[0][props.name]
                    : val[0][props.fieldKey]
                  : null,
                !!val && val.length > 0 ? val[0] : null
              );
          }}
          value={field.value}
          defaultSelected={props.defaultValue}
          selected={props.defaultSelected}
          isLoading={isLoading}
          minLength={2}
          onSearch={(term) => {
            props.handleSearch(term, (options) => {
              if (!!props.addIfNotExist && options.length == 0) {
                let emptyObj = {};
                emptyObj[field.name] = props.addIfNotExist.value;
                emptyObj[props.addIfNotExist.text] = term;

                setOptions([emptyObj]);
              } else {
                setOptions(options);
              }
            });
          }}
          options={options || props.optionList}
          placeholder=""
          isInvalid={!!touched[field.name] && !!errors[field.name]}
          filterBy={() => true}
        >
          {({ onClear, selected }) => {
            return (
              <div className="rbt-aux show-start d-flex w-auto">
                {!!selected.length && (
                  <div className="flex-1 w-2rem">
                    <ClearButton onClick={onClear} className="mt-1 w-2rem" />
                  </div>
                )}
                {isLoading && <Spinner animation="grow" size="sm" />}
                {!selected.length && !isLoading && (
                  <div className="flex-1 w-2rem">
                    <i
                      className="fa fa-search w-2rem"
                      style={{
                        top: "0.55rem",
                        borderLeft: "1px solid #dfdfdf",
                        padding: "0.4rem",
                        height: "65%",
                        paddingLeft: "0.7rem",
                      }}
                    ></i>
                  </div>
                )}
                {!!props.extraAction && (
                  <div className="flex-1 w-2rem">
                    <a
                      target="blank"
                      href={props.extraAction[0].url}
                      className="cursor-pointer w-2rem"
                      style={{
                        top: "0.5rem",
                        borderRight: "1px solid #dfdfdf",
                        padding: "0.4rem",
                        height: "65%",
                        paddingLeft: "0.7rem",
                      }}
                    >
                      <i className={props.extraAction[0].icon}></i>
                    </a>
                  </div>
                )}
              </div>
            );
          }}
          {/* {props.searchIcon != false && (
            <i
              className="fa fa-search"
              style={{
                position: "absolute",
                top: "0.55rem",
                left: "0.4rem",
                borderLeft: "1px solid #dfdfdf",
                padding: "0.4rem",
                height: "65%",
                paddingLeft: "0.7rem",
              }}
            ></i>
          )}
          {!!props.extraAction && (
            <a
              target="blank"
              href={props.extraAction[0].url}
              className="cursor-pointer"
              style={{
                position: "absolute",
                top: "0.5rem",
                left: "3.2rem",
                borderLeft: "1px solid #dfdfdf",
                padding: "0.4rem",
                height: "65%",
                paddingLeft: "0.7rem",
              }}
            >
              <i className={props.extraAction[0].icon}></i>
            </a>
          )} */}
          {/* {!!field.value && !!field.value.length && (
            <i
              className="fas fa-times text-danger"
              style={{
                position: "absolute",
                top: "calc(50% - 8px)",
                left: "3.5rem",
              }}
              onClick={() => {
                setFieldValue(field.name, "");
                !!props.handleOnChange && props.handleOnChange(null);
              }}
            ></i>
          )} */}
          {/* {!!props.extraAction && props.extraAction.length > 0 && (
            <>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <i className={props.extraAction[0].icon}></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => props.extraAction[0].action()}>
                    {props.extraAction[0].title}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {props.extraAction[0].component}
            </>
          )} */}
        </AsyncTypeahead>
      ) : (
        <AsyncTypeahead
          id={field.name}
          style={{ width: "100%" }}
          {...props}
          {...field}
          {...(!!props.setref ? { ref: props.setref } : {})}
          onKeyDown={props.onKeyPress}
          labelKey={props.labelKey}
          onChange={(val) => {
            version === 1 && setFieldValue(field.name, val);

            version === 2 &&
              setFieldValue(
                field.name,
                val.length
                  ? !!props.fieldKey == false
                    ? val[0][props.name]
                    : val[0][props.fieldKey]
                  : null
              );
            version === 2 && setFieldValue(props.objectName, val[0]);

            !!props.handleOnChange &&
              props.handleOnChange(
                !!val && val.length > 0
                  ? !!props.fieldKey
                    ? val[0][props.fieldKey]
                    : val[0][props.name]
                  : null,
                !!val && val.length > 0 ? val[0] : null
              );
          }}
          value={field.value}
          isLoading={isLoading}
          minLength={2}
          onSearch={(term) => {
            props.handleSearch(term, (options) => {
              if (!!props.addIfNotExist && options.length == 0) {
                let emptyObj = {};
                emptyObj[field.name] = props.addIfNotExist.value;
                emptyObj[props.addIfNotExist.text] = term;

                setOptions([emptyObj]);
              } else {
                setOptions(options);
              }
            });
          }}
          options={options || props.optionList}
          placeholder=""
          isInvalid={!!touched[field.name] && !!errors[field.name]}
          filterBy={() => true}
        >
          {({ onClear, selected }) => {
            return (
              <div className="rbt-aux show-start d-flex w-auto">
                {!!selected.length && (
                  <div className="flex-1 w-2rem">
                    <ClearButton onClick={onClear} className="mt-1 w-2rem" />
                  </div>
                )}
                {isLoading && <Spinner animation="grow" size="sm" />}
                {!selected.length && !isLoading && (
                  <div className="flex-1">
                    <i
                      className="fa fa-search w-2rem"
                      style={{
                        top: "0.55rem",
                        borderLeft: "1px solid #dfdfdf",
                        padding: "0.4rem",
                        height: "65%",
                        paddingLeft: "0.7rem",
                      }}
                    ></i>
                  </div>
                )}
                {!!props.extraAction && (
                  <div className="flex-1">
                    <a
                      target="blank"
                      href={props.extraAction[0].url}
                      className="cursor-pointer"
                      style={{
                        top: "0.5rem",
                        borderRight: "1px solid #dfdfdf",
                        padding: "0.4rem",
                        height: "65%",
                        paddingLeft: "0.7rem",
                      }}
                    >
                      <i className={props.extraAction[0].icon}></i>
                    </a>
                  </div>
                )}
              </div>
            );
          }}
          {/* {props.searchIcon != false && (
            <i
              className="fa fa-search"
              style={{
                position: "absolute",
                top: "0.55rem",
                left: "0.4rem",
                borderLeft: "1px solid #dfdfdf",
                padding: "0.4rem",
                height: "65%",
                paddingLeft: "0.7rem",
              }}
            ></i>
          )}
           */}
          {/* {!!field.value && !!field.value.length && (
            <i
              className="fas fa-times text-danger"
              style={{
                position: "absolute",
                top: "calc(50% - 8px)",
                left: "3.5rem",
              }}
              onClick={() => {
                setFieldValue(field.name, "");
                !!props.handleOnChange && props.handleOnChange(null);
              }}
            ></i>
          )} */}
        </AsyncTypeahead>
      )}
      {errors[field.name] && touched[field.name] ? (
        <div className="invalid-feedback text-red d-block">
          {errors[field.name].toString()}
        </div>
      ) : (
        <></>
        // <div className="feedback">
        //   <b>{props.label}</b> را لطفا وارد نمایید
        // </div>
      )}
    </>
  );
}
