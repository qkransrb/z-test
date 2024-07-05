import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { ResponsiveLine } from "@nivo/line";
import { calculateTotalServiceVolume } from "../../utils/chartUtil";
import { withComma } from "../../utils/textUtil";

const TradingChart = ({ setTotalServiceQuantity, setTotalServiceDate }) => {
  const theme = { fontSize: "12px", textColor: "#fff" };

  const [totalServiceAmount, setTotalServiceAmount] = useState([]);
  const [chartData, setChartData] = useState([]);

  // QTBK, QTBG Price
  const {
    price: { qtbk, qtbg },
  } = useSelector((state) => state.default);

  // 서비스 총 거래량 - (스왑)
  const fetchTotalServiceVolume = async () => {
    try {
      const { data } = await axios.get("/api/dashboard/totalVolume");
      setTotalServiceAmount(data);
    } catch (error) {
      console.error("fetchTotalServiceVolume - ", error);
    }
  };

  useEffect(() => {
    fetchTotalServiceVolume();
  }, []);

  useEffect(() => {
    if (qtbk && qtbg && totalServiceAmount.length > 0) {
      const result = calculateTotalServiceVolume(
        totalServiceAmount,
        qtbk,
        qtbg
      );
      setChartData(result);
      setTotalServiceQuantity(result[0].data[result[0].data.length - 1].y);
      setTotalServiceDate(result[0].data[result[0].data.length - 1].x);
    }
  }, [qtbk, qtbg, totalServiceAmount]);

  return (
    <>
      {chartData && (
        <ResponsiveLine
          theme={theme}
          curve="cardinal"
          colors={{ scheme: "paired" }}
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
            setTotalServiceQuantity(price);
            setTotalServiceDate(date);
            return (
              <div className="absolute -top-[6px] -left-[6px] w-3 h-3 border-2 border-red-500 rounded-full cursor-pointer"></div>
            );
          }}
          margin={{ top: 50, right: 60, bottom: 30, left: 20 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "0",
            max: "auto",
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
              return e % 500 === 0 ? `$ ${withComma(e)}` : "";
            },
          }}
          useMesh={true}
        ></ResponsiveLine>
      )}
    </>
  );
};

export default TradingChart;
