import Title from "antd/es/typography/Title"
import { useAuthStore } from "../store"
import { Card, Col, List, Row, Skeleton, Statistic } from "antd"
import { LikeOutlined } from "@ant-design/icons"
import { useState } from "react"

const data = [
    {
        name: 'Kevin',
        address: 'Bandra',
        amount: 1250,
        status: 'preparing'
    },
    {
        name: 'Kevin',
        address: 'Bandra',
        amount: 1250,
        status: 'preparing'
    },
    {
        name: 'Kevin',
        address: 'Bandra',
        amount: 1250,
        status: 'preparing'
    },
    {
        name: 'Kevin',
        address: 'Bandra',
        amount: 1250,
        status: 'preparing'
    },
]

const Home = () => {

    const { user } = useAuthStore()
    const [list, setList] = useState(data)
    return (
        <div>
            <Title level={4}>Welcome, {user?.firstName} </Title>
            <Row gutter={16} >
                <Col span={12}>
                    <Row gutter={16}>
                        <Col span={12} style={{ marginBottom: 16 }}>
                            <Card bordered={false}>
                                <Statistic title="Total Orders" value={1128} prefix={<LikeOutlined />} />
                            </Card>
                        </Col>
                        <Col span={12} style={{ marginBottom: 16 }}>
                            <Card bordered={false}>
                                <Statistic title="Total Sales" value={93} />
                            </Card>
                        </Col>
                        <Col span={24} style={{ marginBottom: 16 }}>
                            <Card bordered={false}>
                                <Title level={5}>Sales</Title>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Title level={5}>Recent Orders</Title>
                        <List
                            className="demo-loadmore-list"
                            // loading={initLoading}
                            itemLayout="horizontal"
                            // loadMore={loadMore}
                            dataSource={list}
                            renderItem={(item) => (
                                <List.Item
                                // actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                                >
                                    {/* <Skeleton avatar title={false} loading={item.loading} active> */}
                                    <List.Item.Meta
                                        title={<a href="https://ant.design">{item.name}</a>}
                                        description={item.address}
                                    />
                                    <div>
                                        <span style={{ fontWeight: '500', marginRight: '15px' }}>{item.amount}</span>
                                        <span style={{ textTransform: "capitalize", padding: "8px 15px", borderRadius: '20px', background: '#EB57571F', color: 'red' }}>{item.status}</span>
                                    </div>
                                    {/* </Skeleton> */}
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Home