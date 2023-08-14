import { AuthState } from '@/types/auth.types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: AuthState = {
  isAuthenticated: false,
  user: 'Berkay Askin',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true
    },
  },
})

export const { login } = authSlice.actions
export default authSlice.reducer
