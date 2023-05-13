import { IUser } from '../_entites/iuser';
import { IMember } from './IMember.interface';

export interface pager {
  totalItem: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  items: IMember[];
}
