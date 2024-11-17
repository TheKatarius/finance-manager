import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ReloadPageService {
  constructor(private router: Router) {}

  reloadPage(path: string): void {
    this.router.navigate([path]).then(() => {
      window.location.reload();
    });
  }
}
