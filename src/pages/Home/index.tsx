import { ResponsiveGrid, useDevice } from '@/responsive-design';
import { PageContainer, ProDescriptions } from '@ant-design/pro-components';
import { Button, Row, Col, Descriptions, Tag, Grid } from 'antd';
import './index.less';
// import AppForm from './Form';


const { useBreakpoint } = Grid;

const HomePage: React.FC = () => {
  // const device = useDevice();
  const screens = useBreakpoint();
  console.log('screens:' , screens);
  

  return (
    <PageContainer ghost>
      <div>
        {/* <Button>device: </Button> <Tag>{device.name}</Tag> */}
      </div>

      {/* <AppForm/> */}

      <Row>
        <Col sm={16}>
          antd col-12
        </Col>
        <Col>antd col-12</Col>
      </Row>

      <ResponsiveGrid>
        <ResponsiveGrid.Col colSpan={12} span={8} xm={1} a={1} b={2}>col-12</ResponsiveGrid.Col>
        <ResponsiveGrid.Col>col-12</ResponsiveGrid.Col>
      </ResponsiveGrid>

      {/* <ResponsiveGrid.Descriptions>
        
      </ResponsiveGrid.Descriptions> */}

      {/* <ResponsiveGrid>
        <span>1111</span>
      </ResponsiveGrid> */}
      {/* <ResponsiveGrid>
        111
      </ResponsiveGrid> */}
      {/* <ResponsiveGrid>
        <div>
          col-12
        </div>
        <div>col-12</div>
      </ResponsiveGrid> */}
      {/* <ResponsiveGrid.Grid>
        <Row>

        <Col span={2} xs={4} sm={6} md={8} lg={10} xl={12}>
          col-12
        </Col>
        <Col span={12}>col-12</Col>
        </Row>
      </ResponsiveGrid.Grid> */}

      {/* <ResponsiveGrid gutter={24}>
        <ResponsiveGrid.Col span={2} xs={4} sm={6} md={8} lg={10} xl={12}>
          col-12
        </ResponsiveGrid.Col>
        <ResponsiveGrid.Col span={12}>col-12</ResponsiveGrid.Col>
      </ResponsiveGrid> */}

      <ResponsiveGrid.ProDescriptions>
        <ProDescriptions
          title="高级定义列表1"
          tooltip="包含了从服务器请求，columns等功能"
        >
          <ProDescriptions.Item label="进度条" valueType="progress">
            40
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="金额"
            tooltip="仅供参考，以实际为准"
            valueType="money"
          >
            100
          </ProDescriptions.Item>
          <ProDescriptions.Item label="百分比百分比百分比百分比" valueType="percent">
            100
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="金额"
            tooltip="仅供参考，以实际为准"
            valueType="money"
          >
            100
          </ProDescriptions.Item>
          <ProDescriptions.Item label="百分比" valueType="percent">
            100
          </ProDescriptions.Item>
        </ProDescriptions>
      </ResponsiveGrid.ProDescriptions>

      <ProDescriptions
          title="高级定义列表2"
          tooltip="包含了从服务器请求，columns等功能"
        >
          <ProDescriptions.Item label="进度条" valueType="progress">
            40
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="金额"
            tooltip="仅供参考，以实际为准"
            valueType="money"
          >
            100
          </ProDescriptions.Item>
          <ProDescriptions.Item label="百分比百分比百分比百分比百分比" valueType="percent">
            100
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="金额"
            tooltip="仅供参考，以实际为准"
            valueType="money"
          >
            100
          </ProDescriptions.Item>
          <ProDescriptions.Item label="百分比" valueType="percent">
            100
          </ProDescriptions.Item>
        </ProDescriptions>


      {/* <ResponsiveGrid.Grid>
        <Row>
          <Col span={8} xs={4} sm={6} md={8} lg={10} xl={12}>ResponsiveGrid 1 </Col>
          <Col span={8}>ResponsiveGrid 2</Col>
        </Row>
      </ResponsiveGrid.Grid> */}

      <ResponsiveGrid.Descriptions>
        <Descriptions
          title="Descriptions User Info" contentStyle={{color: 'red'}}>
          <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
          <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
          <Descriptions.Item label="Remark">empty</Descriptions.Item>
          <Descriptions.Item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>
      </ResponsiveGrid.Descriptions>

      <Descriptions column={1} title="User Info">
        <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item label="Remark">empty</Descriptions.Item>
        <Descriptions.Item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>
    </PageContainer>
  );
};

export default HomePage;
