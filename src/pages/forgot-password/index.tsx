import React, {useEffect, useState} from 'react';
import styles from "../forgot-password/forgot-password.module.css";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import {forgotPassword} from "../../services/user/actions";
import { useDispatch, useSelector } from '../../services/hooks';
import {sendUserFailed} from "../../services/user/reducer";
import {TForgotFormFields} from "../../utils/types";
import {RootState} from "../../services/store";
const ForgotPassword = () => {
    const dispatch = useDispatch()
    const [formData, setValue] = useState<TForgotFormFields>({
        email: ''
    });

    const navigate = useNavigate()
    const location = useLocation()

    const isLoading = useSelector( (store: RootState) => store.user.isLoading);
    const success = useSelector( (store: RootState) => store.user.success);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setValue({ ...formData, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (!isLoading && success) {
            localStorage.setItem('allowResetPassword', 'allow')
            navigate('/reset-password', {state: {from: location}})
            dispatch(sendUserFailed(null))
        }
    },[isLoading, success, dispatch, location, navigate]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formData.email !== '') {
            dispatch(forgotPassword(formData))
        }
    }
    return (
        <form className={styles.form} onSubmit={ onSubmit }>
            <h1 className={`text text_type_main-medium mb-6 ${styles.text_center}`}>Восстановление пароля</h1>
            <EmailInput
                placeholder="Укажите e-mail"
                value={ formData.email }
                name="email"
                extraClass="mb-6"
                required
                onChange={ handleChange }
            />
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