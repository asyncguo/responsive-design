import { useDevice, DeviceName } from "@/responsive-design";
import React from "react";
import { Col, ColProps, Row, RowProps } from 'antd'

/** 栅格系统的 column 个数 */
const LAYOUT_COLUMNS = 24

interface IResponsiveGridProps extends RowProps {
  /** children 组件名称 */
  childrenName?: 'Grid' | 'Descriptions' | 'ProDescriptions'
}

/**
 * Grid enhancer
 * @link https://4x.ant.design/components/grid-cn/
 */
const gridEnhancer = (children: React.ReactElement, options: {
  layoutColSpan: number
}) => {
  const { layoutColSpan } = options
  const { children: colChildren } = children.props
  const array = React.Children.toArray(colChildren)
  
  return React.cloneElement(
    children as React.ReactElement,
    {
      children: array.map((child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(
            child,
            {
              // 若外部 Col 设置了 xs、sm、md、lg、xl、xxl，span 不再生效（与原始 span 效果一致）
              span: layoutColSpan,
            } as ColProps
          )
        }

        return child
      })
    }
  )
}

/**
 * Descriptions enhancer
 * @link https://4x.ant.design/components/descriptions-cn/
 */
const descriptionsEnhancer = (children: React.ReactElement, options: {
  layoutColSpan: number
  deviceName: DeviceName
}) => {
  const { deviceName, layoutColSpan } = options
  const descriptionsProps = {
    column: LAYOUT_COLUMNS / layoutColSpan,
  }
  if (deviceName === 'phone') {
    // 在移动端上，描述项的样式保持【左右对齐】，与店员端样式拉齐
    Object.assign(descriptionsProps, {
      contentStyle: {
        ...(children.props?.contentStyle || {}),
        justifyContent: 'flex-end'
      }
    })
  }
  return React.cloneElement(
    children,
    descriptionsProps
  )
}

/**
 * ProDescriptions enhancer
 * @link https://procomponents.ant.design/components/descriptions
 */
const proDescriptionsEnhancer = (children: React.ReactElement, options: {
  layoutColSpan: number
  deviceName: DeviceName
}) => {
  const { deviceName, layoutColSpan } = options
  
  return descriptionsEnhancer(children, {
    layoutColSpan,
    deviceName
  })
}

/**
 * 响应式栅格布局
 */
const ResponsiveGrid = (props: React.PropsWithChildren<IResponsiveGridProps>) => {
  const { 
    childrenName,
    children,
    ...rowProps
  } = props
  const { name: deviceName, layoutColSpan } = useDevice()
  
  if (Array.isArray(children)) {
    const array = React.Children.toArray(children)
    console.log('array',array);
    
    return (
      <Row {...rowProps}>
        {
          array.map((child, index) => {
            if (React.isValidElement((child))) {
              const displayName = (child.type as any).displayName
              
              if (displayName === 'ResponsiveGrid_Col') {
                // Col 元素直接 clone 即可
                return React.cloneElement(child, {
                  // 若外部 Col 设置了 xs、sm、md、lg、xl、xxl，span 不再生效（与原始 span 效果一致）
                  span: layoutColSpan
                } as ColProps)
              }

              return (
                <Col
                  key={child?.key || index}
                  span={layoutColSpan}
                >
                  {child}
                </Col>
              )
            }
            
            return child
          })
        }
      </Row>
    )
  }

  if (!React.isValidElement(children)) return children

  const originalChildren = children as React.ReactElement
  // 以下针对现有组件（仅对 Grid、Descriptions、）做 hack 处理
  switch (childrenName) {
    case 'Grid':
      return gridEnhancer(originalChildren, {
        layoutColSpan
      })
    case 'Descriptions':
      return descriptionsEnhancer(originalChildren, {
        deviceName,
        layoutColSpan
      })
    case 'ProDescriptions':
      return proDescriptionsEnhancer(originalChildren, {
        deviceName,
        layoutColSpan
      })
  }
  
  return children
};

ResponsiveGrid.Col = Col
ResponsiveGrid.Col.displayName = 'ResponsiveGrid_Col'

export default ResponsiveGrid;
