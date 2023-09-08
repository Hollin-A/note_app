import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { TextInput } from "../components/FormikElements";

import notesImage from "../assets/notes.png";

const Signin = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-light">
      <div className="w-full max-w-xs">
        <div className="mb-3 flex w-full items-center justify-center rounded-lg bg-white p-5 gap-3">
          <img
            src={notesImage}
            alt="notes image"
            className="aspect-square h-10"
          />
          <h1 className="mb-1 text-center text-4xl font-black uppercase text-dark">
            notes app
          </h1>
        </div>
        <div className="w-full rounded-lg border-b-2 border-dark bg-white p-5">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              // signIn(values.email, values.password);
              setSubmitting(false);
            }}
          >
            <Form className="flex w-full flex-col">
              <TextInput
                name="email"
                label="Email"
                type="email"
                placeholder="johndoe@gmail.com"
              />

              <TextInput
                name="password"
                label="Password"
                type="password"
                placeholder="***********"
              />

              <button
                type="submit"
                className="bg-dark mt-3 flex items-center justify-center rounded-lg px-4 py-2"
              >
                <p className="font-bold uppercase text-white">sign in</p>
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signin;
