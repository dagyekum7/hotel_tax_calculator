import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling and animations

const roomPrices = {
  9: 200, 19: 200, 8: 200,
  31: 250,
  7: 140,
  22: 170, 18: 170, 25: 170, 17: 170, 26: 170,
  11: 120, 21: 120, 28: 120, 24: 120, 30: 120, 10: 120, 29: 120, 27: 120, 23: 120,
};

function App() {
  const [numRooms, setNumRooms] = useState('');
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [totalIncome, setTotalIncome] = useState(null);
  const [taxes, setTaxes] = useState(null);
  const [inputRoom, setInputRoom] = useState('');
  const [displayRooms, setDisplayRooms] = useState(false);
  const [roomStats, setRoomStats] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNumRoomsChange = (e) => {
    setNumRooms(e.target.value);
    setRoomNumbers([]);
    setCurrentRoomIndex(0);
    setTotalIncome(null);
    setTaxes(null);
    setDisplayRooms(false);
    setRoomStats(null);
    setErrorMessage('');
  };

  const handleRoomNumberChange = (e) => {
    setInputRoom(e.target.value);
  };

  const handleNextRoom = () => {
    if (inputRoom !== '') {
      const normalizedRoom = inputRoom.startsWith('0') ? inputRoom.replace(/^0+/, '') : inputRoom;

      // Validate the room number
      if (!roomPrices[normalizedRoom]) {
        setErrorMessage(`Room ${normalizedRoom} is not valid. Please enter a valid room number.`);
        return;
      }

      setRoomNumbers([...roomNumbers, normalizedRoom]);
      setInputRoom('');
      setCurrentRoomIndex(currentRoomIndex + 1);
      setErrorMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNextRoom();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/calculate', { roomNumbers });
      setTotalIncome(response.data.totalIncome);
      setTaxes(response.data.taxes);
      setErrorMessage('');

      const roomCount = roomNumbers.reduce((count, room) => {
        count[room] = (count[room] || 0) + 1;
        return count;
      }, {});

      const roomIncome = Object.keys(roomCount).reduce((acc, room) => {
        acc[room] = roomCount[room] * roomPrices[room];
        return acc;
      }, {});

      const mostUsedRoom = Object.keys(roomCount).reduce((a, b) => roomCount[a] > roomCount[b] ? a : b);
      const mostProfitableRoom = Object.keys(roomIncome).reduce((a, b) => roomIncome[a] > roomIncome[b] ? a : b);

      setRoomStats({
        mostUsedRoom,
        mostProfitableRoom,
      });
    } catch (error) {
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred during the calculation.");
      }
    }
  };

  const handleDisplayRooms = () => {
    setDisplayRooms(true);
  };

  return (
    <div className="App">
      <h1>Hotel Tax Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter the total number of rooms occupied in the month:</label>
          <input
            type="number"
            value={numRooms}
            onChange={handleNumRoomsChange}
            min="1"
            required
          />
        </div>

        {numRooms && currentRoomIndex < numRooms && (
          <div>
            <label>Enter Room {currentRoomIndex + 1} number:</label>
            <input
              type="number"
              value={inputRoom}
              onChange={handleRoomNumberChange}
              onKeyPress={handleKeyPress}
              min="1"
              max="100"
              required
            />
          </div>
        )}

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        {currentRoomIndex === parseInt(numRooms) && (
          <div>
            <button type="submit">Calculate</button>
            <button type="button" onClick={handleDisplayRooms}>Display Room Numbers</button>
          </div>
        )}
      </form>

      {displayRooms && (
        <div>
          <h3>Entered Room Numbers:</h3>
          <p>{roomNumbers.join(', ')}</p>
        </div>
      )}

      {roomStats && (
        <div className="room-stats">
          <h3>Room Statistics:</h3>
          <p>Room Used Most: {roomStats.mostUsedRoom}</p>
          <p>Room that Made the Most Money: {roomStats.mostProfitableRoom}</p>
        </div>
      )}

      {totalIncome !== null && (
        <div>
          <h2>Total Income: {totalIncome} GHC</h2>
          <h3>Taxes:</h3>
          <p>Getfund Tax: {taxes.getfundTax.toFixed(2)} GHC</p>
          <p>NHIS Tax: {taxes.nhisTax.toFixed(2)} GHC</p>
          <p>COVID Tax: {taxes.covidTax.toFixed(2)} GHC</p>
          <p>VAT: {taxes.vat.toFixed(2)} GHC</p>
          <p>Total Tax: {taxes.totalTax.toFixed(2)} GHC</p>
        </div>
      )}
    </div>
  );
}

export default App;
