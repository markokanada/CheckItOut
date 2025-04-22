import i18next from "i18next"; // 🔹 Ezt használd hook helyett
import { validateProps } from "../../common/types";

export default function validate(values: validateProps) {
  let errors = {} as validateProps;

  if (!values.name) {
    errors.name = i18next.t("Name Error");
  }
  if (!values.email) {
    errors.email = i18next.t("Email Error1");
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = i18next.t("Email Error2");
  }
  if (!values.message) {
    errors.message = i18next.t("Message Error");
  }

  return errors;
}