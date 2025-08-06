import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Initialization logic can go here
  }

  ngAfterViewInit(): void {
    // Run DOM-related logic after the view is ready
    this.addScrollAnimations();
  }


   onWaitlistSubmit(event: Event): void {
    event.preventDefault(); // Prevents the browser from reloading the page

    // Get the form data
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get('email');

    // For now, we'll just log it to the console.
    // In a real application, you would send this to your backend or a service.
    console.log('Waitlist submission for email:', email);

    // Optional: You can give user feedback here, e.g., show a "Thank you" message.
    alert('Thank you for joining the waitlist!');
    (event.target as HTMLFormElement).reset(); // Clear the form
  }
  private addScrollAnimations(): void {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const animateOnScroll = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          entry.target.classList.remove('animate-on-scroll');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(animateOnScroll, observerOptions);

    // Select all elements that should have the animation
    const animatedElements = document.querySelectorAll(
      '.hero h1, .hero p, .hero .hero-buttons, .hero .dashboard-preview, .section-header, .feature-card, .testimonial-card, .cta-content'
    );

    animatedElements.forEach(element => {
      element.classList.add('animate-on-scroll');
      observer.observe(element);
    });
  }

  /**
   * Handles Call-To-Action button clicks for navigation.
   * @param ctaType A string identifying the clicked CTA.
   */
  onCtaClick(ctaType: string): void {
    console.log(`CTA clicked: ${ctaType}`);
    
    // Navigate based on the button's purpose
    switch (ctaType) {
            case 'scrollToWaitlist':
        document.getElementById('Join-Waitlist')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'signup':
      case 'signup_final':
        // Navigate to the user registration page
        this.router.navigate(['/register']);
        break;
      case 'find_project':
        // Navigate to the page that lists available projects
        this.router.navigate(['/projects']);
        break;
      case 'learn_more':
        // Smooth scroll to the 'features' section
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  }
}