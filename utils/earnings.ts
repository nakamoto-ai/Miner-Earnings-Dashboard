import { Miner, MinerEarnings, getMiners, getEarnings } from "./api";
import { MinerUser } from "../components/Leaderboard";

export const getYesterdayDate = (): string => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

export const getLastWeekDate = (): string => {
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  return lastWeek.toISOString().split('T')[0];
};

export const getMinerRankings = async (): Promise<MinerUser[]> => {
  try {
    // Get all miners
    const miners = await getMiners();
    
    // Get daily and weekly earnings
    const yesterdayDate = getYesterdayDate();
    const lastWeekDate = getLastWeekDate();
    const dailyEarnings = await getEarnings(yesterdayDate);
    const weeklyEarnings = await getEarnings(lastWeekDate);
    
    // Create a map of daily earnings by miner ID
    const dailyEarningsMap = new Map<number, number>();
    dailyEarnings.forEach(earning => {
      const minerId = earning.people_id;
      const amount = earning.tao_earned;
      
      // Add to existing amount if there are multiple entries for the same miner
      const existingAmount = dailyEarningsMap.get(minerId) || 0;
      dailyEarningsMap.set(minerId, existingAmount + amount);
    });
    
    // Create a map of weekly earnings by miner ID
    const weeklyEarningsMap = new Map<number, number>();
    weeklyEarnings.forEach(earning => {
      const minerId = earning.people_id;
      const amount = earning.tao_earned;
      
      // Add to existing amount if there are multiple entries for the same miner
      const existingAmount = weeklyEarningsMap.get(minerId) || 0;
      weeklyEarningsMap.set(minerId, existingAmount + amount);
    });
    
    // Combine the data
    const minerUsers: MinerUser[] = miners.map(miner => ({
      id: miner.id,
      name: miner.name,
      dailyEarnings: +(dailyEarningsMap.get(miner.id) || 0).toFixed(4),
      weeklyEarnings: +(weeklyEarningsMap.get(miner.id) || 0).toFixed(4),
      rank: 0, // Will be set after sorting
    }));
    
    // Sort by weekly earnings (descending)
    const sortedMiners = minerUsers.sort((a, b) => b.weeklyEarnings - a.weeklyEarnings);
    
    // Assign ranks
    sortedMiners.forEach((miner, index) => {
      miner.rank = index + 1;
    });
    
    return sortedMiners;
  } catch (error) {
    console.error('Error processing miner rankings:', error);
    throw error;
  }
};