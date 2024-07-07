import { Component } from '@angular/core';
import { LocationInfoComponent } from './location-info/location-info.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [LocationInfoComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
