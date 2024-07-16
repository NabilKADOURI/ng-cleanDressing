import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleInterface } from '../shared/models/article';
import { EntityService } from '../shared/services/entity.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
  providers : [EntityService, {provide: 'baseUri',useValue: '/api/articles'}],

})
export class ArticlesComponent implements OnInit {

  constructor(private service:EntityService<ArticleInterface>){}

  articles:ArticleInterface[] = [];



  ngOnInit(): void {
   
    this.getArticles();
  }

  getArticles(){
    this.service.fetchAll().subscribe((data)=>[
      this.articles = data['hydra:member']
    ]);
  }
}
