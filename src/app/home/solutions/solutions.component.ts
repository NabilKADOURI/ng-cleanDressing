import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  constructor(private service:EntityService<SolutionInterface>){}

  solutions: SolutionInterface[] = [];


  ngOnInit(): void {

    this.getSolutions();
   
  }

  getSolutions(){
    this.service.fetchAll().subscribe((data)=>{
      this.solutions = data['hydra:member'];
    });
  }
}
