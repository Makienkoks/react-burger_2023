import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import styles from './protected-route.module.css';
import PropTypes from "prop-types";

const Protected = (props) => {
    const {onlyAuth, children} = props;
    const user = useSelector(store => store.user.user)
    const isAuthChecked = useSelector(store => store.user.isAuthChecked)
    const location = useLocation();

    if (!isAuthChecked && !user) {
        return (
            <div className={styles.block}>
                <div className={styles.loader}></div>
            </div>
            )
    } else if (onlyAuth && !user) {
        return <Navigate to={'/login'}></Navigate>
    } else if ((!onlyAuth && !user) || (onlyAuth && user)) {
        return children
    } else {
        const { from } = location.state || { from: { pathname: "/"}};
        return <Navigate to={from}/>
    }
}
Protected.defaultProps  = {
    onlyAuth: true
}
Protected.propTypes = {
    onlyAuth: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}
export default Protected