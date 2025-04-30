import {
  Box,
  Button,
  Container,
  Flex,
  SimpleGrid,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import ViewComponent from "../interfaces/ViewComponent";
import { action, computed, makeObservable, toJS } from "mobx";
import GlobalEntities from "../store/GlobalEntities";
import { BaseCard } from "../components/Card";
import { observer } from "mobx-react-lite";
import { Divider } from "antd";
import { Hidden, Backdrop, CircularProgress } from "@mui/material";
import { EmptyMessage } from "../common/EmptyText";
import { Section } from "../common/Section";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Task } from "../interfaces/Task";

export default class Home implements ViewComponent {
  constructor(public navigate: NavigateFunction) {
    makeObservable(this);
  }

  @action private createCard = (task: Task) => {
    const card = new BaseCard(task);
    return <card.View />;
  };

  @computed private get card() {
    return GlobalEntities.firstTask ? this.createCard(GlobalEntities.firstTask) : null;
  }

  View = observer(() => {

    const { t } = useTranslation();
    const tasks = toJS(GlobalEntities.tasks);
    const doneTasks = toJS(GlobalEntities.doneTasks);

    const columns = useBreakpointValue({ base: 1, md: 2, lg: 2, xl: 3 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        <Backdrop
          sx={{backgroundColor: "rgba(0, 0, 0, 0.2)", color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="primary" />
        </Backdrop>

        {!loading && (
          <>
            <Hidden lgDown>
              <Flex alignItems="flex-start" height="100%" paddingTop="2rem">
                <Box flex="1" p={4}>
                  <Section title={t("Next Task Title")}>
                  <SimpleGrid columns={columns}>

                    {this.card ?? <EmptyMessage message={t("Next Task Message")} />}
                    </SimpleGrid>
                  </Section>
                </Box>

                <Box
                  flex="1"
                  p={4}
                  borderLeft="2px lightgray solid"
                  borderRight="2px lightgray solid"
                >
                  <Section title={t("Today Task Title")}>
                    {tasks.length ? (
                      <SimpleGrid columns={columns} padding={6}>
                        {tasks.map((task: Task) => this.createCard(task))}
                      </SimpleGrid>
                    ) : (
                      <EmptyMessage message={t("Today Task Message")} />
                    )}
                  </Section>
                </Box>

                <Box flex="1" p={4}>
                  <Section title={t("Done Task Title")}>
                    {doneTasks.length ? (
                      <SimpleGrid columns={columns} padding={6}>
                        {doneTasks.map((task: Task) => this.createCard(task))}
                      </SimpleGrid>
                    ) : (
                      <EmptyMessage message={t("Done Task Message")} />
                    )}
                  </Section>
                </Box>
              </Flex>
            </Hidden>

            <Hidden lgUp>
              <Container maxW="6xl" py={{ base: 6, md: 8 }}>
                <VStack padding={10} align="stretch">
                  <Section title={t("Next Task Title")}>
                  <SimpleGrid columns={columns}>
                    {this.card ?? <EmptyMessage message={t("Next Task Message")} />}
                    </SimpleGrid>
                  </Section>

                  <Divider />

                  <Section title={t("Today Task Title")}>
                    {tasks.length ? (
                      <SimpleGrid columns={columns}>
                        {tasks.map((task: Task) => this.createCard(task))}
                      </SimpleGrid>
                    ) : (
                      <EmptyMessage message={t("Today Task Message")} />
                    )}
                  </Section>

                  <Divider />

                  <Section title={t("Done Task Title")}>
                    {doneTasks.length ? (
                      <SimpleGrid columns={columns} padding={6}>
                        {doneTasks.map((task: Task) => this.createCard(task))}
                      </SimpleGrid>
                    ) : (
                      <EmptyMessage message={t("Done Task Message")} />
                    )}
                  </Section>
                </VStack>
              </Container>
            </Hidden>
          </>
        )}
      </>
    );
  });
}
