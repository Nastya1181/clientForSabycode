import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth (props) {
    return props.required? props.children : <Navigate to="/authentication" replace/>;
}