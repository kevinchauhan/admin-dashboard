import { useState, useEffect } from "react";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store";
import { Avatar, Badge, Dropdown, Flex, Layout, Menu, MenuProps, Space, theme } from "antd";
import Icon, { BellFilled, HomeOutlined } from "@ant-design/icons";
import { Restaurant } from "../components/icons/Restaurant";
import { UserIcon } from "../components/icons/User";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../http/api";
import { BagIcon } from "../components/icons/BagIcon";

const { Header, Sider, Content } = Layout

const getMenuItems = (role: string) => {
    const baseItems = [
        {
            key: '/',
            icon: <HomeOutlined />,
            label: <NavLink to='/'>Home</NavLink>,
        },
        {
            key: '/restaurants',
            icon: <Icon component={Restaurant} />,
            label: <NavLink to='/restaurants'>Restaurants</NavLink>,
        },
        {
            key: '/products',
            icon: <Icon component={BagIcon} />,
            label: <NavLink to='/products'>Products</NavLink>,
        }
    ]

    if (role === 'admin') {
        const menus = [...baseItems]
        menus.splice(1, 0, {
            key: '/users',
            icon: <Icon component={UserIcon} />,
            label: <NavLink to='/users'>Users</NavLink>,
        })
        return menus
        return [...baseItems, {
            key: '/users',
            icon: <Icon component={UserIcon} />,
            label: <NavLink to='/users'>Users</NavLink>,
        },]
    }
    return baseItems;
}

const Dashboard = () => {
    const { user, logoutUser } = useAuthStore();
    const [isUserLoaded, setIsUserLoaded] = useState(false); // Track user loading state
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, },
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

    const items: MenuProps['items'] = getMenuItems(user?.role as string);

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
                            <Badge text={user.role === 'admin' ? 'Global' : user.tenant?.name} status="success" />
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
                        <Outlet />
                    </Content>
                </Layout>
            </Layout >
        </>
    )
}

export default Dashboard