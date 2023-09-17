import React, { useCallback, useReducer } from "react";

const formerReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsvalid = true;
      for (const inputId in state.inputs) {
        if(!state.inputs[inputId]){
            continue;
        }
        if (inputId === action.inputId) {
          formIsvalid = formIsvalid && action.isValid;
        } else {
          formIsvalid = formIsvalid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsvalid,
      };
    case "SET_DATA":
      return {
        ...state,
        inputs: action.inputs,
        isValid: action.isValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formerReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      value: value,
      isValid: isValid,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch(
      { type: "SET_DATA", inputs: inputData, isValid: formValidity },
      []
    );
  }, []);
  return [formState, inputHandler, setFormData];
};
