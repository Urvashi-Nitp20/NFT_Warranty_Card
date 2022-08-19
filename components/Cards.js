import React, { useState, useContext, useEffect } from 'react'
import Card from './Card'
import { AmazonContext } from '../context/AmazonContext'


function Cards() {

    const { assets } = useContext(AmazonContext);

    const items = [
        {
            id: 0,
            attributes: {
                name: "HandBag",
                price: 2,
                src: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFuZGJhZ3xlbnwwfHwwfHw%3D&w=1000&q=80" }
        },
        {
            id: 1,
            attributes: {
                name: "Laptop",
                price: 4,
                src:  'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8&w=1000&q=80' }
        },
        {
            id: 2,
            attributes: {
                name: "HeadPhone",
                price: 3,
                src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lfGVufDB8fDB8fA%3D%3D&w=1000&q=80"  }
        },
        {
            id: 3,
            attributes: {
                name: "Earphones",
                price: 1,
                src: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZWFycGhvbmVzfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            }
        },
        {
            id: 4,
            attributes: {
                name: "Pen",
                price: 1,
                src: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVufGVufDB8fDB8fA%3D%3D&w=1000&q=80"  }
        },
        {
            id: 5,
            attributes: {
                name: "SmartPhone",
                price: 2,
                src: "https://images.unsplash.com/photo-1524466302651-a98b8b02c497?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGhvbmUlMjBzY3JlZW58ZW58MHx8MHx8&w=1000&q=80"}
        }

    ]


    const styles = {
        container: `h-full w-full flex flex-col ml-[20px] `,
        title: `text-xl font-bold mb-[20px] mt-[30px]  ml-[30px]`,
        cards: `flex items-center  flex-wrap gap-[80px]`,
    }
    console.log(" cards", assets);

    return (
        <div className={styles.container}>
            <div className={styles.title} ><h1 style={{ fontSize: "30px" }}>  Market </h1></div>
            <div className={styles.cards}>
               {
                assets.length!==0 ?
                assets.map((item, index) => {
                    //console.log(index);
                   return  <Card key={item.id} item={item.attributes.attributes} productId={item.id} />
                }):
                <div>Hi</div>
               }
                
            

            </div>
        </div>
    )
}

export default Cards