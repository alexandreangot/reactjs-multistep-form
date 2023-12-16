import * as yup from "yup";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export const ThirdForm = ({ register, errors, setSchema }) => {
  const { t } = useTranslation();

  const schema = yup
    .object({
      username: yup
        .string()
        .required(t("multi_step_form.error.username.required"))
        .min(3, t("multi_step_form.error.username.min", { limit: 3 })),
      password: yup
        .string()
        .required(t("multi_step_form.error.password.required"))
        .min(8, t("multi_step_form.error.password.min", { limit: 8 }))
        .matches(/(?=.*[A-Z])/, t("multi_step_form.error.password.uppercase"))
        .matches(/(?=.*[a-z])/, t("multi_step_form.error.password.lowercase"))
        .matches(/(?=.*[0-9])/, t("multi_step_form.error.password.number"))
        .matches(
          /(?=.*[!@#$%^&*\-_])/,
          t("multi_step_form.error.password.special"),
        ),
    })
    .required();

  const setSchemaCallback = useRef((prevSchema) => {
    if (prevSchema !== schema) {
      setSchema(schema);
    }
  });

  useEffect(() => {
    setSchemaCallback.current(schema);
  }, [schema]);

  return (
    <>
      <div className="field">
        <label htmlFor={"username"}>
          {t("multi_step_form.field.username")}
        </label>
        <input
          id={"username"}
          name={"username"}
          type="text"
          {...register("username")}
        />
        <p className={"error-field"}>{errors?.username?.message}</p>
      </div>

      <div className="field">
        <label htmlFor={"password"}>
          {t("multi_step_form.field.password")}
        </label>
        <input
          id={"password"}
          name={"password"}
          type="password"
          {...register("password")}
        />
        <p className={"error-field"}>{errors?.password?.message}</p>
      </div>
    </>
  );
};
