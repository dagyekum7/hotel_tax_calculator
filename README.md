# Hotel Tax Calculator

A web-based application for calculating hotel income and taxes. The app allows users to input the room numbers of occupied rooms, calculates the total income based on predefined room rates, and applies taxes like GetFund Levy, NHIL, COVID tax, and VAT.

## Features
- Calculate total income based on room prices.
- Apply various taxes: GetFund Levy (2.5%), NHIL (2.5%), COVID tax (1%), and VAT (15%).
- Input validation to ensure correct data entry.
- Display breakdown of taxes and total income.
- Room statistics like most used and most profitable rooms.

## Table of Contents
1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Usage](#usage)
4. [Technologies Used](#technologies-used)
5. [Contributing](#contributing)
6. [License](#license)

## Installation

### 1. Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/yourusername/hotel_tax_calculator.git
```

### 2. Navigate to backend and install dependencies
``cd backend
npm install
``
### 3.NAvigate to tax-frontend and install dependencies
```
cd tax-frontend
npm install
```

## Configuration 
1. Configure Backend
In the backend/server.js file, make sure the server is configured correctly. The backend runs on port 5000 by default

2. Configure Frontend
In the frontend/src/App.js file, ensure the API endpoint for calculating taxes is correct. By default, it's set to http://localhost:5000/calculate.

