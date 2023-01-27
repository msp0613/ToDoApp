import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const validate = Yup.object({
        firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 charaters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('Confirm password is required'),
    })
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={validate}
            onSubmit={data => {
                console.log(data)

                let formData = new FormData();
                formData.append('firstName', data.firstName)
                formData.append('lastName', data.lastName)
                formData.append('email', data.email)
                formData.append('password', data.password)

                axios({
                    method: 'post',
                    url: 'http://localhost/php-react/signup.php/',
                    data: formData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                    .then(function (response) {
                        alert('New User Successfully Added.');
                        setTimeout(() => {
                            navigate('/signin')
                        }, 500)
                    })
                    .catch(function (response) {
                        //handle error
                        console.log(response)
                    });

            }}>

            {formik => (
                <div className="container">
                    <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
                    <Form>
                        <TextField label="First Name" name="firstName" type="text" />
                        <TextField label="last Name" name="lastName" type="text" />
                        <TextField label="Email" name="email" type="email" />
                        <TextField label="Password" name="password" type="password" />
                        <TextField label="Confirm Password" name="confirmPassword" type="password" />
                        <button className="btn btn-primary mt-3" type="submit" style={{marginRight: 20}}>Register</button>
                        <button className="btn btn-warning mt-3 ml-3" type="reset">Zresetuj</button>
                    </Form>
                </div>
            )}
        </Formik>
    )
}

export default Signup;