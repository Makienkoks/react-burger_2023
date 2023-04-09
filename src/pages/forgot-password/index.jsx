import React, {useEffect, useState} from 'react';
import styles from "../forgot-password/forgot-password.module.css";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import {forgotPassword} from "../../services/user/actions";
import {useDispatch, useSelector} from "react-redux";
import {sendUserFailed} from "../../services/user/reducer";
const ForgotPassword = () => {
    const dispatch = useDispatch()
    const [formData, setValue] = useState({
        email: ''
    });

    const navigate = useNavigate()
    const location = useLocation()

    const isLoading = useSelector( (store) => store.user.isLoading);
    const success = useSelector( (store) => store.user.success);

    const handleChange = (e) => {
        e.preventDefault()
        setValue({ ...formData, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (!isLoading && success) {
            localStorage.setItem('allowResetPassword', 'allow')
            navigate('/reset-password', {state: {from: location}})
            dispatch(sendUserFailed())
        }
    },[isLoading, success]);

    const onSubmit = (e) => {
        e.preventDefault()
        if (formData.email !== '') {
            dispatch(forgotPassword(formData))
        }
    }
    return (
        <form className={styles.form} onSubmit={ onSubmit }>
            <h1 className={`text text_type_main-medium mb-6 ${styles.text_center}`}>Восстановление пароля</h1>
            <EmailInput
                type="email"
                placeholder="Укажите e-mail"
                value={ formData.email }
                name="email"
                extraClass="mb-6"
                required
                onChange={ handleChange }
                errorText={'Введите корректный e-mail'}
            />
            <Button extraClass="mb-10" htmlType="submit" type="primary" size="medium" onClick={onSubmit}>
                Восстановить
            </Button>
            <div className="mt-10 mb-4 text text_type_main-default text_color_inactive">
                Вспомнили пароль? {' '}
                <Link className={styles.link} to={'/login'}>
                    Войти
                </Link>
            </div>
        </form>
    )
}
export default ForgotPassword;