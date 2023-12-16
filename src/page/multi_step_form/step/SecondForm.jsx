import * as yup from "yup";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export const SecondForm = ({ register, errors, setSchema }) => {
  const { t } = useTranslation();

  const schema = yup
    .object({
      billingMail: yup
        .string()
        .required(t("multi_step_form.error.billing_mail.required"))
        .email(t("multi_step_form.error.billing_mail.email")),
      billingAddress: yup
        .string()
        .required(t("multi_step_form.error.billing_address.required"))
        .min(3, t("multi_step_form.error.billing_address.min", { limit: 3 })),
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
        <label htmlFor={"billingMail"}>
          {t("multi_step_form.field.billing_mail")}
        </label>
        <input
          id={"billingMail"}
          name={"billingMail"}
          type="email"
          {...register("billingMail")}
        />
        <p className={"error-field"}>{errors?.billingMail?.message}</p>
      </div>

      <div className="field">
        <label htmlFor={"billingAddress"}>
          {t("multi_step_form.field.billing_address")}
        </label>
        <input
          id={"billingAddress"}
          name={"billingAddress"}
          type="text"
          {...register("billingAddress")}
        />
        <p className={"error-field"}>{errors?.billingAddress?.message}</p>
      </div>
    </>
  );
};
