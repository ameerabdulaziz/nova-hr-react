import axiosInstance from '../../containers/Pages/Payroll/api/axios';

const menuApi = {
    fetchApi: async (locale) => {
            const data = await axiosInstance.get(`Menu/${locale}`);           
            
            console.log(data.data);

            return data.data;
    }
}

export default menuApi;
