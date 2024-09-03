import { IListItem } from "@/types/list"
import { IUser } from "@/types/user"

export type AuthStore = {
  user: IUser
  isSignedIn: boolean
  guestMode: boolean
}

export type ListStore = {
  list: IListItem[]
  doneList: IListItem[]
}

export type SettingsStore = {
  dark: boolean
}
