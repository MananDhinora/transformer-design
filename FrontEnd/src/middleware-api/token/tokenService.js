import { jwtDecode } from "jwt-decode";
import useStore from "../../stores/Store";

class TokenService {
  static instance = new TokenService();

  static getInstance() {
    return TokenService.instance;
  }

  // Clears token from storage
  clearToken() {
    // useStore.setState({ token: null }); // Clear token from store
    // const store = useStore.getState();

    // Ensure token is cleared from both store and localStorage
    useStore.setState({
      token: null,
      user: null,
    });
  }

  // Retrieves authorization header
  getAuthorizationHeader() {
    const token = useStore.getState().token; // Get token from store

    return token ? `Bearer ${token}` : "";
  }

  // Setter for token
  set token(value) {
    if (value) {
      useStore.setState({ token: value }); // Set token in store
    } else {
      this.clearToken();
    }
  }

  // Getter for token
  get token() {
    const token = useStore.getState().token; // Get token from store

    return token;
  }

  // Validates token and checks for expiration
  isTokenValid() {
    const token = this.token;

    if (!token) {
      console.warn("No token found. Token is invalid.");
      return false;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      const isTokenExpired = decodedToken.exp < currentTime;

      if (isTokenExpired) {
        console.warn("Token is expired.");
        this.clearToken(); // Clear expired token
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error decoding token:", error);
      this.clearToken(); // Clear invalid token
      return false;
    }
  }

  // Helper to check token invalidity
  isTokenNotValid() {
    return !this.isTokenValid();
  }

  // Extracts user roles from the token
  // get userRoles() {
  //   const token = this.token;
  //   if (token) {
  //     try {
  //       console.log("Decoding token to extract user roles:", token);
  //       const decodedToken = jwtDecode(token);
  //       console.log("Decoded roles:", decodedToken.authorities || []);
  //       return decodedToken.authorities || [];
  //     } catch (error) {
  //       console.error("Error decoding roles from token:", error);
  //     }
  //   } else {
  //     console.warn("No token available to extract roles.");
  //   }
  //   return [];
  // }
}

export default TokenService.getInstance();
