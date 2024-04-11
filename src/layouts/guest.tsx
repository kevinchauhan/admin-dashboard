import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store"

const Guest = () => {
    const { user } = useAuthStore()
    if (user) {
        return <Navigate to={'/'} replace={true} />
    }
    return (
        <>
            <Outlet />
        </>
    )
}

export default Guest