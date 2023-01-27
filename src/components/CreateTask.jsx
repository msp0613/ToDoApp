import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import axios from "axios";
import {TextField} from "./TextField";

const CreateTask = () => {
    const navigate = useNavigate();

    const validate = Yup.object({
        title: Yup.string()
            .min(5, 'Must be 5 characters or more')
            .required('Required'),
        description: Yup.string()
            .min(5, 'Must be 5 characters or more')
            .required('Required'),
    })
    return (
        <Formik
            initialValues={{
                title: '',
                description: '',
            }}
            validationSchema={validate}
            onSubmit={data => {
                let formData = new FormData();
                formData.append('title', data.title)
                formData.append('description', data.description)
                formData.append('user_id', localStorage.getItem('user_id'))

                axios({
                    method: 'post',
                    url: 'http://localhost/php-react/create.php/',
                    data: formData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                    .then(function (response) {
                        alert('New Task Successfully Added.');
                        setTimeout(() => {
                            navigate('/')
                        }, 500)
                    })
                    .catch(function (response) {
                        //handle error
                        console.log(response)
                    });

            }}>

            {formik => (
                <div className="container">
                    <h1 className="my-4 font-weight-bold .display-4">Stwórz zadanie</h1>
                    <Form>
                        <TextField label="Title" name="title" type="text" />
                        <TextField label="Description" name="description" type="text" />
                        <button className="btn btn-primary mt-3" type="submit" style={{marginRight: 20}}>Create task</button>
                        <button className="btn btn-warning mt-3 ml-3" type="reset">Zresetuj</button>
                    </Form>
                </div>
            )}
        </Formik>
    )
}

export default CreateTask;