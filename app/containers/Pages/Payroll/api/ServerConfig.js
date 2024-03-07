export const getAccessToken = () => {
  const token = localStorage.getItem('Token');
  if (!token) window.location.reload();
  return token;
};

export const ServerURL = window.config.apiUrl;
