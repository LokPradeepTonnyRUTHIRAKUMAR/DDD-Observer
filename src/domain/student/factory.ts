import { XpReward } from "../module/types.js"
import { Student } from "./student"
import { Rank } from "./types"

export function createStudentProgress(xp: number, rank: number): Student {
  if (xp < 0) throw new Error(`XP cannot be negative: ${xp}`)
  if (!Number.isInteger(xp)) throw new Error(`XP must be a whole number: ${xp}`)
  if (rank < 1) throw new Error(`Rank must be at least 1: ${rank}`)
  return {
    xp: xp as XpReward,
    rank: rank as Rank,
  }
}

export function addXp(student: Student, earned: number): Student {
  return createStudentProgress(student.xp + earned, student.rank)
}