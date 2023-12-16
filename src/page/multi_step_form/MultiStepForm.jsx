import { useState } from "react";
import { useMultiStepForm } from "../../service/form/useMultiStepForm";
import { FirstForm } from "./step/FirstForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SecondForm } from "./step/SecondForm";
import { ThirdForm } from "./step/ThirdForm";
import { NavigationState } from "./navigation/NavigationState";
import { useTranslation } from "react-i18next";

const INITIAL_DATA = {
  name: "",
  subDomain: "",
  nbUsers: 0,
  billingMail: "",
  billingAddress: "",
  username: "",
  password: "",
};

export const MultiStepForm = () => {
  const { t } = useTranslation();
  const [defaultData] = useState(INITIAL_DATA);
  const [schema, setSchema] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: defaultData,
  });

  const { step, next, prev, isLastStep, currentStepIndex } = useMultiStepForm([
    <FirstForm
      key={0}
      register={register}
      errors={errors}
      setSchema={setSchema}
    />,
    <SecondForm
      key={1}
      register={register}
      errors={errors}
      setSchema={setSchema}
    />,
    <ThirdForm
      key={2}
      register={register}
      errors={errors}
      setSchema={setSchema}
    />,
  ]);

  const onSubmit = (fields) => {
    next();
    if (isLastStep) alert(JSON.stringify(fields, null, 2));
  };

  const navigation = [
    { title: t("multi_step_form.navigation.personal_info") },
    { title: t("multi_step_form.navigation.billing_info") },
    { title: t("multi_step_form.navigation.account_info") },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <NavigationState steps={navigation} currentStepIndex={currentStepIndex} />

      <h2>{t("multi_step_form.title")}</h2>

      {step}

      <div className={"flex justify-center space-x-5 pt-5"}>
        {currentStepIndex !== 0 && (
          <button type={"button"} onClick={prev}>
            {t("previous")}
          </button>
        )}
        <button className={"button-blue"}>
          {isLastStep ? t("finish") : t("next")}
        </button>
      </div>
    </form>
  );
};
