import { Row, Col } from "antd";
import { withTranslation, TFunction } from "react-i18next";
import { SvgIcon } from "../../common/SvgIcon";
import Container from "../../common/Container";

import i18n from "i18next";
import {
  FooterSection,
  Title,
  NavLink,
  Extra,
  LogoContainer,
  Para,
  Large,
  Chat,
  Empty,
  FooterContainer,
  Language,
  Label,
  LanguageSwitch,
  LanguageSwitchContainer,
} from "./styles";

interface SocialLinkProps {
  href: string;
  src: string;
}

const Footer = ({ t }: { t: TFunction }) => {
  const handleChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const SocialLink = ({ href, src }: SocialLinkProps) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  return (
    <>
      <FooterSection>
        <Container>
          <Row justify="space-between">
            <Col lg={6} md={6} sm={12} xs={12}>
              <Language>{t("Contact")}</Language>

              <a href="mailto:l.qqbadze@gmail.com">
                <Chat>{t(`Mail Us`)}</Chat>
              </a>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Title>{t("Policy")}</Title>
              <Large to="/">{t("Application Security")}</Large>
              <Large to="/">{t("Software Principles")}</Large>
            </Col>
           
          </Row>
          <Row justify="space-between">
            <Col lg={10} md={10} sm={12} xs={12}>
              <Empty />
              <Language>{t("Address")}</Language>
              <Para>{t("Adress Detail 1")}</Para>
              <Para>{t("Adress Detail 2")}</Para>
              <Para>{t("Adress Detail 3")}</Para>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Label htmlFor="select-lang">{t("Language")}</Label>
              <LanguageSwitchContainer>
                <LanguageSwitch onClick={() => handleChange("en")}>
                  <SvgIcon
                    src="united-states.svg"
                    aria-label="homepage"
                    width="30px"
                    height="30px"
                  />
                </LanguageSwitch>
                <LanguageSwitch onClick={() => handleChange("hu")}>
                  <SvgIcon
                    src="spain.svg"
                    aria-label="homepage"
                    width="30px"
                    height="30px"
                  />
                </LanguageSwitch>
              </LanguageSwitchContainer>
            </Col>
          </Row>
        </Container>
      </FooterSection>
      <Extra>
        <Container border={true}>
          <Row
            justify="space-between"
            align="middle"
            style={{ paddingTop: "3rem" }}
          >
            <NavLink to="/">
              <LogoContainer>
                <SvgIcon
                  src="logo.png"
                  aria-label="homepage"
                  width="auto"
                  height="64px"
                /> by the One of The Lot
              </LogoContainer>
              
            </NavLink>
            {/* <FooterContainer>
              
              For later use if we want Socials
              <SocialLink
                href="https://github.com/Adrinlol/create-react-app-adrinlol"
                src="github.svg"
              /> 

              
            </FooterContainer> */}
          </Row>
        </Container>
      </Extra>
    </>
  );
};

export default withTranslation()(Footer);
