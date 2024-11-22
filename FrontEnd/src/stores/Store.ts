/**
 * The `useStore` function is a Zustand store that manages the state of an authentication system.
 * It provides methods for logging in, signing up, logging out, and validating the user's token.
 * The store also manages the user's theme mode (light or dark) and any errors that occur during authentication.
 *
 * The store uses the `zustand/middleware` package to persist the user's data in localStorage.
 */

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

        try {
          const response = await UserControllerService.login({
            email,
            password,
          });

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
          // Add debug log
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
        set({ loading: true, error: null });
        try {
          const token = tokenService.token;

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

          const response = await UserControllerService.validateToken(
            `Bearer ${token}`
          );

          if (response && response.email) {
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
