import { useState } from "react";
import { Row, Col, Drawer, Modal, Button } from "antd"; // <-- Modal, Button is kell!
import { withTranslation, TFunction } from "react-i18next";
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
import { useLocation, useNavigate } from "react-router-dom";
import { LanguageSwitchContainer, LanguageSwitch } from "../Footer/styles";
import i18n from "../../translation";

const Header = ({ t }: { t: TFunction }) => {
  const [visible, setVisibility] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal láthatóság állapot

  const toggleButton = () => setVisibility(!visible);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  const isDocumentation = location.pathname === "/how-to-use";
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const isUserLinksRequired = isHome || isDocumentation || isLogin || isRegister;
  const isInTheApp = location.pathname.includes("/app/");

  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setVisibility(false);
  };

  const handleChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const handleLogoutClick = () => {
    setIsModalVisible(true); 
  };

  const handleConfirmLogout = () => {
    localStorage.clear();
    setIsModalVisible(false);
    navigate("/");
    setVisibility(false)
  };

  const handleCancelLogout = () => {
    setIsModalVisible(false);
  };

  const MenuItem = () => (
    <>
      {isHome && (
        <>
          <CustomNavLinkSmall onClick={() => scrollTo("why-us")}>
            <Span>{t("nav1")}</Span>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall onClick={() => scrollTo("features")}>
            <Span>{t("nav2")}</Span>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall onClick={() => scrollTo("usage")}>
            <Span>{t("nav3")}</Span>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall onClick={() => scrollTo("content")}>
            <Span>{t("nav4")}</Span>
          </CustomNavLinkSmall>
        </>
      )}
    </>
  );

  const isItAnAppSide: boolean = location.pathname.includes("app");

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          <LogoContainer
            to={isItAnAppSide ? "/app/home" : "/"}
            aria-label="homepage"
          >
            <SvgIcon src="logo.png" width="auto" height="64px" />
          </LogoContainer>

          <NotHidden>
            <MenuItem />
            {isUserLinksRequired && (
              <>
                <CustomNavLinkSmall onClick={() => navigate("/register")}>
                  <Span style={{ color: "#FF824B" }}>{t("Get Started")}</Span>
                </CustomNavLinkSmall>
                <CustomNavLinkSmall onClick={() => navigate("/login")}>
                  <Span style={{ color: "#2D6CDF" }}>{t("Sign In")}</Span>
                </CustomNavLinkSmall>
              </>
            )}
            {isInTheApp && (
              <>
                <CustomNavLinkSmall onClick={() => navigate("/app/newTask")}>
                  <Span style={{ color: "#2D6CDF" }}>{t("New Task Title")}</Span>
                </CustomNavLinkSmall>
                <CustomNavLinkSmall onClick={() => navigate("/app/profile")}>
                  <Span style={{ color: "#2D6CDF" }}>{t("Profile Title")}</Span>
                </CustomNavLinkSmall>
                <CustomNavLinkSmall onClick={handleLogoutClick}>
                  <Span style={{ color: "#FF824B" }}>{t("Log out Title")}</Span>
                </CustomNavLinkSmall>
              </>
            )}
          </NotHidden>

          <Burger onClick={toggleButton}>
            <Outline />
          </Burger>
        </Row>

        {/* Drawer for Mobile Menu */}
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
              {!isItAnAppSide && (<MenuItem />)}
              {isItAnAppSide && (<>
                <CustomNavLinkSmall onClick={() => navigate("/app/newTask")}>
              <Span style={{ color: "#2D6CDF" }}>{t("New Task Title")}</Span>
            </CustomNavLinkSmall>
            <CustomNavLinkSmall onClick={() => navigate("/app/profile")}>
              <Span style={{ color: "#2D6CDF" }}>{t("Profile Title")}</Span>
            </CustomNavLinkSmall></>)}
            </TopSection>

            {isUserLinksRequired && (
              <BottomSection>
                <CustomNavLinkSmall onClick={() => navigate("/register")}>
                  <Span style={{ color: "#FF824B" }}>{t("Get Started")}</Span>
                </CustomNavLinkSmall>
                <CustomNavLinkSmall onClick={() => navigate("/login")}>
                  <Span style={{ color: "#2D6CDF" }}>{t("Sign In")}</Span>
                </CustomNavLinkSmall>
                <LanguageSwitchContainer>
                  <LanguageSwitch onClick={() => handleChange("en")}>
                    <SvgIcon
                      src="en.svg"
                      aria-label="english"
                      width="30px"
                      height="30px"
                    />
                  </LanguageSwitch>
                  <LanguageSwitch onClick={() => handleChange("hu")}>
                    <SvgIcon
                      src="hu.svg"
                      aria-label="magyar"
                      width="30px"
                      height="30px"
                    />
                  </LanguageSwitch>
                </LanguageSwitchContainer>
              </BottomSection>
            )}
            {isItAnAppSide && (<>

              <BottomSection>
              

            <CustomNavLinkSmall onClick={handleLogoutClick}>
              <Span style={{ color: "#FF824B" }}>{t("Log out Title")}</Span>
            </CustomNavLinkSmall>
            <LanguageSwitchContainer>
                  <LanguageSwitch onClick={() => handleChange("en")}>
                    <SvgIcon
                      src="en.svg"
                      aria-label="english"
                      width="30px"
                      height="30px"
                    />
                  </LanguageSwitch>
                  <LanguageSwitch onClick={() => handleChange("hu")}>
                    <SvgIcon
                      src="hu.svg"
                      aria-label="magyar"
                      width="30px"
                      height="30px"
                    />
                  </LanguageSwitch>
                </LanguageSwitchContainer>
              </BottomSection></>
            )}
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
