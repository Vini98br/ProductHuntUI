import styled from "styled-components";

export const Container = styled.div`
  & .SingleDatePickerInput__withBorder {
    border-radius: 5px !important;
    > div {
      border-radius: 5px !important;
    }
  }

  & .DayPickerKeyboardShortcuts_show__bottomRight {
    ::before {
      border-right: 33px solid ${(props) => props.theme.colors.primary};
    }
  }

  & .DateInput_input__focused {
    border-bottom: 2px solid ${(props) => props.theme.colors.primary} !important;
  }

  & .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: ${(props) => props.theme.colors.primary} !important;
    border: 1px double ${(props) => props.theme.colors.primary} !important;
  }

  & .DateInput_input {
    border-radius: 5px !important;
    background-color: ${(props) => props.theme.colors.light_gray} !important;
    color: ${(props) => props.theme.colors.dark_gray} !important;
    font-size: 15px !important;
    line-height: normal !important;
    text-align: center;
    padding: 8px 8px !important;
  }
`;
