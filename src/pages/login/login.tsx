import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd"

const Login = () => {
    return (
        <>
            {/* <h1>Sign in</h1>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <button>Log in</button>
            <label htmlFor="remember-me">Remember me</label>
            <input type="checkbox" name="" id="remember-me" />
            <a href="">Forgot password</a> */}

            <Layout style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
                <Space direction="vertical" align="center">
                    <h1>PIZZA</h1>
                    <Card bordered={false} style={{ width: '300px' }} title={<Space style={{ width: '100%', fontSize: 16, justifyContent: 'center' }}>
                        <LockFilled />
                        Sign in
                    </Space>}>

                        <Form initialValues={{ remember: true }} >
                            <Form.Item name={'username'} rules={[
                                {
                                    required: true,
                                    message: 'Please enter your username'
                                }, {
                                    type: 'email',
                                    message: 'Please enter valid email address'
                                }
                            ]}>
                                <Input prefix={<UserOutlined />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item name={'password'} rules={[
                                {
                                    required: true,
                                    message: 'Please enter your password'
                                }, {
                                    min: 8
                                }
                            ]}>
                                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                            </Form.Item>
                            <Flex justify="space-between"  >
                                <Form.Item name={'remember'} valuePropName="checked">
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <a href="">Forgot password</a>
                            </Flex>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }} >Log in</Button>
                            </Form.Item>
                        </Form>

                    </Card>
                </Space >
            </Layout>
        </>
    )
}

export default Login