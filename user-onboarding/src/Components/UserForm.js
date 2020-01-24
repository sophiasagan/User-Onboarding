import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';



const UserForm = ({ errors, touched, values, status }) => {
    return (
            <Form>
                <Field name="name" type="text" placeholder="Name" />
                <Field name="email" type="text" placeholder="Email" />
                <Field name="password" type="text" placeholder="Password" />
                <label><Field name="Terms" type="checkbox" /></label>

                <button type="submit">Submit</button>
            </Form>
    );
}

const FormikUserForm = withFormik({

})(UserForm);

export default FormikUserForm;