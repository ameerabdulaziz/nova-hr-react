import React, { useRef, useState, useEffect } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import MyNode from "../../custom-node-chart/my-node";
import CompanyChartData from "../api/CompanyChartData";
import useStyles from "../../Style";
import { Button, TextField } from "@mui/material";
import messages from "../messages";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import PayRollLoader from "../../Component/PayRollLoader";
import { useSelector } from "react-redux";

/* const CompanyChart = (intl) => { */
function CompanyChart(props) {
  const [data, setData] = useState({});
  /* const data = {

    id: "n1",
    deptname: "Lao Lao",
    empname: "Lao Lao",
    title: "general manager",
    children: [
      
      {
        id: "n3",
        deptname: "shymaa",
        empname: "Su Miao",
        title: "department manager",
        children: [
          { id: "n4", deptname: "moaaz",empname: "Tie Hua", title: "senior engineer" },
          
          { id: "n8",deptname: "malek", empname: "Pang Pang", title: "senior engineer" }
        ]
      },
      {
        id: "n10",
        deptname: "mohamed",
        empname: "Chun Miao",
        title: "department manager",
        children: [{ id: "n11",deptname: "mrawan", empname: "Pang Pang", title: "senior engineer" }]
      }
    ]
  };  */

  const [isLoading, setIsLoading] = useState(true);
  const [levelNo, setLevelNo] = useState("");
  const orgchart = useRef();
  const { classes } = useStyles();
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);

  const getdata = async () => {
    setIsLoading(true);
    const result = await CompanyChartData(locale).GetOrganizationChart(levelNo);
    setData(result[0]);
    setIsLoading(false);
    
  };

  useEffect(() => {
    getdata();
  }, [levelNo]);

  const exportTo = () => {
    orgchart.current.exportTo("organization_chart", fileextension);
  };
  const save = async () => {
    var result = await CompanyChartData(locale).SaveOrganizationData(data);
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
          {/* <label htmlFor="txt-filename">Filename:</label>
        <input
          id="txt-filename"
          type="text"
          value={filename}
          onChange={onNameChange}
          style={{ fontSize: "1rem", marginRight: "2rem" }}
        /> */}
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
          <span style={{ marginLeft: "2rem" }}></span>
          <TextField
            id="levelNo"
            name="levelNo"
            value={levelNo}
            onChange={(e) => setLevelNo(e.target.value)}
            label={intl.formatMessage(messages.levelNo)}
            variant="outlined"
            autoComplete="off"
          />

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
}

export default injectIntl(CompanyChart);
