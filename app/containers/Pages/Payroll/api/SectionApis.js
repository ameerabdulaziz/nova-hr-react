import Axios from 'axios';
const SectionApis = () => {

    const deptApis = {};

    deptApis.GetList = async (anchorTable) => {
        let index=0 ;
            const data = await Axios.get('http://160.153.234.244:8090/api/section?brcode=1');
            const result = data.data ;
            const finaldata = result.map((obj) => {
                index++;
               
                                return {
                                    ...obj,
                                    id: index,
                                    name: obj.Section_Name,
                                    edited: false,
                                }
                            });
            const departments = await Axios.get('http://160.153.234.244:8090/api/Department?brcode=1');
            
            const deptList = departments.data.map((obj) => obj.Department_Name);
            console.log(deptList) ;
            anchorTable[2].options=deptList;
            anchorTable[2].initialValue=deptList[0];
            
            return {finaldata,anchorTable};
    }

    deptApis.Save = async (Item) => {
        const deptid=1;//Item.Department_ID;;
        if(Item.id != Item.Section_ID)
        {
            
            let param='namear='+Item.Section_Name+'&nameen='+Item.Section_NameEn+'&id='+Item.Section_ID+'&deptid='+deptid ;
            const data = await Axios.get('http://160.153.234.244:8090/api/Section?'+param)
            return data;
        }
        else
        {
            let param='namear='+Item.name+'&nameen='+Item.Section_NameEn+'&id='+Item.Section_ID+'&deptid='+deptid+'&type=1' ;
            const data = await Axios.get('http://160.153.234.244:8090/api/Section?'+param)
            return data;
        }
    }

    

    deptApis.Update = async (Item) => {
        let param='namear='+Item.name+'&nameen='+Item.Section_NameEn+'&id='+Item.Section_ID+'&type=1' ;
        const data = await Axios.get('http://160.153.234.244:8090/api/Section?'+param)
        return data;
    }

    deptApis.Delete = async (Item) => {
        
            const data = await Axios.get(`http://160.153.234.244:8090/api/Section?brcode=1&id=${Item.Section_ID}&deptid=${Item.Department_ID}`)
            return data;
       
    }


    return deptApis;
}


export default SectionApis;