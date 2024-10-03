import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SolutionInterface } from '../../shared/models/solution';
import { EntityService } from '../../shared/services/entity.service';


@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css'],
  providers : [EntityService, {provide: 'baseUri',useValue: '/api/services'}],
})
export class SolutionsComponent implements OnInit {

service = inject (EntityService);
solutions: SolutionInterface[] = [];

  ngOnInit(): void {
    this.FetchAllSolutions();
  }

  FetchAllSolutions() {
    this.service.getSolution().subscribe((data) => {
      this.solutions = data['hydra:member'];
    });
  }
}

