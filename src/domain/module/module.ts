import { ModuleId, ModuleTitle, ModuleStatus, XpReward } from "./types"

export type Module = {
  readonly id: ModuleId
  readonly title: ModuleTitle
  readonly status: ModuleStatus
  readonly xpReward: XpReward
}
