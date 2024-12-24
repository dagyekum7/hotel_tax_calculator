const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let roomPrices;

// Load room data dynamically
try {
  roomPrices = JSON.parse(fs.readFileSync('./rooms.json', 'utf8'));
} catch (error) {
  console.error('Error loading room configuration:', error);
  roomPrices = {}; // Empty fallback
}

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
    totalTax,
  };
}

app.post('/calculate', (req, res) => {
  const { roomNumbers } = req.body;

  let totalIncome = 0;

  for (let room of roomNumbers) {
    if (!roomPrices[room]) {
      return res.status(400).json({ error: `Room ${room} is not valid.` });
    }
    totalIncome += roomPrices[room];
  }

  const taxes = calculateTaxes(totalIncome);

  res.json({
    totalIncome,
    taxes,
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
