import React, { useState } from 'react';
import styles from "../login/login.module.css";
import { Link } from 'react-router-dom';
import { PasswordInput, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import {logInUser} from "../../services/user/actions";
import {useDispatch} from "react-redux";
const Login = () => {
    const dispatch = useDispatch()
    const [formData, setValue] = useState({
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        e.preventDefault()
        setValue({ ...formData, [e.target.name]: e.target.value });
    }
    const onSubmit = (e) => {
        e.preventDefault()
        let sendData = true
        for (let key in formData) {
            if (formData[key] === '') {
                sendData = false
                break
            }
        }
        if (sendData) {
            dispatch(logInUser(formData))
        }
    }

    return (
        <form className={`${styles.form} pl-5 pr-5`} onSubmit={ onSubmit }>
            <h1 className={`text text_type_main-medium mb-6 ${styles.text_center}`}>Вход</h1>
            <EmailInput
                type="email"
                placeholder="E-mail"
                value={ formData.email }
                name="email"
                extraClass="mb-6"
                required
                onChange={ handleChange }
                errorText={'Введите корректный e-mail'}
            />
            <PasswordInput
                onChange={ handleChange }
                value={ formData.password }
                name={'password'}
                extraClass="mb-6"
                error={false}
            />
            <Button htmlType="submit" extraClass="mb-10" type="primary" size="medium">
                Вход
            </Button>
            <div className="mt-10 mb-4 text text_type_main-default text_color_inactive">
                Вы&nbsp;— новый пользователь? {' '}
                <Link className={styles.link} to={'/register'}>
                    Зарегистрироваться
                </Link>
            </div>
            <div className="text text_type_main-default text_color_inactive">
                Забыли пароль? {' '}
                <Link className={styles.link} to={'/forgot-password'}>
                    Восстановить пароль
                </Link>
            </div>
        </form>
    )
}
export default Login;