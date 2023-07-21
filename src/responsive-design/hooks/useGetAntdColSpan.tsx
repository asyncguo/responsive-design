import React from "react";
import { DeviceName, useDevice } from "../providers/ResponsiveProvider";

const ANTD_COLUMNS = 24

const responsiveColumnsMap: Record<DeviceName, number> = {
  'desktop': 24,
  'tablet': 16,
  'phone': 8
}

/**
 * 映射 antd 的栅格断点
 * 自适应理念，遵循 3 : 2 : 1 的设计原则
 * 1. pc 优先，device 处于 desktop 模式时 columns 为 24 列 （与 antd 栅格断点保持一致）
 * 2. tablet 模式时 columns 为 16 列
 * 3. phone 模式时 columns 为 8 列
 * 
 * 即：colSpan 为 8 时，desktop 模式下占 1/3；tablet 模式下占 1/2；phone 模式下占 1/1
 */
function useGetAntdColSpan(colSpan: number = 8) {
  const [antdColSpan, setAntdColSpan] = React.useState<number>();
  
  const { name: device } = useDevice()

  React.useEffect(() => {
    let newColSpan = 0
    const total = responsiveColumnsMap[device]

    // colSpan 大于当前设备 columns 总数时，直接占满一行即可
    if (colSpan >= total) {
      newColSpan = ANTD_COLUMNS
    } else {
      newColSpan = colSpan * (ANTD_COLUMNS / total)
    }

    setAntdColSpan(newColSpan)
  }, [device, colSpan]);
  
  return {
    antdColSpan
  }
}

export default useGetAntdColSpan;
