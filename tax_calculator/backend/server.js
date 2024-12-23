const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const roomPrices = {
  9: 200, 19: 200, 8: 200,
  31: 250,
  7: 140,
  22: 170, 18: 170, 25: 170, 17: 170, 26: 170,
  11: 120, 21: 120, 28: 120, 24: 120, 30: 120, 10: 120, 29: 120, 27: 120, 23: 120,20:120,
};

function calculateTaxes(totalIncome) {
  const getfundTaxRate = 0.025;
  const nhisTaxRate = 0.025;
  const covidTaxRate = 0.01;
  const vatRate = 0.15;
  
  const getfundTax = totalIncome * getfundTaxRate;
  const nhisTax = totalIncome * nhisTaxRate;
  const covidTax = totalIncome * covidTaxRate;

  const incomeWithTaxes = totalIncome + getfundTax + nhisTax + covidTax;
  const vat = incomeWithTaxes * vatRate;

  const totalTax = getfundTax + nhisTax + covidTax + vat;

  return {
    getfundTax,
    nhisTax,
    covidTax,
    vat,
    totalTax
  };
}

app.post('/calculate', (req, res) => {
  const { roomNumbers } = req.body;

  let totalIncome = 0;

  console.log("Received room numbers:", roomNumbers); // Debugging

  for (let room of roomNumbers) {
    if (!roomPrices[room]) {
      return res.status(400).json({ error: `Room ${room} is not valid.` });
    }
    totalIncome += roomPrices[room];
    console.log(`Adding room ${room} price: ${roomPrices[room]}`); // Debugging
  }

  console.log("Total income calculated:", totalIncome); // Debugging

  const taxes = calculateTaxes(totalIncome);

  res.json({
    totalIncome,
    taxes
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
