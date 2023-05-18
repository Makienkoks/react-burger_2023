import React, { useEffect } from 'react';
import styles from "../register/register.module.css";
import { Link } from 'react-router-dom';
import { Input, PasswordInput, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import {registrationUser, setError} from "../../services/user/actions";
import {useDispatch, useSelector} from '../../services/hooks';
import { TUser } from "../../utils/types";
import useForm from "../../hooks/useForm";
import {RootState} from "../../services/store";

const Register = () => {
    const dispatch = useDispatch()

    const { values, handleChange } = useForm<TUser>();

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
            if (values[key as keyof TUser] === '') {
                sendData = false
                break
            }
        }
        if (sendData) {
            dispatch(registrationUser(values as TUser))
        }
    }

    return (
        <form className={styles.form} onSubmit={ handleSubmit }>
            <h1 className={`text text_type_main-medium mb-6 ${styles.text_center}`}>Регистрация</h1>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={ handleChange }
                value={ values.name || '' }
                name={'name'}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
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
                value={ values.password || '' }
                name={'password'}
                extraClass="mb-6"
            />
            <p className={`input__error`}>{error}</p>
            <Button htmlType="submit" extraClass="mb-10" type="primary" size="medium">
                Зарегистрироваться
            </Button>
            <div className="mt-10 mb-4 text text_type_main-default text_color_inactive">
                Уже зарегистрированы? {' '}
                <Link className={styles.link} to={'/login'}>
                    Войти
                </Link>
            </div>
        </form>
    )
}
export default Register;