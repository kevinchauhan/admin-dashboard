import { useState, useEffect } from "react";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store";
import { Avatar, Badge, Dropdown, Flex, Layout, Menu, MenuProps, Space, theme } from "antd";
import Icon, { BellFilled, HomeOutlined } from "@ant-design/icons";
import { Restaurant } from "../components/icons/Restaurant";
import { UserIcon } from "../components/icons/User";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../http/api";
const { Header, Sider, Content } = Layout
const Dashboard = () => {
    const { user, logoutUser } = useAuthStore();
    const [isUserLoaded, setIsUserLoaded] = useState(false); // Track user loading state
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const location = useLocation();


    useEffect(() => {
        // Check if user is already available, otherwise set isUserLoaded to true after a brief delay
        if (user !== null) {
            setIsUserLoaded(true);
        } else {
            setTimeout(() => setIsUserLoaded(true), 100); // Adjust delay as needed
        }
    }, [user]); // Run effect when user changes

    const { mutate: logoutMutate, } = useMutation({
        mutationKey: ['logout'],
        mutationFn: logout,
        onSuccess: async () => {
            logoutUser()
            return
        }
    })

    if (!isUserLoaded) {
        return null; // Return nothing while waiting for user state
    }

    if (user === null) {
        return <Navigate to={'/auth/login'} replace={true} />
    }




    const items: MenuProps['items'] = [
        {
            key: '/',
            icon: <HomeOutlined />,
            label: <NavLink to='/'>Home</NavLink>,
        },
        {
            key: '/users',
            icon: <Icon component={UserIcon} />,
            label: <NavLink to='/users'>Users</NavLink>,
        },
        {
            key: '/restaurants',
            icon: <Icon component={Restaurant} />,
            label: <NavLink to='/restaurants'>Restaurants</NavLink>,
        },
        {
            key: '/products',
            icon: <Icon component={Restaurant} />,
            label: <NavLink to='/products'>Products</NavLink>,
        }
    ]

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical">
                        <h1 className="text-primary" style={{ textAlign: "center", padding: '10px 0 0' }}> BayRoute</h1>
                    </div>
                    <Menu style={{ marginTop: '50px', border: 'none' }} theme="light" defaultSelectedKeys={[location.pathname]} mode="inline" items={items} />
                </Sider>
                <Layout>
                    <Header style={{ padding: '0 16px 0', background: colorBgContainer }} >
                        <Flex gap='middle' align="start" justify="space-between">
                            <Badge text='Global' status="success" />
                            <Space size={16}>
                                <Badge dot={true} >
                                    <BellFilled />
                                </Badge>
                                <Dropdown menu={{ items: [{ key: 'logout', label: 'Logout', onClick: () => logoutMutate() }] }} placement="bottomRight">
                                    <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
                                </Dropdown>
                            </Space>
                        </Flex>
                    </Header>
                    <Content style={{ margin: '16px' }}>
                        <div
                            style={{
                                padding: 24,
                                minHeight: '100%',
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout >
        </>
    )
}

export default Dashboard