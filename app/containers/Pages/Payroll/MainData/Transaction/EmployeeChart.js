import React, { useRef, useState, useEffect } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import MyNode from "../../custom-node-chart/my-node";
import CompanyChartData from "../api/CompanyChartData";
import Button from "@mui/material/Button";
import PayRollLoader from "../../Component/PayRollLoader";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
const EmployeeChart = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const orgchart = useRef();
  const locale = useSelector((state) => state.language.locale);

  const getdata = async () => {
    const result = await CompanyChartData(locale).GetEmployeeChart();
    setData(result[0]);
    setIsLoading(false);
    console.log(result[0]);
  };

  useEffect(() => {
    getdata();
  }, []);

  const exportTo = () => {
    orgchart.current.exportTo("organization_chart", fileextension);
  };
  const save = async () => {
    var result = await CompanyChartData(locale).SaveEmployeeData(data);
    if (result.status == 200) {
      getdata();
      toast.success("Chart Saved Successfully!");
    } else {
      toast.error("error has occured!");
    }
  };

  const [fileextension, setFileextension] = useState("png");

  const onExtensionChange = (event) => {
    setFileextension(event.target.value);
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <div>
        <section className="toolbar">
          {}
          <span style={{ marginLeft: "2rem" }}>Fileextension: </span>
          <input
            id="rd-png"
            type="radio"
            value="png"
            checked={fileextension === "png"}
            onChange={onExtensionChange}
          />
          <label htmlFor="rd-png">png</label>
          <input
            style={{ marginLeft: "1rem" }}
            id="rd-pdf"
            type="radio"
            value="pdf"
            checked={fileextension === "pdf"}
            onChange={onExtensionChange}
          />
          <label htmlFor="rd-pdf">pdf</label>

          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={exportTo}
            style={{ marginLeft: "2rem" }}
          >
            Export
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={save}
            style={{ marginLeft: "2rem" }}
          >
            Save
          </Button>
        </section>
        <OrganizationChart
          ref={orgchart}
          datasource={data}
          chartClass="myChart"
          NodeTemplate={MyNode}
          pan={true}
          zoom={true}
        />
      </div>
    </PayRollLoader>
  );
};

export default EmployeeChart;
