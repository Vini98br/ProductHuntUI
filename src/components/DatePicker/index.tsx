import moment from "moment";
import React from "react";
import { SingleDatePicker } from "react-dates";
import { isBeforeDay, isSameDay } from "../../utils";

import { Container } from "./styles";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

export interface DatePickerProps {
  selectedDate: moment.Moment;
  focused: boolean;
  onDateChange?: (date: moment.Moment | null) => void;
  onFocusChange?: (value: { focused: boolean }) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  focused,
  onFocusChange = () => ({}),
  onDateChange = () => ({}),
}) => {
  return (
    <Container>
      <SingleDatePicker
        date={selectedDate}
        onDateChange={onDateChange}
        focused={focused}
        onFocusChange={onFocusChange}
        id="date-picker"
        numberOfMonths={1}
        isOutsideRange={(day) =>
          !isBeforeDay(day, moment()) && !isSameDay(day, moment())
        }
        displayFormat="D, MMM YYYY"
      />
    </Container>
  );
};

export default DatePicker;
