import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons"
import { useMutation } from "@tanstack/react-query"
import { Alert, Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd"
import { login } from "../../http/api"
import { Credentials } from "../../types"

const loginUser = async (credentials: Credentials) => {
    const { data } = await login(credentials)
    return data
}

const Login = () => {

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['login'],
        mutationFn: loginUser,
        onSuccess: async () => {
            console.log('login successfully...')
        }
    })

    return (
        <>
            <Layout style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
                <Space direction="vertical" align="center">
                    <h1>PIZZA</h1>
                    <Card bordered={false} style={{ width: '300px' }} title={<Space style={{ width: '100%', fontSize: 16, justifyContent: 'center' }}>
                        <LockFilled />
                        Sign in
                    </Space>}>

                        <Form initialValues={{ remember: true }} onFinish={(values) => mutate(values)} >
                            {isError && <Alert type="error" message={error.message} style={{ marginBottom: '24px' }} />}
                            <Form.Item name={'email'} rules={[
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
                                }
                            ]}>
                                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                            </Form.Item>
                            <Flex justify="space-between" >
                                <Form.Item name={'remember'} valuePropName="checked">
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <div style={{ paddingTop: '5px' }}>
                                    <a href="">Forgot password</a>
                                </div>
                            </Flex>
                            <Form.Item>
                                <Button loading={isPending} type="primary" htmlType="submit" style={{ width: '100%' }} >Log in</Button>
                            </Form.Item>
                        </Form>

                    </Card>
                </Space >
            </Layout>
        </>
    )
}

export default Login