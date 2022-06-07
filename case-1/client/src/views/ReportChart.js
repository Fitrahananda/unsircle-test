import React from "react";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTransaction } from "../store/actions/transtactionAction";
import { Chart as ChartJS } from "chart.js/auto";

export default function ReportChart() {
  const dispatch = useDispatch();
  const { transactionList } = useSelector((state) => state.transaction);

  const [dataTransactionYear, setDataTransactionYear] = useState();
  const [dataTransactionMonth, setDataTransactionMonth] = useState();
  const [dataTransactionDate, setDataTransactionDate] = useState();

  useEffect(() => {
    dispatch(fetchTransaction());
  }, []);
  useEffect(() => {
    if (transactionList) {
      setDataTransactionYear({
        labels: transactionList.map((data) => data.createdAt.split("-")[0]),
        datasets: [
          {
            label: "Years",
            data: transactionList.map((data) => data.total),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
      setDataTransactionMonth({
        labels: transactionList.map((data) => data.createdAt.split("-")[1]),
        datasets: [
          {
            label: "Month",
            data: transactionList.map((data) => data.total),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
      setDataTransactionDate({
        labels: transactionList.map((data) => {
          let dataDate;
          dataDate =
            data.createdAt.split("-")[2][0] + data.createdAt.split("-")[2][1];
          return dataDate;
        }),
        datasets: [
          {
            label: "Date",
            data: transactionList.map((data) => data.total),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }
  }, [transactionList]);

  return (
    <div
      style={{
        width: 700,
        marginTop: 40,
      }}
    >
      <div style={{ marginBottom: 90 }}>
        {dataTransactionYear && <Bar data={dataTransactionYear} />}
      </div>
      <div style={{ marginBottom: 90 }}>
        {dataTransactionMonth && <Bar data={dataTransactionMonth} />}
      </div>
      <div style={{ marginBottom: 90 }}>
        {dataTransactionDate && <Bar data={dataTransactionDate} />}
      </div>
    </div>
  );
}
