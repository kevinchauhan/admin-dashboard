import { SearchOutlined } from "@ant-design/icons"
import { Card, Col, Input, Row, Select } from "antd"
import { ReactNode } from "react"

type UserFilterProps = {
    children: ReactNode
    onFilerChange: (filterName: string, filterValue: string) => void
}

const UserFilter = ({ onFilerChange, children }: UserFilterProps) => {
    return (
        <Card>
            <Row gutter={16} justify={'space-between'}>
                <Col span={16}>
                    <Row gutter={16} >
                        <Col span={8}>
                            <Input allowClear={true} addonBefore={<SearchOutlined />} placeholder="search..." onChange={(e) => onFilerChange('searchQuery', e.target.value)} />
                        </Col>
                        <Col span={4}>
                            <Select onChange={(value) => onFilerChange('roleFilter', value)} placeholder='Role' style={{ width: '100%' }} allowClear={true}>
                                <Select.Option value="admin">Admin</Select.Option>
                                <Select.Option value="manager">Manager</Select.Option>
                                <Select.Option value="user">User</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    {children}
                </Col>
            </Row>
        </Card>
    )
}

export default UserFilter