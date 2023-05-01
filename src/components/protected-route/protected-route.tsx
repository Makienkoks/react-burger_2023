import {Navigate, useLocation} from "react-router-dom";
import { ReactElement } from "react";
import {useSelector } from '../../services/hooks';
type TProtected = {
    onlyAuth?: boolean;
    children: ReactElement
}
const Protected = ({onlyAuth = true, children}: TProtected) => {
    const user = useSelector( (store) => store.user.user);
    const isAuthChecked = useSelector( (store) => store.user.isAuthChecked);
    const location = useLocation();

    if (!isAuthChecked) {
        return null
    }
    if (!onlyAuth && user) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }
    if (onlyAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children
}
export default Protected