import { useState } from "react";
import { Row, Col, Drawer, Modal } from "antd";
import { withTranslation, TFunction } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
  BottomSection,
  DrawerContent,
  TopSection,
} from "./styles";
import { LanguageSwitchContainer, LanguageSwitch } from "../Footer/styles";
import i18n from "../../translation";
import GlobalEntities from "../../store/GlobalEntities";

const navLinks = [
  { id: "why-us", label: "nav1" },
  { id: "features", label: "nav2" },
  { id: "usage", label: "nav3" },
  { id: "content", label: "nav4" },
];

const appLinks = [
  { path: "/app/newTask", label: "New Task Title", color: "#2D6CDF" },
  { path: "/app/profile", label: "Profile Title", color: "#2D6CDF" },
];

const authLinks = [
  { path: "/register", label: "Get Started", color: "#FF824B" },
  { path: "/login", label: "Sign In", color: "#2D6CDF" },
];

const Header = ({ t }: { t: TFunction }) => {
  const [visible, setVisibility] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  const isInTheApp = location.pathname.startsWith("/app/");
  const isUserLinksRequired = !isInTheApp && ["/", "/how-to-use", "/login", "/register"].includes(location.pathname);
  const isAdminPanelNeeded = isInTheApp && GlobalEntities.user.role === "admin"
  const toggleButton = () => setVisibility(!visible);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setVisibility(false);
  };

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  const handleLogoutClick = () => {
    setIsModalVisible(true);
  };

  const handleConfirmLogout = () => {
    GlobalEntities.logout();
    setIsModalVisible(false);
    navigate("/");
    setVisibility(false);
  };

  const handleCancelLogout = () => {
    setIsModalVisible(false);
  };

  const renderLanguageSwitch = () => (
    <LanguageSwitchContainer>
      {["en", "hu"].map((lang) => (
        <LanguageSwitch key={lang} onClick={() => handleChangeLanguage(lang)}>
          <SvgIcon src={`${lang}.svg`} aria-label={lang} width="30px" height="30px" />
        </LanguageSwitch>
      ))}
    </LanguageSwitchContainer>
  );

  const renderNavLinks = () => (
    <>
      {isHome && navLinks.map(({ id, label }) => (
        <CustomNavLinkSmall key={id} onClick={() => scrollTo(id)}>
          <Span>{t(label)}</Span>
        </CustomNavLinkSmall>
      ))}
    </>
  );

  const renderAuthLinks = () => (
    <>
      {authLinks.map(({ path, label, color }) => (
        <CustomNavLinkSmall key={path} onClick={() => {navigate(path);    setVisibility(false);
                }        }>
          <Span style={{ color }}>{t(label)}</Span>
        </CustomNavLinkSmall>
      ))}
    </>
  );

  const renderAppNavigationLinks = () => (
    <>
      {appLinks.map(({ path, label, color }) => (
        <CustomNavLinkSmall key={path} onClick={() => {navigate(path);    setVisibility(false);
                }        }>
          <Span style={{ color }}>{t(label)}</Span>
        </CustomNavLinkSmall>
      ))}
      {isAdminPanelNeeded && (
        <CustomNavLinkSmall key="/app/admin/users" onClick={() => {navigate("/app/admin/users");    setVisibility(false);
        }        }>
  <Span style={{ color:"#FF824B" }}>{t("usermanagement")}</Span>
</CustomNavLinkSmall>
      )}
    </>
  );

  const renderLogoutButton = () => (
    <CustomNavLinkSmall onClick={handleLogoutClick}>
      <Span style={{ color: "#FF824B" }}>{t("Log out Title")}</Span>
    </CustomNavLinkSmall>
  );

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          <LogoContainer to={isInTheApp ? "/app/home" : "/"} aria-label="homepage">
            <SvgIcon src="logo.png" width="auto" height="64px" />
          </LogoContainer>

          <NotHidden>
            {renderNavLinks()}
            {isUserLinksRequired && renderAuthLinks()}
            {isInTheApp && (
              <>
                {renderAppNavigationLinks()}
                {renderLogoutButton()}
              </>
            )}
          </NotHidden>

          <Burger onClick={toggleButton}>
            <Outline />
          </Burger>
        </Row>

        <Drawer closable={false} open={visible} onClose={toggleButton}>
          <DrawerContent>
            <TopSection>
              <Col style={{ marginBottom: "2.5rem" }}>
                <Label onClick={toggleButton}>
                  <Col span={12}>
                    <Menu>{t("menu")}</Menu>
                  </Col>
                  <Col span={12}>
                    <Outline />
                  </Col>
                </Label>
              </Col>
              {!isInTheApp ? renderNavLinks() : renderAppNavigationLinks()}
            </TopSection>

            <BottomSection>
              {isUserLinksRequired && renderAuthLinks()}
              {isInTheApp && renderLogoutButton()}
              {renderLanguageSwitch()}
            </BottomSection>
          </DrawerContent>
        </Drawer>

        <Modal
          title={t("Logout Modal Title")}
          open={isModalVisible}
          onOk={handleConfirmLogout}
          onCancel={handleCancelLogout}
          okText={t("Logout Confirm")}
          cancelText={t("Logout Cancel")}
          centered
          zIndex={1001}
        >
          <p>{t("Logout Text")}</p>
        </Modal>
      </Container>
    </HeaderSection>
  );
};

export default withTranslation()(Header);
