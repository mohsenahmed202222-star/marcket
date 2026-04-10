import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RationService, Family } from '../ration.service';

@Component({
  selector: 'app-family-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.scss']
})
export class FamilyListComponent {
  private rationService = inject(RationService);
  private router = inject(Router);

  families: Family[] = [];
  search = '';
  cardFilter: '' | 100 | 150 | 200 = '';

  constructor() {
    this.families = this.rationService.getFamilies();
  }

  get filteredFamilies(): Family[] {
    const query = this.search.trim().toLowerCase();
    return this.families.filter((family) => {
      const matchesSearch = query ? family.name.toLowerCase().includes(query) : true;
      const matchesCard = this.cardFilter ? family.cardType === this.cardFilter : true;
      return matchesSearch && matchesCard;
    });
  }

  addFamily() {
    this.router.navigate(['/add-family']);
  }

  viewFamily(id: string) {
    this.router.navigate(['/family', id]);
  }

  deleteFamily(id: string) {
    if (confirm('هل أنت متأكد من حذف هذه العائلة؟')) {
      this.rationService.deleteFamily(id);
      this.families = this.rationService.getFamilies(); // refresh
    }
  }

  getCardColor(cardType: number): string {
    switch (cardType) {
      case 100: return '#FF9800'; // orange
      case 150: return '#9C27B0'; // purple
      case 200: return '#4CAF50'; // green
      default: return '#000';
    }
  }
}
