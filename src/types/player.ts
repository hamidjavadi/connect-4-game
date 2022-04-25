import { BackgroundColor, TextColor } from "./colors"

export type Player = {
  backgroundColor: BackgroundColor,
  beadTextColor: TextColor,
  beadBackgroundColor: BackgroundColor,
  name?: string,
  textColor: TextColor,
}
