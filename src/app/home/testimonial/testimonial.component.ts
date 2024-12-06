import { Component, inject, OnInit } from '@angular/core';
import { EntityService } from '../../shared/services/entity.service';
import { TestimonialInterface } from '../../shared/models/testimonial';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css',
})
export class TestimonialComponent implements OnInit {
  service = inject(EntityService);
  testimonials: TestimonialInterface[] = [];
  url = environment.urlPicture;

  ngOnInit(): void {
    this.fetchAllTestimonial();
  }

  fetchAllTestimonial() {
    this.service.getTestimonial().subscribe((data) => {
      this.testimonials = data['hydra:member'];
    });
  }
}
