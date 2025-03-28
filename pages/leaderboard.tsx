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
import { useEffect, useState } from "react";
import { LeaderboardTable, MinerUser } from "../components/Leaderboard";
import { mockMiners } from "../utils/mockData";
import { getMinerRankings } from "../utils/earnings";

const LeaderboardPage: NextPage = () => {
  const [timeframe, setTimeframe] = useState("daily");
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);
  const [miners, setMiners] = useState<MinerUser[]>([]);
  const [totalDailyEarnings, setTotalDailyEarnings] = useState<number>(0);
  const [totalWeeklyEarnings, setTotalWeeklyEarnings] = useState<number>(0);

  useEffect(() => {
    const fetchMiners = async () => {
      try {
        setLoading(true);
        const fetchedMiners = await getMinerRankings();
        setMiners(fetchedMiners);
        const dailyTotal = fetchedMiners.reduce((sum, miner) => sum + miner.dailyEarnings, 0);
        const weeklyTotal = fetchedMiners.reduce((sum, miner) => sum + miner.weeklyEarnings, 0);

        setTotalDailyEarnings(+dailyTotal.toFixed(4));
        setTotalWeeklyEarnings(+weeklyTotal.toFixed(4));
        setError(null)
      } catch (err) {
        setError('Failed to load miner rankings');
        console.error(err);
      } finally {
        setLoading(false)
      }
    }

    fetchMiners();
  }, [])

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

            <LeaderboardTable users={miners} />
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
            Total Network Earnings:{" "}
            {timeframe === "daily"
              ? `${totalDailyEarnings} today`
              : timeframe === "weekly"
                ? `${totalWeeklyEarnings} this week`
                : "this month"}
          </Text>
        </Paper>
      </Stack>
    </Container>
  );
};

export default LeaderboardPage;
