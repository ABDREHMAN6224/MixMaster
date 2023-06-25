import React from 'react'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios'
import SearchForm from '../components/SearchForm'
import CocktailList from '../components/CocktailList'
import { useQuery } from '@tanstack/react-query'
const url="https://www.thecocktaildb.com/api/json/v1/1/search.php?s="

const searchCocktails=(search)=>{
  return{
    queryKey:['search',search||'all'],
    queryFn:async ()=>{
      const result=await axios.get(`${url}${search}`)
      return result.data.drinks;
      
    }
  }
}
export const loader =
(queryClient) =>
async ({ request }) => {
  const urll = new URL(request.url);
  const searchTerm = urll.searchParams.get("search") || "";
  await queryClient.ensureQueryData(searchCocktails(searchTerm))
  return { searchTerm };
};


const Landing = () => {
  const {searchTerm}=useLoaderData()
  const {data:drinks}=useQuery(searchCocktails(searchTerm))
  return (
    <>
      <SearchForm searchTerm={searchTerm}/>
      <CocktailList drinks={drinks}/>
    </>
  )
}

export default Landing