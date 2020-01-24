import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';



const UserForm = ({ errors, touched, values, status }) => {
    const [user, setUser] = useState([])
   
    useEffect(() => {
        status && 
        setUser(users => [
            ...users, 
            status
        ])
    }, [status])
    
    return (
        <div className="formWrapper">
            <Form className="userForm">

                <h1>User Login</h1> 

                <label className="userlabel" htmlFor="name">Name: </label>
                <Field type="text" name="name" placeholder="Name" value={values.name} />
                <div className="errors">{touched.name && errors.name && (<p>{errors.name}</p>)}</div>

                <Field type="text" name="email" placeholder="Email" value={values.email} />
                {errors.email && touched.email && <div>{errors.email}</div>}

                <Field type="text" name="password" placeholder="Password"  value={values.password}/>

                <div className="roleWrapper">
                <label className="roleDropdown" htmlFor="select" ><p>Role: </p></label>
                <Field as="select" name="role" placeholder="Select a Role">
                    <option disabled value = "">Choose A Role</option>
                    <option value="developer">Developer</option>
                    <option value="design">Designer</option>
                    <option value="network">Network Engineer</option>
                    <option value="devop">DevOps</option>
                    <option value="security">Security</option>
                 </Field>
                 </div>
                 
                <div className="boxWrapper">
                <label className="termsBox" htmlFor="checkbox" ><p>Agree to Terms of Service:</p></label>
                <Field type="checkbox" name="terms" />
                </div>

                <button type="submit">Submit</button>
            </Form>
            {user.map(user => (
                    <ul>
                        <li>Name: {user.name}, {user.role}</li>
                    </ul>
                ))
            }
        </div>
    )
}
const FormikUserForm = withFormik({
    mapPropsToValues({ user }) {
        return {
            name: "", 
            email: "",
            password: "",
            terms: false,

        };
    }, 
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name Required'),
        email: Yup.string().required('Please enter a valid email address'),
        role: Yup.string().required('Please Select a Role'),
        password: Yup.string().min(8).required('Password Min. 8 characters'),
        terms: Yup.bool('true').required('Must Agree to Terms')

    }),

    handleSubmit(values, { setStatus, resetForm }) {
        console.log('submitting form:', values);
        axios.post
        ("https://reqres.in/api/users", values)

        .then( res => {
            console.log('Success:', res);
            setStatus(res.data);
            resetForm();
        })
        .catch(err => {
            console.log('Error:', err.response);
        });
    }

})(UserForm);


export default FormikUserForm;
