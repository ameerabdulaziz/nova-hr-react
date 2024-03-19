
const DecryptUrl = () => {

      // decode URL 
      let url = decodeURI(window.location.href)

      const isValidJSON = (str) => {
        try {
          JSON.parse(str);
          return true;
        } catch (e) {
          return false;
        }
      };
    
      const isValidEncode = str => {
        try {
          atob(str)
          return true;
        } catch (e) {
          return false;
        }
      };
    
       // get employee data from url
      const {empid}  =  isValidEncode(url.split('/').at(-1)) && isValidJSON(atob(url.split('/').at(-1))) ?  JSON.parse(atob(url.split('/').at(-1))) : {empid:{id: 0, name: ""}};

      return empid
}


export default DecryptUrl;