import React from "react"
import { useDevice } from "@/responsive-design"

/**
 * 处理 antd 的 Descriptions 或 ProDescriptions 的 hack 
 * @link https://4x.ant.design/components/descriptions-cn/
 * <ResponsiveGrid.Descriptions>
 *  <Descriptions>
 *    <Descriptions.Item></Descriptions.Item>
 *    <Descriptions.Item></Descriptions.Item>
 *  </Descriptions>
 * </ResponsiveGrid.Descriptions>
 */
const Descriptions = (props: React.PropsWithChildren) => {
  const { children } = props
  if (!React.isValidElement(children)) {
    throw new Error('ResponsiveGrid.Descriptions 的子组件只允许为 Descriptions 或 ProDescriptions');
  }
  const { column } = children.props
  const { name: deviceName } = useDevice()  
  
  const descriptionsProps = {
    column: column || { xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 },
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

export default Descriptions
