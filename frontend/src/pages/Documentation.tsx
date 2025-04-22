import { makeObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { NavigateFunction } from "react-router-dom";
import { useTranslation } from "react-i18next"; // 🔹 HOOK IMPORTÁLÁSA
import ViewComponent from "../interfaces/ViewComponent";

export default class Documentation implements ViewComponent {
  constructor(public navigate: NavigateFunction) {
    makeObservable(this, {});
  }

  View = observer(() => {
    const { t } = useTranslation();

    return (
      <iframe
        src={t("Documentation Link")} 
        style={{
          width: "100%",
          height: "120vh",
          border: "none",
        }}
        allowFullScreen
      />
    );
  });
}