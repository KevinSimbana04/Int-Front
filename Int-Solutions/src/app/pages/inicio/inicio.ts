import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para @for y [style]

interface Slide {
  title: string;
  description: string;
  subtitle?: string; // Opcional, porque solo la primera slide lo tiene
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
  
  // 1. Datos de tus slides (Copiados de tu InicioCard.jsx)
  slides: Slide[] = [
    {
      title: 'INT-SOLUTIONS',
      description: 'Tu fuente de información',
      subtitle: 'Para interactuar y saber más, da clic en las siguientes entradas',
      image: 'assets/images/fondo.jpeg' // Asegúrate de mover las imágenes aquí
    },
    {
      title: 'Desarrollo páginas web',
      description: 'Transformamos tus ideas en sitios web impactantes que conectan con tus clientes y potencian tu negocio.',
      image: 'assets/images/desarrolloWeb.webp'
    },
    {
      title: 'Software a la medida',
      description: 'Aplicaciones hechas específicamente para ti',
      image: 'assets/images/media.jpg'
    }
  ];

  // 2. Estado del carrusel
  currentSlide = 0;
  autoSlideInterval: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide(); // Limpiamos el intervalo al salir de la página
  }

  // 3. Funciones de control
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    // Reiniciamos el temporizador si el usuario interactúa
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Cambio cada 5 segundos
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }
}