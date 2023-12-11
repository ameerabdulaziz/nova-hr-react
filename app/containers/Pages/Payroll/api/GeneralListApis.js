import axiosInstance from './axios';
const GeneralListApis = (locale) => {
  const Apis = {};

  Apis.GetDepartmentList = async () => {
    const data = await axiosInstance.get(
      `GeneralList/GetDepartmentList/${locale}`
    );

    return data.data;
  };

  Apis.GetEmployeeListByDepartment = async (department) => {
    const result = await axiosInstance.get(
      `GeneralList/GetEmployeeListByDepartment/${locale}?departmentId=${department}`
    );

    return result.data;
  };

  Apis.GetEmployeeList = async (IsInsured, medicalInsured) => {
    const result = await axiosInstance.get(
      `GeneralList/GetEmployeeList/${locale}?IsInsured=${IsInsured?true:false}&PrivMedCareInsured=${medicalInsured ? true : false}`
    );

    return result.data;
  };
  Apis.GetEmployeeListComponent = async (IsInsured) => {
    const result = await axiosInstance.get(
      `GeneralList/GetEmployeeListComponent/${locale}?IsInsured=${IsInsured?true:false}`
    );

    return result.data;
  };
  
  Apis.GetAlternativeEmployeeList = async (employeeId) => {
    const result = await axiosInstance.get(
      `GeneralList/GetAlternativeEmployeeList/${locale}?EmployeeId=${employeeId}`
    );

    return result.data;
  };

  Apis.GetYears = async () => {
    const result = await axiosInstance.get(`MdYear/GetListModel/${locale}`);
    return result.data;
  };
  Apis.GetMonths = async () => {
    const result = await axiosInstance.get(`MdMonth/GetListModel/${locale}`);
    return result.data;
  };
  Apis.GetRewards = async () => {
    const result = await axiosInstance.get(`HrRewards/GetListModel/${locale}`);
    return result.data;
  };
  Apis.GetPenaltyList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetPenaltyList/${locale}`
    );
    return result.data;
  };

  Apis.GetElementList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetElementList/${locale}`
    );
    return result.data;
  };
  Apis.GetElementListByType = async (TypeID,ElementCalcMethodId) => {
    const result = await axiosInstance.get(
      `GeneralList/GetElementList/${locale}?TypeID=${TypeID}&ElementCalcMethodId=${ElementCalcMethodId?ElementCalcMethodId:0}`
    );
    return result.data;
  };
  Apis.GetElementListByTemplate = async (templateId) => {
    const result = await axiosInstance.get(
      `GeneralList/GetElementListByTemplate/${templateId}/${locale}`
    );
    return result.data;
  };
  Apis.GetPayTemplateList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetPayTemplateList/${locale}`
    );
    return result.data;
  };

  Apis.getVacationBalanceById = async (employeeId) => {
    const result = await axiosInstance.get(
      `VacVacationTrx/GetEmpVacBalance/${locale}/${employeeId}`
    );
    return result.data;
  };

  Apis.GetVacGovernmentSickVacSetting = async (vacationId) => {
    const result = await axiosInstance.get(
      `VacGovernmentSickVacSetting/Get/${vacationId}/${locale}`
    );
    return result.data;
  };

  Apis.GetGovernmentSickVacList = async () => {
    const data = await axiosInstance.get(
      `GeneralList/GetGovernmentSickVacList/${locale}`
    );

    return data.data;
  };

  Apis.GetLicenseGradeList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetLicenseGradeList/${locale}`
    );
    return result.data;
  };
  Apis.GetEmployeeData = async (id,isWorkingYears,isVacBalance,OpenMonthData) => {
    const result = await axiosInstance.get(
      `GeneralList/GetEmployeeData/${id}/${locale}?isWorkingYears=${isWorkingYears?true:false}&isVacBalance=${isVacBalance?true:false}&OpenMonthData=${OpenMonthData?true:false}`);
    return result.data;
  };
  Apis.GetJobsList = async () => {
    const result = await axiosInstance.get(`MdJobs/GetListModel/${locale}`);
    return result.data;
  };

  Apis.GetExplanationTypeList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetExplanationTypeList/${locale}`
    );
    return result.data;
  };
  Apis.GetNewsTypeList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetNewsTypeList/${locale}`
    );
    return result.data;
  };

  Apis.GetSalaryStructureList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetSalaryStructureList/${locale}`
    );
    return result.data;
  };

  Apis.GetJobList = async () => {
    const result = await axiosInstance.get(`GeneralList/GetJobList/${locale}`);
    return result.data;
  };

  Apis.GetJobLevelList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetJobLevelList/${locale}`
    );
    return result.data;
  };

  Apis.GetkinshipLinkList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetkinshipLinkList/${locale}`
    );
    return result.data;
  };
  Apis.GetHiringSourceList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetHiringSourceList/${locale}`
    );
    return result.data;
  };
  Apis.GetContractTypeList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetContractTypeList/${locale}`
    );
    return result.data;
  };

  Apis.GetControlParameterList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetControlParameterList/${locale}`
    );
    return result.data;
  };

  Apis.GetRecHiringSourceList = async () => {
    const result = await axiosInstance.get(
      `RecHiringSource/GetListModel/${locale}`
    );
    return result.data;
  };

  Apis.GetQualificationsList = async () => {
    const result = await axiosInstance.get(
      `MdQualifications/GetListModel/${locale}`
    );
    return result.data;
  };

  Apis.GetIdentityTypeList = async () => {
    const result = await axiosInstance.get(
      `MdIdentityType/GetListModel/${locale}`
    );
    return result.data;
  };
  Apis.GetGenderList = async () => {
    const result = await axiosInstance.get(`MdGender/GetListModel/${locale}`);
    return result.data;
  };
  Apis.GetNationalityList = async () => {
    const result = await axiosInstance.get(
      `MdNationalities/GetListModel/${locale}`
    );
    return result.data;
  };
  Apis.GetReligionList = async () => {
    const result = await axiosInstance.get(
      `MdReligions/GetListModel/${locale}`
    );
    return result.data;
  };
  Apis.GetGovernmentList = async () => {
    const result = await axiosInstance.get(
      `MdGovernment/GetListModel/${locale}`
    );
    return result.data;
  };
  Apis.GetCityList = async () => {
    const result = await axiosInstance.get(`MdCity/GetListModel/${locale}`);
    return result.data;
  };

  Apis.GetSocialStatusList = async () => {
    const result = await axiosInstance.get(
      `MdSocialStatus/GetListModel/${locale}`
    );
    return result.data;
  };

  Apis.GetMilitaryStatusList = async () => {
    const result = await axiosInstance.get(
      `MdMilitaryStatus/GetListModel/${locale}`
    );
    return result.data;
  };
  Apis.GetSaluteList = async () => {
    const result = await axiosInstance.get(`MdSalute/GetListModel/${locale}`);
    return result.data;
  };
  Apis.GetEmpStatusList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetEmpStatusList/${locale}`
    );
    return result.data;
  };
  Apis.GetCustodyList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetCustodyList/${locale}`
    );

    return result.data;
  };
  Apis.GetUniformList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetUniformList/${locale}`
    );

    return result.data;
  };

  Apis.GetDocumentList = async () => {
    const result = await axiosInstance.get(
      `MdDocuments/GetListModel/${locale}`
    );
    return result.data;
  };

  Apis.GetResignReasonList = async () => {
    const result = await axiosInstance.get(
      `HrResignReason/GetListModel/${locale}`
    );

    return result.data;
  };
  Apis.GetCourseList = async () => {
    const result = await axiosInstance.get(`HrCourses/GetListModel/${locale}`);

    return result.data;
  };
  Apis.GetTrainingCenterList = async () => {
    
    const result = await axiosInstance.get(
      `HrTrainingCenter/GetListModel/${locale}`
    );

    return result.data;
  };
  Apis.GetTechLevelList = async () => {
    const result = await axiosInstance.get(`GeneralList/GetTechLevelList/${locale}`);

    return result.data;
  };

  Apis.GetManagerialLevelList = async () => {
    const result = await axiosInstance.get(`GeneralList/GetManagerialLevelList/${locale}`);

    return result.data;
  };

  Apis.GetMgrSuperEmpList = async () => {
    const result = await axiosInstance.get(`GeneralList/GetMgrSuperEmpList/${locale}`);

    return result.data;
  };

  Apis.GetApplicationStatusList = async (addpending = false, top2 = false) => {
    const result = await axiosInstance.get(`GeneralList/GetApplicationStatusList/${locale}?addpending=${addpending}&top2=${top2}`);

    return result.data;
  };

  Apis.GetJobAdvList = async () => {
    const result = await axiosInstance.get('GeneralList/GetJobAdvList');

    return result.data;
  };

  Apis.GetCallStatusList = async () => {
    const result = await axiosInstance.get(`GeneralList/GetCallStatusList/${locale}`);

    return result.data;
  };

  Apis.GetGradeList = async () => {
    const result = await axiosInstance.get(`MdGrade/GetListModel/${locale}`);

    return result.data;
  };

  Apis.GetPermissionList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetPermissionList/${locale}`
    );

    return result.data;
  };
  Apis.GetMissionList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetMissionList/${locale}`
    );

    return result.data;
  };
  Apis.GetDocumentList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetDocumentList/${locale}`
    );

    return result.data;
  };

  Apis.GetGovernmentSickVacList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetGovernmentSickVacList/${locale}`
    );
    return result.data;
  };

  Apis.GetVacList = async (HasBalance,NotBalanceVac ) => {
    const result = await axiosInstance.get(
      `GeneralList/GetVacationList/${locale}?HasBalance=${
        HasBalance ? HasBalance : false
      }
      &NotBalanceVac=${NotBalanceVac ? NotBalanceVac  : false}`
    );
    return result.data;
  };

  Apis.GetEmployeePenalties = async (id) => {
    const result = await axiosInstance.get(
      `HRPenaltyTransaction/GetEmployeePenalties/${id}`
    );
    return result.data;
  };

  Apis.GetBranchList = async () => {

    const data = await axiosInstance.get(
      `GeneralList/GetBranchList/${locale}`
    );

    return data.data;
  };
  Apis.GetShiftList = async () => {
    const result = await axiosInstance.get(
      `GeneralList/GetShiftList/${locale}`
    );

    return result.data;
  };

  Apis.GetMedicalInsuranceCentersList = async () => {
    const result = await axiosInstance.get(
      `MinsuranceCenters/GetListModel/${locale}`
    );

    return result.data;
  };

  Apis.GetMedicalInsuranceItemList = async () => {
    const result = await axiosInstance.get(
      `MinsuranceItem/GetListModel/${locale}`
    );

    return result.data;
  };

  Apis.GetMinsuranceCompanyList = async () => {
    const result = await axiosInstance.get(`MinsuranceCompany/GetListModel/${locale}`);

    return result.data;
  };

  Apis.GetMinsuranceCategoryList = async () => {
    const result = await axiosInstance.get(`MinsuranceCategory/GetListModel/${locale}`);

    return result.data;
  };

  Apis.GetDeviceList = async () => {
    const result = await axiosInstance.get(`AttDevice/GetListModel/${locale}`);

    return result.data;
  };
  Apis.GetLocationList = async () => {
    const result = await axiosInstance.get(`GeneralList/GetLocationList/${locale}`);

    return result.data;
  };
  Apis.GetSafeList = async () => {
    const result = await axiosInstance.get(`GeneralList/GetSafeList/${locale}`);

    return result.data;
  };

  return Apis;
};

export default GeneralListApis;
