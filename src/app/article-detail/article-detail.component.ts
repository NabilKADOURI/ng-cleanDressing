import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleInterface } from '../shared/models/article';
import { ArticleService } from '../shared/services/article.service';
import { Observable, Subscription, switchMap } from 'rxjs';
import { FormatDescriptionPipe } from '../shared/pipes/format-description.pipe';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, FormatDescriptionPipe],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
  providers: [{ provide: 'baseUri', useValue: '/api/services' }]
})
export class ArticleDetailComponent implements OnInit, OnDestroy {

  article$!: Observable<ArticleInterface | undefined>;
  article!: ArticleInterface;
  private dataArticleSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit(): void { 
    this.article$ = this.route.params.pipe(
      switchMap(params => this.articleService.getArticleById(+params['id']))
    );
    
    this.dataArticleSubscription = this.route.params.subscribe(params => {
      this.articleService.getArticleById(+params['id']).subscribe(data => {
        this.article = data;
        console.log(data);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.dataArticleSubscription) {
      this.dataArticleSubscription.unsubscribe();
    }
  }
}
