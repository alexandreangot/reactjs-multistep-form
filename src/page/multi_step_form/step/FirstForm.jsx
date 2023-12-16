import { InfoIcon } from "../../../component/icon/InfoIcon";
import * as yup from "yup";
import { useEffect, useRef } from "react";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";

export const FirstForm = ({ register, errors, setSchema }) => {
  const { t } = useTranslation();

  const schema = yup
    .object({
      name: yup
        .string()
        .required(t("multi_step_form.error.name.required"))
        .min(3, t("multi_step_form.error.name.min", { limit: 3 })),
      subDomain: yup
        .string()
        .required(t("multi_step_form.error.subDomain.required"))
        .min(3, t("multi_step_form.error.subDomain.min", { limit: 3 })),
      nbUsers: yup
        .number()
        .required(t("multi_step_form.error.nb_users.required"))
        .typeError(t("multi_step_form.error.nb_users.typeError"))
        .positive(t("multi_step_form.error.nb_users.positive")),
    })
    .required();

  // Create a mutable reference that persists between component renders.
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
        <label htmlFor={"name"}>{t("multi_step_form.field.name")}</label>
        <input id={"name"} name={"name"} type="text" {...register("name")} />
        <p className={"error-field"}>{errors?.name?.message}</p>
      </div>

      <div className={"field"}>
        <label htmlFor={"subDomain"}>
          <span>{t("multi_step_form.field.subDomain")}</span>
          <div data-tooltip-id="tooltip">
            <InfoIcon className={"h-5 w-5"} />
          </div>
          <Tooltip
            id={"tooltip"}
            place={"right"}
            type={"dark"}
            effect={"solid"}
          >
            <p>{t("multi_step_form.tooltip.subDomain.1")}</p>
            <p>{t("multi_step_form.tooltip.subDomain.2")}</p>
          </Tooltip>
        </label>
        <div className={"flex items-center space-x-2"}>
          <input
            id={"subDomain"}
            name={"subDomain"}
            type="text"
            {...register("subDomain")}
          />
          <p>.alexandre.com</p>
        </div>
        <p className={"error-field"}>{errors?.subDomain?.message}</p>
      </div>

      <div className={"field"}>
        <label htmlFor={"nbUsers"}>{t("multi_step_form.field.nb_users")}</label>
        <input
          id={"nbUsers"}
          name={"nbUsers"}
          type="number"
          min={0}
          {...register("nbUsers")}
        />
        <p className={"error-field"}>{errors?.nbUsers?.message}</p>
      </div>
    </>
  );
};
