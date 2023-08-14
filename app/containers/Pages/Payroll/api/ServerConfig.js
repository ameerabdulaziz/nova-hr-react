export const getAccessToken = () => {
    let token = localStorage.getItem("Token");
    if (!token) window.location.reload();
    return token;
  };