// 运行时配置

import React from "react";
import { ResponsiveProvider } from "./responsive-design";
import { RuntimeConfig } from "@umijs/max";

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

export const rootContainer: RuntimeConfig['rootContainer'] = (container) => {
  return React.createElement(({children}) => {
    return (
      <ResponsiveProvider>{children}</ResponsiveProvider>
    )
  }, null, container);
};
