import ReactECharts from "echarts-for-react";

interface ChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: any;
}

const Chart: React.FC<ChartProps> = ({ option }) => {
  return <ReactECharts option={option} className="w-full" />;
};

export default Chart;
