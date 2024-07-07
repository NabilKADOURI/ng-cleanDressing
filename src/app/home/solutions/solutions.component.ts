import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ApiService } from '../../shared/services/api.service';
import { SolutionInterface } from '../../shared/models/solution';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.css'
})
export class SolutionsComponent implements OnInit {

  solutions: SolutionInterface[] = [];

  constructor(private apiService:ApiService){}

  ngOnInit(): void {
    this.apiService.fetchAllSolutions().subscribe((data: SolutionInterface[]) => {
      this.solutions = data;
    
  })

}
}
