import React from "react";
import PropTypes from "prop-types";
import "./my-node.css";
import randomcolor from "randomcolor";
import Face2Icon from '@mui/icons-material/Face2';
import { DOMAIN_NAME } from "../../../App/routes/sitemap";

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

const propTypes = {
  nodeData: PropTypes.object.isRequired
};

const MyNode = ({ nodeData }) => {
    //const levelColor = randomcolor();
    const colors = [
      "rgb(247, 186, 116)",
      "rgb(6, 133, 135)",
      "rgb(204, 220, 255)",
      "rgb(186, 229, 126)",
      "rgb(56, 211, 216)",
      "rgb(229, 2, 112)",
      "rgb(131, 195, 211)",
      "rgb(236, 196, 252)",
      
    ];
  
  const selectNode = () => {
    alert("Hi All. I'm " + nodeData.name + ". I'm a " + nodeData.title + ".");
  };

   {/* <div onClick={selectNode}>
      <div className="position">{nodeData.title}</div>
      <div className="fullname">{nodeData.name}</div>
      
    </div> */}
    
  return (
    
        <div className="card">
            <div className="image">
            <img
                /* src={`https://randomuser.me/api/portraits/men/${nodeData.employeeid}.jpg`} */
                src={nodeData.photo?nodeData.photo:DOMAIN_NAME+(nodeData.genderId == 1?'/images/avatars/pp_boy4.jpg':'/images/pp_girl.svg')}
                alt="Profile"
                style={{ borderColor: colors[nodeData.levelNo]  }}
            />
           
            </div>
            <div className="card-body">
            <h2>{nodeData.deptname}</h2>
            <p className="name">{nodeData.empname}</p>
            </div>
            <div className="card-footer" style={{ background: colors[nodeData.levelNo] }}>
              {nodeData.title}
            </div>
            <div></div>
        </div>
        
        
  );
};

MyNode.propTypes = propTypes;

export default MyNode;
