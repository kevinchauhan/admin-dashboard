import { useQuery } from "@tanstack/react-query"
import { Card, Col, Form, Input, Row, Select } from "antd"
import { getTenants } from "../../../http/api"
import { Tenant } from "../../../types"

const UserForm = () => {

    const { data: tenants } = useQuery({
        queryKey: ['users'],
        queryFn: () => getTenants().then(res => res.data.data),
        retry: 1
    })

    return (
        <Row gutter={12}>
            <Col span={24}>
                <Card title='Basic Information' bordered={false}>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item label="First Name" name='firstName'>
                                <Input placeholder="" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Last Name" name='lastName'>
                                <Input placeholder="" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Email" name='email'>
                                <Input placeholder="" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Phone Number" name='phonenumber'>
                                <Input placeholder="" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
                <Card style={{ marginTop: '12px' }} title='Security Information' bordered={false}>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item label="Passwrod" name='password'>
                                <Input type="password" placeholder="***" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Confirm Password" name='confirmPassword'>
                                <Input type="password" placeholder="" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
                <Card style={{ marginTop: '12px' }} title='Roles' bordered={false}>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item label="Select Role" name='role'>
                                <Select placeholder='Role' style={{ width: '100%' }} allowClear={true}>
                                    <Select.Option value="admin">Admin</Select.Option>
                                    <Select.Option value="manager">Manager</Select.Option>
                                    <Select.Option value="user">User</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Select Restaurant" name='tenantId'>
                                <Select placeholder='Restaurant' style={{ width: '100%' }} allowClear={true}>
                                    {tenants?.length > 0 &&
                                        tenants.map((tenant: Tenant) =>
                                            <Select.Option key={tenant.id} value={tenant.id}>{tenant.name}</Select.Option>
                                        )
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}

export default UserForm