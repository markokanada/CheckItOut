import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";
import ViewComponent from "../interfaces/ViewComponent";
import { action, computed, makeObservable, toJS } from "mobx";
import GlobalEntities from "../store/GlobalEntities";
import { BaseCard } from "../components/Card";
import { observer } from "mobx-react-lite";
import { Divider } from "antd";
import { Hidden } from "@mui/material";
import { EmptyMessage } from "../common/EmptyText";
import { Section } from "../common/Section";

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
    const tasks = toJS(GlobalEntities.tasks);
    const doneTasks = toJS(GlobalEntities.doneTasks);

    const columns = useBreakpointValue({ base: 1, md: 2, lg: 2, xl: 3 });

    return (<>
              <Hidden lgDown></Hidden>
    <Hidden lgUp>


    <Container maxW="6xl" py={{ base: 6, md: 8 }}>
        <VStack padding={10} align="stretch">
          <Section title="Következő teendő">
            {this.card ?? <EmptyMessage message="Nincs megjeleníthető feladat" />}
          </Section>

          <Divider />

          <Section title="Mai teendők">
            {tasks.length ? (
              <SimpleGrid columns={columns} padding={6}>
                {tasks.map((task: Task, i) => this.createCard(task))}
              </SimpleGrid>
            ) : (
              <EmptyMessage message="Nincs aktuális feladat" />
            )}
          </Section>

          <Divider />

          <Section title="Ma elvégzett teendők">
            {doneTasks.length ? (
              <SimpleGrid columns={columns} padding={6}>
                {doneTasks.map((task: Task, i) => this.createCard(task))}
              </SimpleGrid>
            ) : (
              <EmptyMessage message="Ma még nincs kész feladat" />
            )}
          </Section>

          <Flex justify="flex-end" pt={4}>
            <Button
              onClick={() => this.navigate("/newTask")}
              colorScheme="blue"
              size="md"
              borderRadius="full"
              px={6}
            >
              + Új feladat
            </Button>
          </Flex>
        </VStack>
      </Container>
    </Hidden>
    </>
    );
  });
}



