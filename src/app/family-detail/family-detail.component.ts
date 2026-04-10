import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RationService, Family, MonthlyRecord } from '../ration.service';

@Component({
  selector: 'app-family-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './family-detail.component.html',
  styleUrls: ['./family-detail.component.scss'],
})
export class FamilyDetailComponent implements OnInit {
  private rationService = inject(RationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  family: Family | null = null;
  newRecord: MonthlyRecord = {
    month: new Date().toISOString().slice(0, 7), // YYYY-MM
    oil: 0,
    sugar: 0,
    pasta: 0,
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const families = this.rationService.getFamilies();
      this.family = families.find((f) => f.id === id) || null;
    }
  }

  addRecord() {
    if (this.family) {
      this.rationService.addRecord(this.family.id, this.newRecord);
      const families = this.rationService.getFamilies();
      this.family = families.find((f) => f.id === this.family?.id) || this.family;
      this.newRecord = {
        month: new Date().toISOString().slice(0, 7),
        oil: 0,
        sugar: 0,
        pasta: 0,
      };
    }
  }

  getTotalGoods() {
    if (!this.family) return { oil: 0, sugar: 0, pasta: 0 };
    return this.family.records.reduce(
      (acc, rec) => ({
        oil: acc.oil + rec.oil,
        sugar: acc.sugar + rec.sugar,
        pasta: acc.pasta + rec.pasta,
      }),
      { oil: 0, sugar: 0, pasta: 0 }
    );
  }

  back() {
    this.router.navigate(['/']);
  }
}
