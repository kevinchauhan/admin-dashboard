import { RightOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { Breadcrumb, Table } from "antd"
import { Navigate, NavLink } from "react-router-dom"
import { getUsers } from "../../http/api"
import { User } from "../../types"
import { useAuthStore } from "../../store"

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
            <Breadcrumb separator={<RightOutlined />} items={[
                {
                    title: <NavLink to='/'>Dashboard</NavLink>,
                },
                {
                    title: 'User',
                },
            ]} />
            {isLoading && <div>Loading...</div>}
            {isError && <div>{error.message}</div >}
            <Table style={{ marginTop: '15px' }} columns={columns} dataSource={users} />
        </>
    )
}

export default Users