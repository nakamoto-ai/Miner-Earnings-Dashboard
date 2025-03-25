import { NextPage } from "next";
import {
  Container,
  Title,
  Paper,
  Text,
  Group,
  SegmentedControl,
  Stack,
  Flex,
  Box,
  Image,
} from "@mantine/core";
import {
  IconTrophy,
  IconCurrencyDollar,
  IconChartBar,
} from "@tabler/icons-react";
import { useState } from "react";
import { LeaderboardTable } from "../components/Leaderboard";
import { mockMiners } from "../utils/mockData";

const LeaderboardPage: NextPage = () => {
  const [timeframe, setTimeframe] = useState("daily");

  return (
    <Container size="lg" py="sm">
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={2}>
            <Group gap="xs">
              <Box
                style={{
                  position: "relative",
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                }}
              >
                <Box
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "transparent",
                    borderRadius: "50%",
                    border: "3px dotted #000",
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                  }}
                />

                <Box
                  style={{
                    position: "absolute",
                    top: 4,
                    left: 4,
                    backgroundColor: "var(--mantine-color-neoGold-1)",
                    borderRadius: "50%",
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                  }}
                />
                <IconTrophy
                  size={32}
                  style={{ color: "black", position: "relative", zIndex: 2 }}
                />
              </Box>
              Nakamoto Mining Leaderboard
              <Box
                style={{
                  position: "relative",
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                }}
              >
                <Box
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "transparent",
                    borderRadius: "50%",
                    border: "2px dotted #000",
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                  }}
                />
                <Box
                  style={{
                    position: "absolute",
                    backgroundImage: "url(/donut_logo.png)",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "50%",
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                  }}
                />{" "}
              </Box>
            </Group>
          </Title>

          <SegmentedControl
            color="neoRed.5"
            value={timeframe}
            onChange={setTimeframe}
            data={[
              { label: "Daily", value: "daily" },
              { label: "Weekly", value: "weekly" },
              { label: "Monthly", value: "monthly" },
            ]}
            withItemsBorders={false}
          />
        </Group>

        <Paper shadow="sm" p="md" withBorder>
          <Stack gap="lg">
            <Flex justify="space-between">
              <Group>
                <Box
                  style={{
                    position: "relative",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                  }}
                >
                  <Box
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: "transparent",
                      borderRadius: "50%",
                      border: "2px dotted #000",
                      width: "100%",
                      height: "100%",
                      zIndex: 1,
                    }}
                  />

                  <Box
                    style={{
                      position: "absolute",
                      top: 4,
                      left: 4,
                      backgroundColor: "var(--mantine-color-neoGreen-6)",
                      borderRadius: "50%",
                      width: "100%",
                      height: "100%",
                      zIndex: 0,
                    }}
                  />
                  <IconCurrencyDollar
                    size={26}
                    style={{ color: "black", position: "relative", zIndex: 2 }}
                  />
                </Box>
                <Text fw={500}>Top Miners by Earnings</Text>
              </Group>
              <Text size="sm" c="dimmed">
                Last updated: today
              </Text>
            </Flex>

            <LeaderboardTable users={mockMiners} />
          </Stack>
        </Paper>

        <Paper shadow="sm" p="md" withBorder>
          <Group>
            <Box
              style={{
                position: "relative",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <Box
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundColor: "transparent",
                  borderRadius: "50%",
                  border: "2px dotted #000",
                  width: "100%",
                  height: "100%",
                  zIndex: 1,
                }}
              />

              <Box
                style={{
                  position: "absolute",
                  top: 4,
                  left: 4,
                  backgroundColor: "var(--mantine-color-neoPink-6)",
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                  zIndex: 0,
                }}
              />
              <IconChartBar
                size={26}
                style={{ color: "black", position: "relative", zIndex: 2 }}
              />
            </Box>
            <Text fw={500}>Earnings Statistics</Text>
          </Group>
          <Text mt="md">
            Total Network Earnings: 2.4432 Tao{" "}
            {timeframe === "daily"
              ? "today"
              : timeframe === "weekly"
                ? "this week"
                : "this month"}
          </Text>
        </Paper>
      </Stack>
    </Container>
  );
};

export default LeaderboardPage;
