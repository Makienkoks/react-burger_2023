import React, { useEffect } from 'react';
import styles from "../reset-password/reset-password.module.css";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {resetPassword, setError} from "../../services/user/actions";
import { useDispatch, useSelector } from '../../services/hooks';
import { TResetFormFields } from "../../utils/types";
import {RootState} from "../../services/store";
import useForm from "../../hooks/useForm";

const ResetPassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const allowResetPassword = localStorage.getItem('allowResetPassword') === 'allow'
    const dispatch = useDispatch()
    const { from } = location.state || { from: { pathname: "/"}}
    
    const { values, handleChange } = useForm<TResetFormFields>();

    const error = useSelector((store: RootState) => store.user.error)
    useEffect(() => {
        dispatch(setError(null))
    }, [dispatch, values])
    useEffect(() => {
        return () => {
            dispatch(setError(null))
        }
    }, [])

    const isLoading = useSelector( (store: RootState) => store.user.isLoading);
    const success = useSelector( (store: RootState) => store.user.success);

    useEffect(() => {
        if (!isLoading && success && !allowResetPassword) {
            navigate('/')
        }
    },[isLoading, success, allowResetPassword]);

    useEffect(() => {
        if (!allowResetPassword) {
            navigate(from)
        }
        return () => {
            localStorage.removeItem('allowResetPassword')
        }
    },[]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let sendData = true
        for (let key in values) {
            if (values[key as keyof TResetFormFields] === '') {
                sendData = false
                break
            }
        }
        if (sendData) {
            dispatch(resetPassword(values))
            localStorage.removeItem('allowResetPassword')
        }
    }

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <h1 className={`text text_type_main-medium mb-6 ${styles.text_center}`}>Восстановление пароля</h1>
            <PasswordInput
                onChange={ handleChange }
                placeholder={'Введите новый пароль'}
                value={ values.password || '' }
                name={'password'}
                extraClass="mb-6"
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={ handleChange }
                value={ values.token || '' }
                name={'token'}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <p className={`input__error`}>{error}</p>
            <Button extraClass="mb-10" htmlType="submit" type="primary" size="medium">
                Сохранить
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
export default ResetPassword;