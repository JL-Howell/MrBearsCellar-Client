// import React, {Component} from 'react';
// import { Button, TextField } from "@material-ui/core";
// import {Formik, Form} from 'formik';

// interface Values {
//     username: string,
//     email: string,
//     password: string,
// }

// interface Props {
//     onSubmit: (values: Values) => void
// }

// export const MyForm: React.FC<Props> = ({onSubmit}) => {
//     return (
//         <Formik initialValues={{username: '', email: '', password: ''}} onSubmit={(values) => {
//             onSubmit(values)
//         }}>
//             {({values, handleChange, handleBlur}) => (
//                 <Form>
//                     <div>
//                     <TextField 
//                     placeholder="username" 
//                     value={values.username} 
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     /></div>
//                     <div>
//                     <TextField 
//                     placeholder="email" 
//                     value={values.email} 
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     /></div>
//                     <div>
//                     <TextField 
//                     placeholder="password" 
//                     value={values.password} 
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     /></div>
//                     <Button type="submit">submit</Button>
//                 </Form>
//             )}
//         </Formik>

//     )
        
// }