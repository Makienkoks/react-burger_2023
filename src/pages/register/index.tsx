import React, { useState } from 'react';
import styles from "../register/register.module.css";
import { Link } from 'react-router-dom';
import { Input, PasswordInput, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import {registrationUser} from "../../services/user/actions";
import { useDispatch } from '../../services/hooks';
import {TUser} from "../../utils/types";
const Register = () => {
    const dispatch = useDispatch()
    const [formData, setValue] = useState<TUser>({
        name: '',
        email: '',
        password: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setValue({ ...formData, [e.target.name]: e.target.value });
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let sendData = true
        for (let key in formData) {
            if (formData[key as keyof TUser] === '') {
                sendData = false
                break
            }
        }
        if (sendData) {
            dispatch(registrationUser(formData))
        }
    }

    return (
        <form className={styles.form} onSubmit={ onSubmit }>
            <h1 className={`text text_type_main-medium mb-6 ${styles.text_center}`}>Регистрация</h1>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={ handleChange }
                value={formData.name}
                name={'name'}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <EmailInput
                placeholder="E-mail"
                value={ formData.email }
                name="email"
                extraClass="mb-6"
                required
                onChange={ handleChange }
            />
            <PasswordInput
                onChange={ handleChange }
                value={ formData.password }
                name={'password'}
                extraClass="mb-6"
            />
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