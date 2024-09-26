
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
          decodeURIComponent(atob(str))
          return true;
        } catch (e) {
          return false;
        }
      };
    
       // get employee data from url
      const empid  =  isValidEncode(url.split('/').at(-1)) && isValidJSON(decodeURIComponent(atob(url.split('/').at(-1)))) ?  JSON.parse(decodeURIComponent(atob(url.split('/').at(-1)))) :  null;

      return empid
}


export default DecryptUrl;