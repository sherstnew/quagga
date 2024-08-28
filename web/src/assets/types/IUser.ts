import { IFile } from './IFile'
import { ISession } from './ISession'

export interface IUser {
  _id: string
  name: string,
  sessions: ISession[]
  files: IFile[]
  isConfirmed: boolean
  email: string
  password: string
  cardId: string
}