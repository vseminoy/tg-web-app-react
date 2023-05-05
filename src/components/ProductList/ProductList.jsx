import React, {useCallback, useEffect, useState} from 'react';
import './ProductList.css'
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";

const products = [
    {id: 1, title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые'},
    {id: 2, title: 'Джинсы 2', price: 4500, description: 'Зеленого цвета, палацо'},
    {id: 3, title: 'Куртка', price: 12000, description: 'Синего цвета, теплая'},
    {id: 4, title: 'Куртка 2', price: 8300, description: 'Зеленого цвета, деимсезон'},
]

const getTotalPrice = (items=[]) => {
    return items.reduce((acc,item) => {
        return acc += item.price
    },0);
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg} = useTelegram();


    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems)
        };
        fetch('http://localhost:8080',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
    },[addedItems]);

    useEffect( () => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        }
    },[onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        }else {
            newItems.push(product);
        }

        setAddedItems(newItems);

        if(newItems.length === 0){
            tg.MainButton.hide();
        }else{
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            });
        }
    }

    return (
        <div className={'list'}>
            {products.map( item => (
                <ProductItem product={item} onAdd={onAdd} className={'item'}/>
            ))}
        </div>
    );
};

export default ProductList;