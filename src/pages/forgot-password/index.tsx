import React, {useEffect} from 'react';
import styles from "../forgot-password/forgot-password.module.css";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import {forgotPassword, SEND_USER_FAILED, setError} from "../../services/user/actions";
import { useDispatch, useSelector } from '../../services/hooks';
import {TForgotFormFields} from "../../utils/types";
import {RootState} from "../../services/store";
import useForm from "../../hooks/useForm";

const ForgotPassword = () => {
    const dispatch = useDispatch()

    const { values, handleChange } = useForm<TForgotFormFields>();

    const error = useSelector((store: RootState) => store.user.error)
    useEffect(() => {
        dispatch(setError(null))
    }, [dispatch, values])
    useEffect(() => {
        return () => {
            dispatch(setError(null))
        }
    }, [])

    const navigate = useNavigate()
    const location = useLocation()

    const isLoading = useSelector( (store: RootState) => store.user.isLoading);
    const success = useSelector( (store: RootState) => store.user.success);

    useEffect(() => {
        if (!isLoading && success) {
            localStorage.setItem('allowResetPassword', 'allow')
            navigate('/reset-password', {state: {from: location}})
            dispatch({ type: SEND_USER_FAILED })
        }
    },[isLoading, success, location, navigate]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (values.email !== '') {
            dispatch(forgotPassword(values as TForgotFormFields))
        }
    }
    return (
        <form className={styles.form} onSubmit={ handleSubmit }>
            <h1 className={`text text_type_main-medium mb-6 ${styles.text_center}`}>Восстановление пароля</h1>
            <EmailInput
                placeholder="Укажите e-mail"
                value={ values.email || '' }
                name="email"
                extraClass="mb-6"
                required
                onChange={ handleChange }
            />
            <p className={`input__error`}>{error}</p>
            <Button extraClass="mb-10" htmlType="submit" type="primary" size="medium">
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