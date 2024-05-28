import React, { useState } from "react";
import "./SeatMap.css";

function Seat({ seat, onSelect }) {
  const handleSelect = () => {
    if (seat.number) {
      onSelect(seat);
    }
  };

  return (
    <div
      className={`seat ${
        !seat?.isAvailable
          ? "booked"
          : seat?.isSelected
          ? "selected"
          : "available"
      }`}
      onClick={handleSelect}
    >
      {seat?.number || ""}{" "}
      {/* Render seat number if it exists, otherwise empty string */}
    </div>
  );
}

function SeatMap() {
  const layout = {
    A: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      null,
      null,
      null,
      null,
      null,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
    ],
    B: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      null,
      null,
      null,
      null,
      null,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
    ],
    C: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      null,
      null,
      null,
      null,
      null,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
    ],
    D: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    E: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    F: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    G: [
      null,
      null,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      null,
      null,
    ],
    H: [
      null,
      null,
      null,
      null,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      null,
      null,
      null,
      null,
    ],
  };

  const getInitialSeatAvailability = () => {
    // Example: Randomly make some seats unavailable (booked)
    const unavailableSeats = [
 
      // ... Add more seat coordinates here
    ];

    const initialAvailability = {};
    for (const row in layout) {
      initialAvailability[row] = layout[row].map((seatNumber) => ({
        row:row,
        number: seatNumber,
        isAvailable: !unavailableSeats.some(
          (unavailableSeat) =>
            unavailableSeat.row === row && unavailableSeat.number === seatNumber
        ),
      }));
    }
  
    return initialAvailability;
  };

  const [seatData, setSeatData] = useState(getInitialSeatAvailability());
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSelect = (rowIndex, row, number) => { // Get row label (e.g., 'A')
    setSeatData((prevSeatData) => {
      const updatedLayout = { ...prevSeatData };
      const updatedRow = [...updatedLayout[rowIndex]]; 
      const seatIndex = updatedRow.findIndex((s) => s && s.number === number); 

      if (seatIndex !== -1) { 
        updatedRow[seatIndex] = {
          ...updatedRow[seatIndex],
          isSelected: !updatedRow[seatIndex].isSelected,
        };
        updatedLayout[rowIndex] = updatedRow; 
      }

      return updatedLayout;
    });

    setSelectedSeats((prevSelectedSeats) => {
      const seat = { row, number}; // Use the row label here
      if (prevSelectedSeats.some((s) => s.row === row && s.number === number)) {
        return prevSelectedSeats.filter(
          (s) => !(s.row === row && s.number === number)
        );
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

  return (
    <div className="seat-map-container">
      <div className="screen">Screen</div>
      <div className="seat-map">
      {Object.keys(seatData).map((row) => (
          <div className="row-container" key={row}>
            <div className="row-label">{row}</div> {/* Display row label */}
            <div className="row">
              {seatData[row].map((seat, index) => {
                if (seat.number) {
                  return <Seat key={`${seat.row}${seat.number}`} seat={seat} onSelect={() => handleSelect(row,seat.row, seat.number)} />;
                } else {
                  return  <div key={index} className="seat empty"></div> // Don't render empty seats
                }
              })}
            </div>
         
          </div>
        ))}
      </div>

      <div className="legend">
        <div className="seat available"></div> Available
        <div className="seat booked"></div> Booked
        <div className="seat selected"></div> Selected
      </div>
      <div>
        <h2>Selected Seats:{' '}{selectedSeats.length}</h2>
        <ul>
          {selectedSeats.map((seat) => (
            <li key={`${seat.row}-${seat.number}`}>
              {seat.row}
              {seat.number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SeatMap;
