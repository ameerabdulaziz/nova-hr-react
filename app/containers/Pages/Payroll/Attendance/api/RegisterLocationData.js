import axiosInstance from '../../api/axios';
import axios from "axios";


const RegisterLocationData = (locale) => {
  const Apis = {};


  Apis.GetList = async () => {
    
    const data = await axiosInstance.get(`AttLocation/GetList/${locale}`);
    const result = data.data;    
    return result;
  };

  Apis.GetDataById = async (id,locale) => {
    
    const data = await axiosInstance.get(`AttLocation/Get/${id}/${locale}`);
    
    return data.data;

  };
  Apis.Save = async (data) => {
    

    const result = await axiosInstance.post("AttLocation/Save",data);
    return result;
  };
  
  Apis.Delete = async (id) => {
    
    const result = await axiosInstance.delete(`AttLocation/Delete/${id}`);
    return result;
  };

//   Apis.DeleteList = async (list) => {
    
//     const result = await axiosInstance.post(`AttShift/DeleteList`,list);
//     return result;
//   };


Apis.GoogleMapsGetData = async (lat,lng) => {

    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBsMd6G6Ou5EV9Nbm_J2XD-vekjpPggyyc`
    // let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+${city},+${state}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&key=YOUR_API_KEY
    const data = await axios.get(url)
    // console.log("result =", data.data.results[0].formatted_address);
    const result = data.data;    
    return result;
  };

  
  return Apis;
};

export default RegisterLocationData;
