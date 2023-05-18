import React, {useEffect} from 'react';
import styles from "../login/login.module.css";
import { Link } from 'react-router-dom';
import { PasswordInput, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import {logInUser, setError} from "../../services/user/actions";
import {useDispatch, useSelector} from '../../services/hooks';
import {TFormFields} from "../../utils/types";
import useForm from "../../hooks/useForm";
import {RootState} from "../../services/store";

const Login = () => {
    const dispatch = useDispatch()
    const { values, handleChange } = useForm<TFormFields>();

    const error = useSelector((store: RootState) => store.user.error)
    useEffect(() => {
        dispatch(setError(null))
    }, [dispatch, values])
    useEffect(() => {
        return () => {
            dispatch(setError(null))
        }
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let sendData = true
        for (let key in values) {
            if (values[key as keyof TFormFields] === '') {
                sendData = false
                break
            }
        }
        if (sendData) {
            dispatch(logInUser(values as TFormFields))
        }
    }

    return (
        <form className={`${styles.form} pl-5 pr-5`} onSubmit={ handleSubmit }>
            <h1 className={`text text_type_main-medium mb-6 ${styles.text_center}`}>Вход</h1>
            <EmailInput
                placeholder="E-mail"
                value={ values.email || '' }
                name="email"
                extraClass="mb-6"
                required
                onChange={ handleChange }
            />
            <PasswordInput
                onChange={ handleChange }
                value={ values.password  || ''}
                name={'password'}
                extraClass="mb-6"
            />
            <p className={`input__error`}>{error}</p>
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