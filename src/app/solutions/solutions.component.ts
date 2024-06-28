import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SolutionInterface } from '../models/solution';
import { ApiService } from '../services/api.service';

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
    this.apiService.getSolutions().subscribe((data: SolutionInterface[]) => {
      this.solutions = data;
    
    console.log(data);
  })

}
}
