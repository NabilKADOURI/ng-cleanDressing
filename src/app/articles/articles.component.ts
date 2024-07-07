import { Component } from '@angular/core';
import { ArticleService } from '../shared/services/article.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleInterface } from '../shared/models/article';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {

  articles:ArticleInterface[] = [];

  constructor(private apiArticles:ArticleService) {}

  ngOnInit(): void {
    this.apiArticles.fetchAllArticles().subscribe((data: ArticleInterface[]) =>{
      this.articles = data;
    })
  }

}
