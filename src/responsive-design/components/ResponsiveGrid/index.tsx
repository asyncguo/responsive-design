import React from "react";
import { useDevice } from "@/responsive-design";
import { Col, ColProps, Row, RowProps } from 'antd'

/** 栅格系统的 column 个数 */
const LAYOUT_COLUMNS = 24

/**
 * 处理 antd 的 Row 
 * @link https://4x.ant.design/components/grid-cn/
 * @example 
 * <ResponsiveGrid.Grid>
 *  <Row>
 *    <Col></Col>
 *    <Col></Col>
 *  </Row>
 * </ResponsiveGrid.Grid>
 */
const ResponsiveGridEnhancer = (props: React.PropsWithChildren) => {
  const { children } = props
  const { layoutColSpan } = useDevice()

  if (React.isValidElement(children)) {
    const { children: colChildren } = children.props
    console.log('colChildren',colChildren);
    
    const array = React.Children.toArray(colChildren)
    
    return React.cloneElement(
      children,
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

  return children
}

/**
 * 处理 antd 的 Descriptions 
 * @link https://4x.ant.design/components/descriptions-cn/
 * <ResponsiveGrid.Descriptions>
 *  <Descriptions>
 *    <Descriptions.Item></Descriptions.Item>
 *    <Descriptions.Item></Descriptions.Item>
 *  </Descriptions>
 * </ResponsiveGrid.Descriptions>
 */
const ResponsiveDescriptions = (props: React.PropsWithChildren) => {
  const { children } = props
  const { name: deviceName, layoutColSpan } = useDevice()

  if (React.isValidElement(children)) {
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

  return children
}

/**
 * 处理 ProDescriptions
 * @link https://procomponents.ant.design/components/descriptions
 * <ResponsiveGrid.ProDescriptions>
 *  <ProDescriptions>
 *    <ProDescriptions.Item></ProDescriptions.Item>
 *    <ProDescriptions.Item></ProDescriptions.Item>
 *  </ProDescriptions>
 * </ResponsiveGrid.ProDescriptions>
 */
const ResponsiveProDescriptions = (props: React.PropsWithChildren) => {
  return <ResponsiveDescriptions {...props} />
}

/**
 * 响应式栅格布局
 */
const ResponsiveGrid = (props: React.PropsWithChildren<RowProps>) => {
  const {
    children,
    ...rowProps
  } = props
  const { layoutColSpan } = useDevice()

  if (React.isValidElement(children) || Array.isArray(children)) {
    const array = React.Children.toArray(children)
    
    return (
      <Row {...rowProps}>
        {
          array.map((child, index) => {
            if (React.isValidElement((child))) {
              // TODO: child.type type is ?
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
  
  return children
};

ResponsiveGrid.Grid = ResponsiveGridEnhancer
ResponsiveGrid.Descriptions = ResponsiveDescriptions
ResponsiveGrid.ProDescriptions = ResponsiveProDescriptions

ResponsiveGrid.Col = Col
ResponsiveGrid.Col.displayName = 'ResponsiveGrid_Col'

export default ResponsiveGrid;
