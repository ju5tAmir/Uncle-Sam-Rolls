import {atom} from 'jotai';
import {CardItem} from "../models/CardItem.ts";

export const CardItemsAtom = atom<CardItem[]>([]);