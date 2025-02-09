"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";
import { Card, CardContent, MenuItem, Select, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";

const SummarySector = () => {
  const [data, setData] = useState([]);
  const [sector, setSector] = useState("All");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch("/cleaned_world_bank_projects_pakistan_2024.csv")
      .then(response => response.text())
      .then(csvData => {
        const parsedData = Papa.parse(csvData, { header: true, dynamicTyping: true }).data;
        setData(parsedData);
      });
  }, []);

  useEffect(() => {
    setFilteredData(sector === "All" ? data : data.filter(project => project.sector1 === sector));
  }, [sector, data]);

  const handleDownload = () => {
    const csvContent = [
      ["Project Name", "Implementing Agency", "Approval Date", "Closing Date", "Funding Amount"],
      ...filteredData.map(p => [p.project_name, p.impagency || "Unknown", p.boardapprovaldate, p.closingdate, p.totalcommamt || "N/A"])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "project_data.csv";
    link.click();
  };

  const sectors = ["All", ...new Set(data.map(d => d.sector1).filter(Boolean))];
  const totalAmount = data.reduce((sum, d) => sum + (d.totalcommamt || 0), 0);

  const sectorChartData = sectors.filter(s => s !== "All").map(s => {
    const sectorTotal = data.filter(d => d.sector1 === s).reduce((sum, d) => sum + (d.totalcommamt || 0), 0);
    return {
      name: s,
      value: ((sectorTotal / totalAmount) * 100).toFixed(2),
    };
  });

  const timeSeriesData = Object.values(
    filteredData.reduce((acc, project) => {
      const date = project.boardapprovaldate?.split("T")[0];
      if (date) {
        if (!acc[date]) acc[date] = { date, count: 0 };
        acc[date].count += 1;
      }
      return acc;
    }, {})
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="grid gap-6">
      <Select value={sector} onChange={(e) => setSector(e.target.value)}>
        {sectors.map(s => (
          <MenuItem key={s} value={s}>{s}</MenuItem>
        ))}
      </Select>

      <Button variant="contained" color="primary" onClick={handleDownload} sx={{ mb: 3 }}>
        Download Project Data
      </Button>

      <Card>
        <CardContent style={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={sectorChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                {sectorChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent style={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent style={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="impagency" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalcommamt" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Implementing Agency</TableCell>
                <TableCell>Approval Date</TableCell>
                <TableCell>Closing Date</TableCell>
                <TableCell>Funding Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((project, index) => (
                <TableRow key={index}>
                  <TableCell>{project.project_name}</TableCell>
                  <TableCell>{project.impagency || "Unknown"}</TableCell>
                  <TableCell>{project.boardapprovaldate}</TableCell>
                  <TableCell>{project.closingdate}</TableCell>
                  <TableCell>${project.totalcommamt ? project.totalcommamt.toLocaleString() : 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default SummarySector;
