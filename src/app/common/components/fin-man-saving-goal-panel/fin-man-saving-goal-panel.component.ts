import { AnimationOptions } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'fin-man-saving-goal-panel',
  templateUrl: './fin-man-saving-goal-panel.component.html',
  styleUrls: ['./fin-man-saving-goal-panel.scss'],
})
export class FinManSavingGoalPanelComponent {
  // Wizualizacja celu
  goalImage: string = 'assets/default-goal.jpg';
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.goalImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Paski postępu
  currentProgress: number = 0;
  savingsGoal: number = 1000; // Docelowa kwota oszczędności
  currentSavings: number = 0;

  // Odliczanie czasu
  targetDate: Date = new Date('2024-12-31');
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  // Animacja monet
  showAnimation: boolean = false;
  coins: any[] = [];

  // Emocjonalny przekaz
  motivationalMessage: string = '';

  // Natychmiastowa informacja zwrotna
  feedbackMessage: string = '';

  ngOnInit() {
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000);
  }

  // Aktualizacja odliczania czasu
  updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

  // Dodawanie oszczędności
  addSavings() {
    const amount = 50; // Przykładowa kwota dodanych oszczędności
    this.currentSavings += amount;
    this.currentProgress = Math.min((this.currentSavings / this.savingsGoal) * 100, 100);

    // Natychmiastowa informacja zwrotna
    this.feedbackMessage = `Brawo! Dodałeś ${amount} zł do swoich oszczędności!`;
    setTimeout(() => {
      this.feedbackMessage = '';
    }, 3000);

    // Animacja monet
    this.playCoinAnimation();

    // Emocjonalny przekaz
    this.showMotivation();
  }

  // Odtwarzanie animacji monet
  playCoinAnimation() {
    this.showAnimation = true;
    this.coins = Array(10).fill(0); // Generuje 10 monet
    setTimeout(() => {
      this.showAnimation = false;
      this.coins = [];
    }, 2000); // Czas trwania animacji
  }

  // Wyświetlanie komunikatu motywacyjnego
  showMotivation() {
    const messages = [
      'Każdy krok przybliża Cię do celu!',
      'Twoja przyszłość staje się jaśniejsza z każdym zaoszczędzonym groszem.',
      'Nie poddawaj się! Jesteś na dobrej drodze.',
    ];
    const index = Math.floor(Math.random() * messages.length);
    this.motivationalMessage = messages[index];

    // Usunięcie komunikatu po pewnym czasie
    setTimeout(() => {
      this.motivationalMessage = '';
    }, 5000);
  }
}
