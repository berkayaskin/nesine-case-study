import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from './app-selector.types'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
