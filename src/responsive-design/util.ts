/**
 * 过滤出其他属性
 */
const pickOthers = (
  /** 过滤的参照对象，最终的结果只保留不在参照对象中的key */
  holdProps: string | string[],
  /** 被过滤的对象 */
  props: Record<string, any>
) => {
  const others: any = {}
  if (typeof holdProps === 'string') {
    // eslint-disable-next-line no-param-reassign
    holdProps = [holdProps]
  }

  for(const key in props) {
    if (holdProps.indexOf(key) === -1) {
      others[key] = props[key]
    }
  }

  return others
}

export {
  pickOthers
}