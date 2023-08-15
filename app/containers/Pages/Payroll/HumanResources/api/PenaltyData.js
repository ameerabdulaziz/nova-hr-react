import axiosInstance from '../../api/axios';


const PenaltyData = (locale) => {
  const Apis = {};
  
  

  Apis.GetPenaltyList = async () => {
    debugger;
    const data = await axiosInstance.get(`HrPenalties/GetPenaltyList/${locale}`);
    const result = data.data;
    
    return result;
  };

  Apis.GetPenalty = async (id) => {
    debugger;
    const data = await axiosInstance.get(`HrPenalties/GetPenalty/${id}/${locale}`);
    var finaldata ={
      id: data.data.id,
      arName: data.data.arName,
      enName:data.data.enName,
      elementId: data.data.elementId,
      type: data.data.type,
      penaltyTypeList:data.data.penaltyTypeList,
      elementName:data.data.elementName,
      typeName:data.data.typeName
    };
    var ElementList=data.data.elementList;
    return {finaldata, ElementList };

  };
  Apis.SaveData = async (data,dataTable) => {
    debugger;

    var penaltyDetailsList=[];
   
        for(let i=0; i<dataTable.length; i++) {
            penaltyDetailsList.push({
                "penaltyTypeId": data.penaltyTypeList.find((ele) => ele.name === dataTable[i].PenaltyTypeName).id,
                "penaltyValue": dataTable[i].PenaltyValue,
                "sort":dataTable[i].index
              }) ;
              
        }

        var formdata={
            "id": data.id,
            "arName": data.arName,
            "enName": data.enName,  
            "elementId": data.elementId,
            "type": data.type,          
            "penaltyDetailsList":penaltyDetailsList
          }
    const result = await axiosInstance.post("HrPenalties/SaveData",formdata);
    return result;
  };
  Apis.Delete = async (id) => {
    debugger;
    const result = await axiosInstance.delete(`HrPenalties/DeleteData/${id}`);
    return result;
  };

  Apis.DeleteList = async (list) => {
    debugger;
    const result = await axiosInstance.post(`HrPenalties/DeleteList`,list);
    return result;
  };
  return Apis;
};

export default PenaltyData;
