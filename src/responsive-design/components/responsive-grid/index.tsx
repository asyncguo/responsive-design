import React from "react";
import { Col as AntdCol, ColProps, Row, RowProps } from "antd";
import { useGetAntdColSpan } from "@/responsive-design";
import { pickOthers } from "@/responsive-design/util";
import Descriptions from "./Descriptions";

export interface IResponsiveColProps extends Omit<ColProps, 'span' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'> {
  /** 横向，占据几列 */
  colSpan?: number;
}

/**
 * 自适应理念，遵循 3 : 2 : 1 的设计原则
 * 1. pc 优先，device 处于 desktop 模式时 columns 为 24 列 （与 antd 栅格断点保持一致）
 * 2. tablet 模式时 columns 为 16 列
 * 3. phone 模式时 columns 为 8 列
 * 
 * 即：colSpan 为 8 时，desktop 模式下占 1/3；tablet 模式下占 1/2；phone 模式下占 1/1
 */
const Col = (props: React.PropsWithChildren<IResponsiveColProps>) => {
  const { colSpan = 8, children } = props
  const { antdColSpan } = useGetAntdColSpan(colSpan)

  const antdProps = pickOthers(['span', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'], props)  

  return (
    <AntdCol {...antdProps} span={antdColSpan}>
      {children}
    </AntdCol>
  )
}

/**
 * 底层依赖 antd 的 Row、Col 
 * @example
 * <ResponsiveGrid>
 *  <ResponsiveGrid.Col colSpan={8}></ResponsiveGrid.Col>
 *  <ResponsiveGrid.Col colSpan={8}></ResponsiveGrid.Col>
 * </ResponsiveGrid>
 */
const ResponsiveGrid = (props: React.PropsWithChildren<RowProps>) => {
  return (
    <Row {...props} />
  )
}

ResponsiveGrid.Col = Col


/**
 * 兼容 antd 相关的布局组件的 hack 
 */
ResponsiveGrid.Descriptions = Descriptions
ResponsiveGrid.ProDescriptions = Descriptions

export default ResponsiveGrid
