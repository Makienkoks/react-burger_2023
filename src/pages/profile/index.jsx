import React, {useEffect, useMemo, useState} from 'react';
import styles from "../profile/profile.module.css";
import {PasswordInput, EmailInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import { getUser } from "../../services/user/actions";
const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector(store => store.user.user)
    const [isVisible, setIsVisible] = useState(false)
    const [formData, setValue] = useState({ name: '', email: '', password: '' })

    const currentData = useMemo(() => {
        let data = {}
        data['name'] = user.name ? user.name : ''
        data['email'] = user.email ? user.email : ''
        data['password'] = ''
        return data
    }, [user])

    useEffect(() => {
        setValue(currentData)
    },[currentData])

    useEffect(() => {
        let sendData = true
        for (let key in formData) {
            if (key !== 'password' && formData[key] === '') {
                sendData = false
                break
            }
        }

        setIsVisible(!sendData ? sendData : (formData.name !== currentData.name ||
            formData.email !== currentData.email ||
            formData.password !== currentData.password))
    },[formData, currentData])

    const handleChange = (e) => {
        e.preventDefault()
        setValue({ ...formData, [e.target.name]: (e.target.value).trim(' ') });
    }
    const onCancel = () => {
        setValue(currentData)
    }
    const onSubmit = () => {
        let data = {}
        if (formData.password.length) {
            data = formData
            dispatch(getUser(data))
        } else {
            data.name = formData.name
            data.email = formData.email
            dispatch(getUser(data))
        }
    }

    return (
            <form className={`${styles.form} ml-7`} onSubmit={onSubmit}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={ handleChange }
                    value={formData.name}
                    name={'name'}
                    icon={"EditIcon"}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <EmailInput
                    type="email"
                    placeholder="E-mail"
                    value={ formData.email }
                    name="email"
                    icon={"EditIcon"}
                    extraClass="mb-6"
                    required
                    onChange={ handleChange }
                    errorText={'Введите корректный e-mail'}
                />
                <PasswordInput
                    onChange={ handleChange }
                    value={ formData.password }
                    name={'password'}
                    icon={"EditIcon"}
                    extraClass="mb-6"
                    error={false}
                />
                {isVisible &&
                    <div className={styles.button_block}>
                        <Button extraClass="mr-3" htmlType="button" type="secondary" size="large" onClick={onCancel}>
                            Отмена
                        </Button>
                        <Button htmlType="submit" extraClass="mb-10 ml-3" type="primary" size="medium" onClick={ onSubmit }>
                            Сохранить
                        </Button>
                    </div>
                }
            </form>
    )
}
export default Profile;