import { Table, Avatar, Group, Text, Badge, Box, alpha } from "@mantine/core";

// Define user type
export interface MinerUser {
  id: number;
  name: string;
  avatarUrl?: string;
  dailyEarnings: number;
  weeklyEarnings: number;
  rank: number;
}

interface LeaderboardTableProps {
  users: MinerUser[];
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  users,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Get color based on rank
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "var(--mantine-color-neoGold-6)";
      case 2:
        return "var(--mantine-color-gray-5)";
      case 3:
        return "var(--mantine-color-neoGold-7)";
      default:
        return "var(--mantine-color-neoLightBlue-5)";
    }
  };

  return (
    <Table
      striped
      highlightOnHover
      withRowBorders={true}
      withTableBorder
      borderColor="black"
      highlightOnHoverColor={alpha("var(--mantine-color-neoPurple-2)", 0.5)}
      stripedColor={alpha("var(--mantine-color-neoPurple-0)", 0.5)}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ width: 60 }}>#</Table.Th>
          <Table.Th>Miner</Table.Th>
          <Table.Th style={{ textAlign: "right" }}>Daily Earnings</Table.Th>
          <Table.Th style={{ textAlign: "right" }}>Weekly Earnings</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {users.map((user) => (
          <Table.Tr key={user.id}>
            <Table.Td>
              <Box style={{ position: "relative" }}>
                <Box
                  style={{
                    position: "absolute",
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: getRankColor(user.rank),
                    top: "3px",
                    left: "3px",
                    zIndex: 1,
                  }}
                />
                <Box
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    border: "2px solid #000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    backgroundColor: "transparent",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  {user.rank}
                </Box>
              </Box>
            </Table.Td>
            <Table.Td>
              <Group gap="sm">
                <Avatar
                  color="neoLightBlue"
                  radius="xl"
                  src={user.avatarUrl}
                  bd="1px solid neoLightBlue"
                >
                  {getInitials(user.name)}
                </Avatar>
                <Text fw={500}>{user.name}</Text>
              </Group>
            </Table.Td>
            <Table.Td style={{ textAlign: "right" }}>
              <Text fw={500}>{user.dailyEarnings.toFixed(4)} Tao</Text>
            </Table.Td>
            <Table.Td style={{ textAlign: "right" }}>
              <Text fw={500}>{user.weeklyEarnings.toFixed(4)} Tao</Text>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default LeaderboardTable;
