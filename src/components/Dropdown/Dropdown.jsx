import { useBooking } from "../../contexts/BookingContext"

export default function Dropdown({ items }) {
  const { selectedTimeSlot, setSelectedTimeSlot } = useBooking()

  return (
    <select
      className="form-select"
      value={selectedTimeSlot}
      onChange={(e) => setSelectedTimeSlot(e.target.value)}
    >
      <option value="">Pick a time slot</option>
      {items.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  )
}