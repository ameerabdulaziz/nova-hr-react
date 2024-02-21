import axiosInstance from '../../api/axios';
const SinsuranceCalculationTemplateData = () => {
  const api = {};

  api.GetList = async () => {
    const data = await axiosInstance.get('SinsuranceCalculationTemplate');
    const result = data.data;
    const finalData = result.map((obj) => ({
      id: obj.id,
      name: obj.arName,
      EnName: obj.enName,
      salaryLimit: obj.salaryLimit,
      companyShare: obj.companyShare,
      employeeShare: obj.employeeShare,
      fromAge: obj.fromAge,
      toAge: obj.toAge,
      isPercentage: obj.isPercentage ?? false,
      newSalaryLimit: obj.newSalaryLimit ?? '',
      edited: false,
    }));

    return finalData;
  };

  api.Save = async (Item) => {
    const data = {
      id: Item.id,
      arName: Item.name,
      enName: Item.EnName,
      salaryLimit: Item.salaryLimit,
      companyShare: Item.companyShare,
      employeeShare: Item.employeeShare,
      fromAge: Item.fromAge,
      toAge: Item.toAge,
      isPercentage: Item.isPercentage,
      newSalaryLimit: Item.newSalaryLimit,
    };

    const result = Item.id === 0
      ? await axiosInstance.post('SinsuranceCalculationTemplate', data)
      : await axiosInstance.put(`SinsuranceCalculationTemplate/${Item.id}`, data);
    return result;
  };

  api.Delete = async (Item) => {
    const data = await axiosInstance.delete(`SinsuranceCalculationTemplate/${Item.id}`);
    return data;
  };

  return api;
};

export default SinsuranceCalculationTemplateData;
