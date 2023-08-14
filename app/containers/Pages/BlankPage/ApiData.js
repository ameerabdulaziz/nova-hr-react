import Axios from 'axios';
import { format, isValid } from 'date-fns';
const ApiData = (probs) => {
  const deptApis = {};
  
  // Account Type Api
  deptApis.GetDeptList = async () => {
    
    const data = await Axios.get(`http://160.153.234.244:8090/api/Department?brcode=${probs}`);
    const result = data.data;
    
    return result;
  };
  return deptApis;
};

export default ApiData;
