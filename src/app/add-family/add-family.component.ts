import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RationService } from '../ration.service';

@Component({
  selector: 'app-add-family',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-family.component.html',
  styleUrls: ['./add-family.component.scss'],
})
export class AddFamilyComponent {
  private rationService = inject(RationService);
  private router = inject(Router);

  family = {
    name: '',
    cardType: 100 as 100 | 150 | 200,
    individuals: 1,
  };

  onSubmit() {
    if (this.family.name.trim()) {
      this.rationService.addFamily(this.family);
      this.router.navigate(['/']);
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
