import { useState } from "react";
import { Row, Col, Drawer } from "antd";
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
import styled from "styled-components";

const Header = ({ t }: { t: TFunction }) => {
  const [visible, setVisibility] = useState(false);
  const toggleButton = () => setVisibility(!visible);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const isDocumentation = location.pathname === "/how-to-use";
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

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

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          <LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="logo.png" width="auto" height="64px" />
          </LogoContainer>
          <NotHidden>
            <MenuItem />
            {(isHome || isDocumentation || isLogin || isRegister) && (
              <>
                <CustomNavLinkSmall onClick={() => navigate("/register")}>
                  <Span style={{ color: "#FF824B" }}>{t("Get Started")}</Span>
                </CustomNavLinkSmall>
                <CustomNavLinkSmall onClick={() => navigate("/login")}>
                  <Span style={{ color: "#2D6CDF" }}>{t("Sign In")}</Span>
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
              <MenuItem />
            </TopSection>

            {(isHome || isDocumentation) && (
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
          </DrawerContent>
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default withTranslation()(Header);
