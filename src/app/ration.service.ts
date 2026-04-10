import { Injectable } from '@angular/core';

export interface Family {
  id: string;
  name: string;
  cardType: 100 | 150 | 200;
  individuals: number;
  records: MonthlyRecord[];
}

export interface MonthlyRecord {
  month: string; // YYYY-MM
  oil: number;
  sugar: number;
  pasta: number;
}

function safeLocalStorage(): Storage | null {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
    ? window.localStorage
    : null;
}

@Injectable({
  providedIn: 'root',
})
export class RationService {
  private readonly STORAGE_KEY = 'ration_families';

  getFamilies(): Family[] {
    const storage = safeLocalStorage();
    if (!storage) {
      return [];
    }

    const data = storage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveFamilies(families: Family[]): void {
    const storage = safeLocalStorage();
    if (!storage) {
      return;
    }
    storage.setItem(this.STORAGE_KEY, JSON.stringify(families));
  }

  addFamily(family: Omit<Family, 'id' | 'records'>): void {
    const families = this.getFamilies();
    const newFamily: Family = {
      ...family,
      id: Date.now().toString(),
      records: [],
    };
    families.push(newFamily);
    this.saveFamilies(families);
  }

  updateFamily(id: string, updates: Partial<Family>): void {
    const families = this.getFamilies();
    const index = families.findIndex((f) => f.id === id);
    if (index !== -1) {
      families[index] = { ...families[index], ...updates };
      this.saveFamilies(families);
    }
  }

  deleteFamily(id: string): void {
    const families = this.getFamilies();
    const filtered = families.filter((f) => f.id !== id);
    this.saveFamilies(filtered);
  }

  addRecord(familyId: string, record: MonthlyRecord): void {
    const families = this.getFamilies();
    const family = families.find((f) => f.id === familyId);
    if (family) {
      // Check if record for month exists, update or add
      const existingIndex = family.records.findIndex((r) => r.month === record.month);
      if (existingIndex !== -1) {
        family.records[existingIndex] = record;
      } else {
        family.records.push(record);
      }
      this.saveFamilies(families);
    }
  }
}
