import {useState} from 'react';
import * as scholarshipBank from './scholarshipBank.json';



/*
Scholarship data interface: content for one scholarship.
    id: number;             -> scholarship ID in the dataset
    name: string;           -> name of scholarship
    dueDate: string;        -> due date of scholarship (Month Day, Year)
    sponsor: string;        -> name of organization sponsoring the scholarship
    amount: number;         -> amount for scholarship
    description: string;    -> a general description for the scholarship
    rankings: number[];     -> a 5-element array representing the rankings for each character
                            -> ranking = num [0,1] where 1 is very relevant / top choice out of all the scholarships
*/
export interface ScholarshipData {
    id: number;
    name: string;
    dueDate: string;
    sponsor: string;
    amount: number;
    description: string;
    rankings: number[]; 
}

function getChosenArray(min: number, max: number): number[] {
  const chosenSet = new Set<number>();
  while (chosenSet.size < 4) {
    chosenSet.add(Math.floor(Math.random() * (max - min) + min));
  }
  return Array.from(chosenSet);
}

// hard-coded question bank for ease of use
const currentScholarships: ScholarshipData[] =[...scholarshipBank.scholarships];


let chosenIds = getChosenArray(0, 32);

export const selectedEntries = currentScholarships.filter((scholarshipEntry) => chosenIds.includes(scholarshipEntry.id));



