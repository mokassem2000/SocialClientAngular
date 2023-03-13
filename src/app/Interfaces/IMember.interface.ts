import { IPhoto } from './IPhoto.interface';

export interface IMember {
  memberId: string;
  userName: string;
  dateOfBirth: Date;
  knowenAs: string;
  introduction: string;
  created: Date;
  lastActive: Date;
  gender: string;
  lookingFor: string;
  intersts: string;
  city: string;
  country: string;
  photos: IPhoto[];
}
