import React, { useRef, useState,useEffect } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import MyNode from "../../custom-node-chart/my-node";
import CompanyChartData from '../api/CompanyChartData';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import Alert from '../../Component/Alert';

import { Toaster ,toast} from 'react-hot-toast';

const EmployeeChart = () => {
 const [data,setData]=useState({}) ;   
  const orgchart = useRef();
  
  const getdata =  async () => {
    
      const result =  await CompanyChartData().GetEmployeeChart();      
      setData(result[0]); 
      console.log(result[0]);    
  };
  
  useEffect(() => {
    getdata();
  }, []);

  const exportTo = () => {
    
    orgchart.current.exportTo("organization_chart", fileextension);
  };
  const save = async () => {    
    var result = await CompanyChartData().SaveEmployeeData(data);
    if(result.status==200)
    {
      getdata();
      toast.success("Chart Saved Successfully!");
    }
    else
    {
      toast.error("error has occured!");
    }   
    
  };

  const [fileextension, setFileextension] = useState("png");

  const onExtensionChange = event => {
    setFileextension(event.target.value);
  };
  

  return (
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
        
        <Button variant="contained" color="primary" size="small" onClick={exportTo} style={{ marginLeft: "2rem" }}>
          Export
        </Button>
        <Button variant="contained" color="primary" size="small" onClick={save} style={{ marginLeft: "2rem" }}>
          Save
        </Button>
      </section>
    <OrganizationChart
      ref={orgchart} 
      datasource={data}
      chartClass="myChart"
      NodeTemplate={MyNode}
      pan={true} zoom={true} 
    />
    </div>
  );
};

export default EmployeeChart;
