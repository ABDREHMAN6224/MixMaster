import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { useLoaderData,Link,Navigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/CocktailPage';


const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
const singleCocktailQuery=(id)=>{
  return{
    queryKey:['find',id],
    queryFn:async ()=>{
      const response=await axios.get(`${url}${id}`)
      return response.data.drinks;

    }
  }
}
export const loader=(queryClient)=>async ({params})=>{
  const {id}=params
  await queryClient.ensureQueryData(singleCocktailQuery(id))
    return {id};
}
const Cocktail = () => {
  
  const {id}=useLoaderData()
  const {data:drink}=useQuery(singleCocktailQuery(id))
  if(!drink){
    return <Navigate to="/"/>

  }
  const singleDrink=drink[0]
  const {strDrink:name,strDrinkThumb:image,strAlcoholic:info,strCategory:category,strInstructions:instructions,strGlass:glass}=singleDrink
  const ingredients=Object.keys(singleDrink).filter(
    key=>{
      return key.startsWith('strIngredient') && singleDrink[key]!==null
    }
  ).map(key=>singleDrink[key])

  return (
    <Wrapper>
      <header>
        <Link to={`/`} className="btn">
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>ingredients :</span>
            {ingredients.map((i,index)=>{
              return <span className='ing' key={i}>{`${i}${index===ingredients.length-1?".":", "}`}</span>
            })}
          </p>
          <p>
            <span className="drink-data">instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
}

export default Cocktail