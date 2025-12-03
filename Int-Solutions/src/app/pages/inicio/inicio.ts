import { Component, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core'; // 1. Importar inject y PLATFORM_ID
import { CommonModule, isPlatformBrowser } from '@angular/common'; 

interface Slide {
  title: string;
  description: string;
  subtitle?: string;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit, OnDestroy {
  
  // 3. Inyectar el ID de la plataforma
  private platformId = inject(PLATFORM_ID);

  slides: Slide[] = [
    {
      title: 'INT-SOLUTIONS',
      description: 'Tu fuente de información',
      subtitle: 'Para interactuar y saber más, da clic en las siguientes entradas',
      image: '/img/telecomunicaciones.jpg'
    },
    {
      title: 'Desarrollo páginas web',
      description: 'Transformamos tus ideas en sitios web impactantes que conectan con tus clientes y potencian tu negocio.',
      image: '/img/desarrollo-We.jpg'
    },
    {
      title: 'Software a la medida',
      description: 'Aplicaciones hechas específicamente para ti',
      image: '/img/telecomunicaciones.jpg' // Usa una imagen por defecto si falta la de 'media.jpg'
    }
  ];

  currentSlide = 0;
  autoSlideInterval: any;

  ngOnInit() {
    // 4. CONDICIÓN CLAVE: Solo iniciar el intervalo si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    if (isPlatformBrowser(this.platformId)) {
      this.stopAutoSlide();
      this.startAutoSlide();
    }
  }

  startAutoSlide() {
    // Esto ahora solo corre en el navegador, evitando que el servidor se congele
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }
}