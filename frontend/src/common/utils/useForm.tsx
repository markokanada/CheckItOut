import { useState } from "react";
import { notification } from "antd";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation(); // 🔥 Fontos!

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = formState.values;
    const errors = validate(values);
    setFormState((prev) => ({ ...prev, errors }));

    const url = "http://mailcatcher.vm1.test/"; // TODO: Replace later

    try {
      if (Object.values(errors).every((error) => error === "")) {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          notification["error"]({
            message: t("Notification Error Title"),
            description: t("Notification Error Description"),
          });
        } else {
          event.target.reset();
          setFormState(() => ({
            values: { ...initialValues },
            errors: { ...initialValues },
          }));

          notification["success"]({
            message: t("Notification Success Title"),
            description: t("Notification Success Description"),
          });
        }
      }
    } catch (error) {
      notification["error"]({
        message: t("Notification Error Title"),
        description: t("Notification Error Fallback"),
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
