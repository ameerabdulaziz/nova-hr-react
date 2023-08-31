export const getAccessToken = () => {
    let token = localStorage.getItem("Token");
    if (!token) window.location.reload();
    return token;
  };

  
export const ServerURL = 'http://160.153.234.244:97/';