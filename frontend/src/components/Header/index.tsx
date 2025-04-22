import { useState } from "react";
import { Row, Col, Drawer } from "antd";
import { withTranslation, TFunction } from "react-i18next";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import { Button } from "../../common/Button";
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
} from "./styles";
import { Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const Header = ({ t }: { t: TFunction }) => {
  const [visible, setVisibility] = useState(false);

  const toggleButton = () => {
    setVisibility(!visible);
  };

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      const element = document.getElementById(id) as HTMLDivElement;
      element.scrollIntoView({
        behavior: "smooth",
      });
      setVisibility(false);
    };

    const location = useLocation();

    const isHome = location.pathname === "/";
    return (
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
  };

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          
          <LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="logo.png" width="auto"  height="64px" />
          </LogoContainer>
          <NotHidden>
            <MenuItem />
          </NotHidden>
          <Burger onClick={toggleButton}>
            <Outline />
          </Burger>
        </Row>
        <Drawer closable={false} open={visible} onClose={toggleButton}>
          <Col style={{ marginBottom: "2.5rem" }}>
            <Label onClick={toggleButton}>
              <Col span={12}>
                <Menu>Menu</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <MenuItem />
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default withTranslation()(Header);
