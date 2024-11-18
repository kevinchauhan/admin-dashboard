import { RightOutlined } from "@ant-design/icons"
import { Breadcrumb } from "antd"
import { NavLink } from "react-router-dom"

const Users = () => {
    return (
        <div>
            <Breadcrumb separator={<RightOutlined />} items={[
                {
                    title: <NavLink to='/'>Dashboard</NavLink>,
                },
                {
                    title: 'User',
                },
            ]} />
        </div>
    )
}

export default Users