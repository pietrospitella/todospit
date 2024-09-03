import { AuthStore } from "@/types/store"
import { defineStore } from "pinia"

export const useAuthStore = defineStore("authstore", {
  state: (): AuthStore => ({
    user: {
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      phoneNumber: '',
      isAnonymous: false,
      accessToken: '',
      refreshToken: '',
      expiresIn: 0,
      tokenType: '',
      idToken: '',
      userMetadata: {},
      createdAt: 0,
      lastLoginAt: 0,
      lastRefreshAt: 0,
      providerData: {},
      stsTokenManager: {},
      apiKey: '',
      appName: '',
      authTime: 0,
      isDeleted: false,
      customAuth: false,
      tenantId: '',
      disabled: false,
      metadata: {},
      tokensValidAfterTime: 0,
      sessionClaims: {},
      appData: {},
      lastRefreshTime: 0
    },
    isSignedIn: false,
    guestMode: false
  }),
  getters: {
    getCurrentUser: (state: any) => state.user
  },
  actions: {
    loadUser(data: any) {
      this.$patch({user: data})
    },
    setGuestMode(value: boolean) {
      this.$patch({guestMode: value})
    }
  },
  persist: true
})
