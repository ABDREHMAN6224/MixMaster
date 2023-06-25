import axios from 'axios';
import React from 'react'
import { Form,redirect,useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';

const url = "https://www.course-api.com/cocktails-newsletter";

export const action=async ({request})=>{
  const formData=await request.formData();
  const data=Object.fromEntries(formData);
  //return array of arrays
  // console.log([...formData.entries()]);
  try {
    const response=await axios.post(url,data);
    toast.success(response.data.msg)
    return redirect('/');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Newsletter = () => {
  const navigation=useNavigation()
  const isSubmitting=navigation.state==='submitting'
  return (
    <Form className="form" method='post'>
      <h4 style={{ textAlign: "center", marginBottom: "2rem" }}>
        our newletter
      </h4>
      <div className="form-row">
        <label htmlFor="name"  className="form-label">
          name
        </label>
        <input type="text" required className="form-input" name="name" id="name"  />
      </div>
      <div className="form-row">
        <label htmlFor="lastName" className="form-label">
          Last name
        </label>
        <input type="text" required className="form-input" name="lastName" id="lName"  />
      </div>
      <div className="form-row">
        <label htmlFor="email" className="form-label">
          email
        </label>
        <input type="email" required className="form-input" name="email" id="email" defaultValue="test@test.com" />
      </div>
      <button type="submit" style={{marginTop:"0.5rem",}} disabled={isSubmitting} className='btn btn block'>
        {isSubmitting?"submitting":'submit'}
      </button>
    </Form>
  );
}

export default Newsletter