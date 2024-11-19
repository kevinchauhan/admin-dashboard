import { PlusOutlined, RightOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from "antd"
import { Navigate, NavLink } from "react-router-dom"
import { getUsers } from "../../http/api"
import { User } from "../../types"
import { useAuthStore } from "../../store"
import UserFilter from "./UserFilter"
import { useState } from "react"
import UserForm from "./forms/UserForm"

const columns = [
    {
        title: 'Name',
        dataIndex: 'firstName',
        key: 'firstName',
        render: (_text: string, record: User) => (<div>
            {record.firstName} {record.lastName}
        </div>),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },
]

const Users = () => {
    const { user } = useAuthStore()
    const [drawerOpen, setDrawerOpen] = useState(true)
    const {
        token: { colorBgLayout, },
    } = theme.useToken();

    const { data: users, isLoading, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers().then(res => res.data.data),
        retry: 1
    })

    if (user?.role !== 'admin') {
        return <Navigate to={'/'} replace={true} />
    }

    return (
        <>
            <Breadcrumb style={{ marginBottom: '15px' }} separator={<RightOutlined />} items={[
                {
                    title: <NavLink to='/'>Dashboard</NavLink>,
                },
                {
                    title: 'User',
                },
            ]} />
            {isLoading && <div>Loading...</div>}
            {isError && <div>{error.message}</div >}
            <UserFilter onFilerChange={(filterName, filterValue) => { console.log(filterName, filterValue) }} >
                <Button onClick={() => setDrawerOpen(true)} type="primary" icon={<PlusOutlined />} >
                    Add User
                </Button>
                <Drawer styles={{ body: { background: colorBgLayout } }} open={drawerOpen} title='Create user' width={720} destroyOnClose={true} onClose={() => setDrawerOpen(false)}
                    extra={
                        <Space>
                            <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
                            <Button type="primary">Submit</Button>
                        </Space>
                    }
                >
                    <Form layout="vertical">
                        <UserForm />
                    </Form>
                </Drawer>
            </UserFilter>
            <Table pagination={false} style={{ marginTop: '15px' }} columns={columns} dataSource={users} rowKey={'id'} />

        </>
    )
}

export default Users