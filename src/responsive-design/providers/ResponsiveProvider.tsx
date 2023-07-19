import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ConfigProvider } from 'antd'
import { defaultConfig, phoneConfig } from '../config';

const configMap = {
  desktop: defaultConfig,
  tablet: defaultConfig,
  phone: phoneConfig,
};

export type ConfigProviderType = React.ComponentProps<typeof ConfigProvider>

export type DeviceName = 'phone' | 'tablet' | 'desktop';

export interface Device {
  /** 设备名 */
  name: DeviceName;
  /** 别名 */
  alias: string;
  /** 断点设置 */
  breakpoint: number;
  /** 24 栅格系统的占比 */
  layoutColSpan: number;
}
export const DESKTOP_DEVICE: Device = { name: 'desktop', alias: 'l', breakpoint: 835, layoutColSpan: 8} as const;
export const TABLET_DEVICE: Device = { name: 'tablet', alias: 'm', breakpoint: 415, layoutColSpan: 12 } as const;
export const PHONE_DEVICE: Device = { name: 'phone', alias: 's', breakpoint: 0, layoutColSpan: 24 } as const;

/** 设备集合 */
export const DEVICE_MAP: Record<DeviceName, Device> = {
  'desktop': DESKTOP_DEVICE,
  'tablet': TABLET_DEVICE,
  'phone': PHONE_DEVICE
}

export interface ResponsiveContextType {
  /** 设备上下文，默认继承自上层节点；顶层默认为 DESKTOP_DEVICE */
  device: Device;
  /** 组件配置上下文 */
  config?: ConfigProviderType
}

const ResponsiveContext = React.createContext<ResponsiveContextType>({
  device: DESKTOP_DEVICE,
  config: undefined
});

export const useResponsiveContext = () => useContext(ResponsiveContext);
export const useDevice = () => useResponsiveContext().device;

export interface ResponsiveProviderProps extends Omit<ResponsiveContextType, 'device'> {
  /** 设备名 */
  device?: DeviceName
}

/**
 * @example
 *  <ResponsiveProvider >
 *    ...
 *  </ResponsiveProvider>
 */
export function ResponsiveProvider(props: React.PropsWithChildren<ResponsiveProviderProps>) {  
  const { 
    device: defaultDevice,
    config, 
    children
  } = props
  const [device, setDevice] = useState<DeviceName>(defaultDevice || DESKTOP_DEVICE.name);
  
  // TODO: ResponsiveProvider 嵌套处理？
  
  useEffect(() => {
    const calculate = () => {
      const width = window.innerWidth

      if (width >= DESKTOP_DEVICE.breakpoint) {
        setDevice(DESKTOP_DEVICE.name)
      } else if (width >= TABLET_DEVICE.breakpoint) {
        setDevice(TABLET_DEVICE.name)
      } else if (width >= PHONE_DEVICE.breakpoint) {
        setDevice(PHONE_DEVICE.name)
      }
    }

    calculate()

    ConfigProvider.config({
      theme: {
        primaryColor: 'red',
      },
    });

    const handleResize = () => {
      calculate()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []);

  const ResponsiveContextValue = useMemo(() => {
    return {
      device: DEVICE_MAP[device],
      config: {
        ...(config || {}),
        ...configMap[device]
      }
    }
  }, [
    config,
    device
  ]);

  return (
    <ResponsiveContext.Provider value={ResponsiveContextValue}>
      <ConfigProvider {...ResponsiveContextValue.config}>{children}</ConfigProvider>
    </ResponsiveContext.Provider>
  );
}
