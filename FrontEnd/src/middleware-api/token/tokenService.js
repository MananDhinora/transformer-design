import { jwtDecode } from "jwt-decode";
class TokenService {
  static instance = new TokenService(); // Initialize directly

  static getInstance() {
    return TokenService.instance;
  }

  clearToken() {
    localStorage.removeItem("token");
  }

  getAuthorizationHeader() {
    const token = this.token;
    return token ? `Bearer ${token}` : "";
  }

  set token(token) {
    localStorage.setItem("token", token);
  }

  get token() {
    return localStorage.getItem("token");
  }

  isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const isTokenExpired = decodedToken.exp < currentTime;

      if (isTokenExpired) {
        localStorage.removeItem("token");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Token validation error:", error);
      localStorage.removeItem("token");
      return false;
    }
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  get userRoles() {
    const token = this.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.authorities);
      return decodedToken.authorities;
    }
    return [];
  }
}
export default TokenService.getInstance();
