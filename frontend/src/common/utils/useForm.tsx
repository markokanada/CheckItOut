import { useState } from "react";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import GlobalApiHandlerInstance from "../../api/GlobalApiHandlerInstance";

interface IValues {
  name: string;
  email: string;
  message: string;
}

const initialValues: IValues = {
  name: "",
  email: "",
  message: "",
};

export const useForm = (validate: (values: IValues) => IValues) => {
  const [formState, setFormState] = useState({
    values: { ...initialValues },
    errors: { ...initialValues },
  });

  const { t } = useTranslation();

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = formState.values;
    const errors = validate(values);
    setFormState((prev) => ({ ...prev, errors }));

    try {
      if (Object.values(errors).every((error) => error === "")) {
        const response = await GlobalApiHandlerInstance.post(
          "/contact",
          {
            name: values.name,
            email: values.email,
            description: values.message,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );

        if (response.status >= 200 && response.status < 300) {
          // Sikeres küldés
          event.target.reset();
          setFormState(() => ({
            values: { ...initialValues },
            errors: { ...initialValues },
          }));

          notification["success"]({
            message: t("Notification Success Title"),
            description: t("Notification Success Description"),
          });
        } else {
          // Hibás válasz
          notification["error"]({
            message: t("Notification Error Title"),
            description:
              response.data?.message || t("Notification Error Description"),
          });
        }
      }
    } catch (error: any) {
      notification["error"]({
        message: t("Notification Error Title"),
        description:
          error.response?.data?.message || t("Notification Error Fallback"),
      });
    }
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
      errors: {
        ...prev.errors,
        [name]: "",
      },
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values: formState.values,
    errors: formState.errors,
  };
};
