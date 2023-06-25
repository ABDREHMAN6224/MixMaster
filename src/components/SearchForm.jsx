import React from 'react'
import Wrapper from "../assets/wrappers/SearchForm";
import { Form,useNavigation } from 'react-router-dom';

const SearchForm = ({searchTerm}) => {
  const navigation=useNavigation()
  const isSubmitting=navigation.state==='submitting'
  const getLastItem=()=>{
    return localStorage.getItem("term")||""
  }
  const saveSearchTerm=(term)=>{
    localStorage.setItem("term",term)
  }
  return (
    
    <Wrapper>
      <Form className='form'>
        <input type="search" name="search" id="search" className='form-input' defaultValue={getLastItem()}/>
    <button type="submit" className='btn' disabled={isSubmitting} onClick={()=>saveSearchTerm(searchTerm)}>{isSubmitting?"searching...":"search"}</button>
      </Form>
    </Wrapper>
  )
}

export default SearchForm