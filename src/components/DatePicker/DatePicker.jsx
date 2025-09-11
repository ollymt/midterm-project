import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useBooking } from '../../contexts/BookingContext';
import './DatePicker.css';

export default function MyDatePicker() {
  const { selectedDate, setSelectedDate } = useBooking(); // use context directly

  // Disable past dates
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const filterPassedDate = (date) => date >= tomorrow;

  return (
    <div className='datepicker-cont'>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)} // updates context
        dateFormat="MMMM d, yyyy"
        placeholderText="Select a date"
        filterDate={filterPassedDate}
        isClearable
        showYearDropdown
        scrollableYearDropdown
      />
    </div>
  );
}
