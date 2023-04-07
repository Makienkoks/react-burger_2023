import React, { useState } from 'react';
import styles from "../forgot-password/forgot-password.module.css";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import {forgotPassword} from "../../services/user/actions";
import {useDispatch} from "react-redux";
const ForgotPassword = () => {
    const dispatch = useDispatch()
    const [formData, setValue] = useState({
        email: ''
    });

    const navigate = useNavigate()
    const location = useLocation()

    const handleChange = (e) => {
        e.preventDefault()
        setValue({ ...formData, [e.target.name]: e.target.value });
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (formData.email !== '') {
            dispatch(forgotPassword(formData))
            localStorage.setItem('allowResetPassword', 'allow')
            navigate('/reset-password', {state: {from: location}})
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