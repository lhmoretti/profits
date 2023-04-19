import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./App.css";

function App() {
  const [months, setMonths] = useState(12);
  const [saveMonth, setSaveMonth] = useState(10000);
  const [annualPercentProfit, setAnnualPercentProfit] = useState(63.4);
  const [monthlyProfits, setMonthlyProfits] = useState([]);

  const calculateMonthlyProfits = () => {
    const profitPercentMonth = parseFloat(annualPercentProfit).toFixed(2) / 12;
    const newMonthlyProfits = [];

    for (let i = 1; i <= parseInt(months); i++) {
      const totalSavings = Math.floor(saveMonth * i * 100) / 100;
      const profit =
        Math.floor((totalSavings / 100) * profitPercentMonth * 100) / 100;
      const totalSavingsPlusProfit =
        Math.floor((totalSavings + profit) * 100) / 100;
      newMonthlyProfits.push({
        month: i,
        profit,
        totalSavings,
        totalSavingsPlusProfit,
      });
    }

    setMonthlyProfits(newMonthlyProfits);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Calculadora de ganancias</h1>
        <div className="mb-4">
          <label className="block mb-1">Meses</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-md"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Ahorro mensual</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-md"
            value={saveMonth}
            onChange={(e) => setSaveMonth(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Porcentaje anual</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-md"
            value={annualPercentProfit}
            onChange={(e) => setAnnualPercentProfit(e.target.value)}
          />
        </div>
        <button
          className="w-full py-2 px-3 bg-blue-500 text-white rounded-md"
          onClick={calculateMonthlyProfits}
        >
          Calcular
        </button>
        {monthlyProfits.length > 0 && (
          <div className="mt-6">
            <LineChart
              width={500}
              height={300}
              data={monthlyProfits}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                name="Ganancia"
                type="monotone"
                dataKey="profit"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                name="Total"
                type="monotone"
                dataKey="totalSavings"
                stroke="#82ca9d"
              />
              <Line
                name="Total + ganancia"
                type="monotone"
                dataKey="totalSavingsPlusProfit"
                stroke="#FF5733"
              />
            </LineChart>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
