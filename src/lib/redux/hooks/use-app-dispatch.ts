import { useDispatch } from 'react-redux'
import { AppDispatch } from './app-dispatch.types'

export const useAppDispatch: () => AppDispatch = useDispatch
