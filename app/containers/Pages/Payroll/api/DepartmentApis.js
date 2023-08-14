import Axios from 'axios';
const DepartmentApis = () => {

    const deptApis = {};

    deptApis.GetList = async () => {
        
            const data = await Axios.get('http://160.153.234.244:8090/api/Department?brcode=1');
            const result = data.data ;
            const finaldata = result.map((obj) => {
                                return {
                                    ...obj,
                                    id: obj.Department_ID,
                                    name: obj.Department_Name,
                                    edited: false,
                                }
                            });
                            
            return finaldata;
    }

    deptApis.Save = async (Item) => {
        if(Item.id != Item.Department_ID)
        {
            let param='namear='+Item.name+'&nameen='+Item.Department_NameEn+'&id='+Item.Department_ID ;
            const data = await Axios.get('http://160.153.234.244:8090/api/Department?'+param)
            return data;
        }
        else
        {
            let param='namear='+Item.name+'&nameen='+Item.Department_NameEn+'&id='+Item.Department_ID+'&type=1' ;
            const data = await Axios.get('http://160.153.234.244:8090/api/Department?'+param)
            return data;
        }
    }

    

    deptApis.Update = async (Item) => {
        let param='namear='+Item.Department_Name+'&nameen='+Item.Department_NameEn+'&id='+Item.Department_ID+'&type=1' ;
        const data = await Axios.get('http://160.153.234.244:8090/api/Department?'+param)
        return data;
    }

    deptApis.Delete = async (Item) => {
        
            const data = await Axios.get(`http://160.153.234.244:8090/api/Department?brcode=1&id=${Item.Department_ID}`)
            return data;
       
    }


    return deptApis;
}


export default DepartmentApis;