import React, {useEffect, useMemo, useState} from 'react';
import styles from "../profile/profile.module.css";
import {PasswordInput, EmailInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/hooks';
import {getUser, setError} from "../../services/user/actions";
import {RootState} from "../../services/store";
import { TUser } from "../../utils/types";
import useForm from "../../hooks/useForm";

const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector((store: RootState) => store.user.user)
    const [isVisible, setIsVisible] = useState<boolean>(false)

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

    const initialState = useMemo(() => {
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

    const [currentData, setCurrentData] = useState<TUser>(initialState);

    useEffect(() => {
        let data:TUser = {
            name: values.name || values.name === '' ? values.name : currentData.name,
            email: values.email || values.email === '' ? values.email : currentData.email,
            password: values.password || values.password === '' ? values.password : currentData.password
        }
        setCurrentData(data)
    },[values, initialState])


    useEffect(() => {
        let sendData = true
        for (let key in values) {
            if (key !== 'password' && values[key as keyof TUser] === '') {
                sendData = false
                break
            }
        }
        setIsVisible(!sendData ? sendData : (currentData.name !== initialState.name ||
            currentData.email !== initialState.email ||
            currentData.password !== initialState.password))
    },[currentData, initialState])


    useEffect(() => {
        setCurrentData(initialState)
    },[user])

    const onCancel = () => {
        setCurrentData(initialState)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let data:TUser = {
            name: '',
            email: '',
            password: ''
        }
        if (values && 'password' in values && values.password) {
            dispatch(getUser(values))
        } else {
            data.name = values.name as string
            data.email = values.email as string
            dispatch(getUser(data))
        }
    }

    return (
            <form className={`${styles.form} ml-7`} onSubmit={handleSubmit}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={ handleChange }
                    value={ currentData.name }
                    name={'name'}
                    icon={"EditIcon"}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <EmailInput
                    placeholder="E-mail"
                    value={ currentData.email }
                    name="email"
                    extraClass="mb-6"
                    required
                    onChange={ handleChange }
                />
                <PasswordInput
                    onChange={ handleChange }
                    value={ currentData.password }
                    name={'password'}
                    icon={"EditIcon"}
                    extraClass="mb-6"
                />
                {isVisible &&
                    <>
                        <p className={`input__error`}>{error}</p>
                        <div className={styles.button_block}>
                            <Button extraClass="mr-3" htmlType="button" type="secondary" size="large" onClick={onCancel}>
                                Отмена
                            </Button>
                            <Button htmlType="submit" extraClass="mb-10 ml-3" type="primary" size="medium">
                                Сохранить
                            </Button>
                        </div>
                    </>
                }
            </form>
    )
}
export default Profile;