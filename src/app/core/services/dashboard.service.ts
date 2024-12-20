import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ReloadPageService {
  constructor(private router: Router) {}

  reloadPage(path?: string): void {
    const currentUrl = this.router.url;
    console.log(currentUrl);

    this.router
      .navigateByUrl('/personal-finance', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([currentUrl]).then(() => {
          console.log('Reloaded');
        });
      })
      .catch((err) => {
        console.error('Navigation failed:', err);
      });
  }
}
