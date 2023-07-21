export {
  PHONE_DEVICE,
  DESKTOP_DEVICE,
  TABLET_DEVICE,
  useDevice,
  useResponsiveContext,
  ResponsiveProvider
} from './providers/ResponsiveProvider'

export type {
  DeviceName,
  ResponsiveContextType
} from './providers/ResponsiveProvider'

export * from './components/index'

export { default as useGetAntdColSpan } from './hooks/useGetAntdColSpan'
