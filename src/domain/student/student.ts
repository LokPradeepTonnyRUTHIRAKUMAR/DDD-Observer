import { XpReward } from "../module/types.js";
import { Rank } from "./types.js";

export type Student = {
    readonly xp: XpReward
    readonly rank: Rank
}