import { useId } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import css from "./ContactForm.module.css";

const initialValues = {
  name: "",
  number: "",
};

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z]{1}/, "First symbol must be letter")
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(
      /[0-9]{3}-[0-9]{2}-[0-9]{2}/,
      "Number must be in format <123-45-67>"
    )
    .max(9, "Too Long!")
    .required("Required"),
});

const ContactForm = ({ onSubmit }) => {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, { resetForm }) => {
    try {
      onSubmit(values);

      iziToast.success({
        title: "Success",
        message: `${values.name} added in your contacts`,
      });

      resetForm();
    } catch (error) {
      iziToast.error({
        title: "Error",
        message: error.message,
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      <Form className={css.form}>
        <div className={css.formItem}>
          <label className={css.label} htmlFor={nameFieldId}>
            Name
          </label>
          <Field
            className={css.input}
            type="text"
            name="name"
            id={nameFieldId}
          />
          <ErrorMessage
            className={css.errorSpan}
            name="name"
            component="span"
          />
        </div>

        <div className={css.formItem}>
          <label className={css.label} htmlFor={numberFieldId}>
            Number
          </label>
          <Field
            className={css.input}
            type="tel"
            name="number"
            id={numberFieldId}
          />
          <ErrorMessage
            className={css.errorSpan}
            name="number"
            component="span"
          />
        </div>

        <button className={css.submitButton} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
