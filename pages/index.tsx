import { NextPage } from "next";
import {
  Container,
  Title,
  Button,
  Group,
  Text,
  SimpleGrid,
  Paper,
  ThemeIcon,
} from "@mantine/core";
import {
  IconTrophy,
  IconDashboard,
  IconServer,
  IconSettings,
} from "@tabler/icons-react";
import Link from "next/link";

const HomePage: NextPage = () => {
  return (
    <Container size="lg" py="xl">
      <Title mb="xl">Dashboard</Title>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mb="xl">
        <Paper shadow="sm" p="md" withBorder>
          <Group>
            <ThemeIcon size="lg" variant="light">
              <IconDashboard size={20} />
            </ThemeIcon>
            <Text fw={500}>Overview</Text>
          </Group>
          <Text mt="sm">View your mining statistics and performance data.</Text>
        </Paper>

        <Paper shadow="sm" p="md" withBorder>
          <Group>
            <ThemeIcon size="lg" variant="light" color="yellow">
              <IconTrophy size={20} />
            </ThemeIcon>
            <Text fw={500}>Leaderboard</Text>
          </Group>
          <Text mt="sm">
            See how you rank against other miners in the subnet.
          </Text>
          <Button variant="light" mt="md" component={Link} href="/leaderboard">
            View Leaderboard
          </Button>
        </Paper>

        <Paper shadow="sm" p="md" withBorder>
          <Group>
            <ThemeIcon size="lg" variant="light" color="blue">
              <IconServer size={20} />
            </ThemeIcon>
            <Text fw={500}>My Nodes</Text>
          </Group>
          <Text mt="sm">Manage your mining nodes and configurations.</Text>
        </Paper>

        <Paper shadow="sm" p="md" withBorder>
          <Group>
            <ThemeIcon size="lg" variant="light" color="gray">
              <IconSettings size={20} />
            </ThemeIcon>
            <Text fw={500}>Settings</Text>
          </Group>
          <Text mt="sm">
            Configure your account and notification preferences.
          </Text>
        </Paper>
      </SimpleGrid>

      <Text c="dimmed" ta="center">
        DASHBOARD-V2 - Mining Subnet Management
      </Text>
    </Container>
  );
};

export default HomePage;
