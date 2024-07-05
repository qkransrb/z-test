import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";
import { calculateTotalDepositAmount } from "../../utils/chartUtil";
import moment from "moment";
import { withComma } from "../../utils/textUtil";

const StakingChart = ({ setTotalDepositQuantity, setTotalDepositDate }) => {
  const theme = { fontSize: "12px", textColor: "#fff" };

  const [totalDepositAmount, setTotalDepositAmount] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartMaxSize, setChartMaxSize] = useState(0);

  // QTBK, QTBG Price
  const {
    price: { qtbk, qtbg },
  } = useSelector((state) => state.default);

  // 서비스 총 예치 급액 - (예치, 스테이킹)
  const fetchTotalDepositAmount = async () => {
    try {
      const { data } = await axios.get("/api/dashboard/totalAmount");
      setTotalDepositAmount(data);
    } catch (error) {
      console.error("fetchTotalDepositAmount - ", error);
    }
  };

  useEffect(() => {
    fetchTotalDepositAmount();
  }, []);

  useEffect(() => {
    if (qtbk && qtbg && totalDepositAmount.length > 0) {
      const result = calculateTotalDepositAmount(
        totalDepositAmount,
        qtbk,
        qtbg
      );
      setChartData(result);
      setTotalDepositQuantity(result[0].data[result[0].data.length - 1].y);
      setTotalDepositDate(result[0].data[result[0].data.length - 1].x);
      setChartMaxSize(result[0].data[result[0].data.length - 1].y + 10000);
    }
  }, [qtbk, qtbg, totalDepositAmount]);

  const changeChartState = (price, date) => {
    setTotalDepositQuantity(price);
    setTotalDepositDate(date);
  };

  return (
    <>
      {chartData && (
        <ResponsiveLine
          theme={theme}
          curve="cardinal"
          colors={{ scheme: "accent" }}
          lineWidth={2}
          enableArea={true}
          areaOpacity={0.3}
          enablePoints={false}
          enableGridX={false}
          enableGridY={false}
          data={chartData}
          tooltip={(v) => {
            const date = v.point.data.x;
            const price = v.point.data.y;
            changeChartState(price, date);
            return (
              <div className="absolute -top-[6px] -left-[6px] w-3 h-3 border-2 border-red-500 rounded-full cursor-pointer"></div>
            );
          }}
          margin={{ top: 50, right: 60, bottom: 30, left: 20 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "0",
            max: chartMaxSize,
            stacked: true,
            reverse: false,
          }}
          yFormat=""
          axisTop={null}
          axisLeft={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 12,
            tickRotation: 0,
            format: (e) => {
              return moment(e).format("MM/DD");
            },
          }}
          axisRight={{
            orient: "left",
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            legend: "",
            legendOffset: -40,
            legendPosition: "middle",
            format: (e) => {
              return e % 4000 === 0 ? `$${withComma(e)}` : "";
            },
          }}
          useMesh={true}
        ></ResponsiveLine>
      )}
    </>
  );
};

export default StakingChart;
