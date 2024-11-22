// stores/Store.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserControllerService } from "../middleware-api";
import tokenService from "../middleware-api/token/tokenService";

// Define types
type User = {
  id?: string;
  username?: string;
  email: string;
  // roles?: string[];
};

type ThemeMode = "light" | "dark";

type AuthStore = {
  user: User | null;
  mode: ThemeMode;
  loading: boolean;
  error: string | null;
  token: string | null;
  autoLogin: () => Promise<boolean>;

  // Authentication methods
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  validateToken: () => Promise<boolean>;

  // Theme methods
  toggleColorMode: () => void;
};
const getInitialUser = () => {
  try {
    const storedState = JSON.parse(
      localStorage.getItem("auth-storage") || "{}"
    );
    return storedState.state?.user || null;
  } catch (e) {
    console.warn("Failed to parse stored user data:", e);
    return null;
  }
};
console.log("getInitialUser: ", getInitialUser());
const useStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: getInitialUser(),
      mode: "dark",
      loading: false,
      error: null,
      token: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        console.log("Attempting login with email:", email);
        try {
          const response = await UserControllerService.login({
            email,
            password,
          });
          console.log("Login response:", response);
          // set({ token: response.token });
          // console.log("User token:", { token: response.token });
          // Assuming response contains token and user info
          tokenService.token = response.token;

          set({
            token: response.token,
            user: {
              email: response.email,
              username: response.username,
              // roles: response.roles,
            },
            loading: false,
          });
          console.log("User state set:", {
            email: response.email,
            username: response.username,
          }); // Log user state
        } catch (error: any) {
          console.error("Login error:", error);
          set({
            error: error.message || "Login failed",
            loading: false,
            token: null,
          });
          throw error;
        }
      },

      signup: async (email: string, password: string, username: string) => {
        set({ loading: true, error: null });
        try {
          await UserControllerService.createUser({
            email,
            password,
            username,
          });

          // Directly call login
          // await get().login(email, password);

          set({ loading: false });
        } catch (error: any) {
          const errorMessage =
            error.status === 409
              ? "User with this email or username already exists"
              : error.body || error.message || "Signup failed";
          set({
            error: errorMessage,
            loading: false,
          });
          throw error;
        }
      },

      logout: () => {
        tokenService.clearToken();
        set({ user: null, token: null });
      },

      validateToken: async () => {
        try {
          const token = tokenService.token;
          if (!token) {
            console.warn("No token found for validation."); // Add debug log
            set({ user: null });
            return false;
          }

          const response = await UserControllerService.validateToken(
            `Bearer ${token}`
          );
          console.log("validateToken response:", response); // Add debug log
          if (response && response.user) {
            // Check for response.user
            set({ user: response.user });
            return true;
          } else {
            console.warn(
              "validateToken successful but no user data in response."
            ); // Add debug log
          }
          tokenService.clearToken();
          set({ user: null });
          return false;
        } catch (error) {
          console.error("validateToken error:", error); // Improve error logging
          tokenService.clearToken();
          set({ user: null });
          return false;
        }
      },
      autoLogin: async () => {
        console.log("START autoLogin method");
        set({ loading: true, error: null });
        try {
          const token = tokenService.token;
          console.log("Auto-login - Token:", token);

          if (!token) {
            console.warn("NO TOKEN FOUND");
            set({
              loading: false,
              user: null,
              token: null,
              error: "No token found",
            });
            return false;
          }

          if (!tokenService.isTokenValid()) {
            console.warn("TOKEN IS INVALID");
            tokenService.clearToken();
            set({
              loading: false,
              user: null,
              token: null,
              error: "Invalid token",
            });
            return false;
          }

          console.log("ATTEMPTING TOKEN VALIDATION");
          const response = await UserControllerService.validateToken(
            `Bearer ${token}`
          );

          console.log("TOKEN VALIDATION RESPONSE:", JSON.stringify(response));

          if (response && response.email) {
            console.log("SETTING USER STATE");
            const userState = {
              email: response.email,
              username: response.username,
            };

            set({
              token: token,
              user: userState,
              loading: false,
              error: null,
            });

            console.log(
              "USER STATE SET:",
              JSON.stringify(useStore.getState().user)
            );
            return true;
          }

          console.warn("TOKEN VALIDATION FAILED");
          tokenService.clearToken();
          set({
            user: null,
            token: null,
            loading: false,
            error: "Token validation failed",
          });
          return false;
        } catch (error) {
          console.error("CRITICAL AUTO-LOGIN ERROR:", error);
          tokenService.clearToken();
          set({
            user: null,
            token: null,
            loading: false,
            error: error.message || "Auto-login failed",
          });
          return false;
        } finally {
          console.log("END autoLogin method");
        }
      },

      toggleColorMode: () => {
        set((state) => ({
          mode: state.mode === "light" ? "dark" : "light",
        }));
      },
    }),

    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        mode: state.mode,
        user: state.user,
        token: state.token,
      }),
    }
  )
);

export default useStore;
