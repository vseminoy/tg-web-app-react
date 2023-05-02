import React, {useEffect, useState} from 'react';
import './Form.css'
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    const onChangeCountry = (e) => {
        setCountry(e.targer.value);
    }

    const onChangeStreet = (e) => {
        setStreet(e.targer.value);
    }

    const onChangeSubject = (e) => {
        setSubject(e.targer.value);
    }

    useEffect( () => {
        tg.MainButton.setParams({
            text:'Отправить данные'
        });
    },[])

    useEffect( () => {
        if(!country || !street)
            tg.MainButton.hide();
        else
            tg.MainButton.show();
    },[country,street])

    return (
        <div class={'form'}>
            <h3>Введите ваши данные</h3>
            <input className={'input'} type="text" placeholder={'Страна'} value={country} onClick={onChangeCountry} />
            <input className={'input'} type="text" placeholder={'Улица'} value={street} onClick={onChangeStreet} />
            <select value={subject} onChange={onChangeSubject} className={'select'} >
                <option value={'physical'}>Физ.лицо</option>
                <option value={'legal'}>Юр.лицо</option>
            </select>
        </div>
    );
};

export default Form;