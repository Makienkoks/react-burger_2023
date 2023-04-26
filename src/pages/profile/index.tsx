import React, {useEffect, useMemo, useState} from 'react';
import styles from "../profile/profile.module.css";
import {PasswordInput, EmailInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/hooks';
import { getUser } from "../../services/user/actions";
import {RootState} from "../../services/store";
import { TUser } from "../../utils/types";
const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector((store: RootState) => store.user.user)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [formData, setValue] = useState<TUser>({ name: '', email: '', password: '' })

    const currentData = useMemo(() => {
        let data = {
            name: '',
            email: '',
            password: ''
        }
        data['name'] = user && user['name' as keyof TUser] ? user['name' as keyof TUser] : ''
        data['email'] = user && user['email' as keyof TUser] ? user['email' as keyof TUser] : ''
        data['password'] = ''
        return data
    }, [user])

    useEffect(() => {
        setValue(currentData)
    },[currentData])

    useEffect(() => {
        let sendData = true
        for (let key in formData) {
            if (key !== 'password' && formData[key as keyof TUser] === '') {
                sendData = false
                break
            }
        }

        setIsVisible(!sendData ? sendData : (formData.name !== currentData.name ||
            formData.email !== currentData.email ||
            formData.password !== currentData.password))
    },[formData, currentData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setValue({ ...formData, [e.target.name]: (e.target.value).trim() });
    }
    const onCancel = () => {
        setValue(currentData)
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let data = {
            name: '',
            email: '',
            password: ''
        }
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
                    icon={"EditIcon"}
                    extraClass="mb-6"
                />
                {isVisible &&
                    <div className={styles.button_block}>
                        <Button extraClass="mr-3" htmlType="button" type="secondary" size="large" onClick={onCancel}>
                            Отмена
                        </Button>
                        <Button htmlType="submit" extraClass="mb-10 ml-3" type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                }
            </form>
    )
}
export default Profile;