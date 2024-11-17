<template>
  <div class="custom-home">
    <!-- Hero Section -->
    <div class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">{{ frontmatter.hero.name }}</span>
        </h1>
        <p class="hero-subtitle">{{ frontmatter.hero.text }}</p>
        <p class="hero-tagline">{{ frontmatter.hero.tagline }}</p>
        
        <div class="hero-buttons">
          <a class="button primary" :href="frontmatter.hero.actions[0].link">
            {{ frontmatter.hero.actions[0].text }}
          </a>
          <a v-if="frontmatter.hero.actions[1]" class="button secondary" :href="frontmatter.hero.actions[1].link">
            {{ frontmatter.hero.actions[1].text }}
          </a>
        </div>
      </div>

      <div class="hero-image">
        <div class="image-container">
          <img :src="frontmatter.hero.image.src" :alt="frontmatter.hero.image.alt">
        </div>
        <div class="floating-elements">
          <div class="element element-1"></div>
          <div class="element element-2"></div>
          <div class="element element-3"></div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="features">
      <div class="features-grid">
        <div v-for="feature in frontmatter.features" :key="feature.title" class="feature-card">
          <div class="feature-icon">
            {{ feature.icon }}
          </div>
          <strong>{{ feature.title }}</strong>
          <p>{{ feature.details }}</p>
        </div>
      </div>
    </div>

    <!-- Image Carousel Section -->
    <div class="carousel-section">
      <div class="carousel-container">
        <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div v-for="(image, index) in frontmatter.images" :key="index" class="carousel-slide">
            <img :src="image.src" :alt="image.alt">
          </div>
        </div>
        
        <!-- Navigation Arrows -->
        <button class="carousel-button prev" @click="prevSlide" :disabled="isTransitioning">
          ←
        </button>
        <button class="carousel-button next" @click="nextSlide" :disabled="isTransitioning">
          →
        </button>

        <!-- Navigation Dots -->
        <div class="carousel-dots">
          <button
            v-for="(_, index) in frontmatter.images"
            :key="index"
            class="carousel-dot"
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-home {
  padding-top: 4rem;
  padding-bottom: 4rem;
  width: 1420px;
  max-width: 80%;
  margin: 0 auto;
}

/* Hero Section Styles */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem 0 6rem;
  /* min-height: calc(100vh - 4rem); */
  position: relative;
  overflow: hidden;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 4rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-weight: 800;
}

.gradient-text {
  background: linear-gradient(120deg, var(--deep-dark-blue), var(--vivid-red));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.hero-tagline {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.button {
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
}

.button.primary {
  background: var(--deep-dark-blue);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(26, 35, 126, 0.39);
}

.button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(26, 35, 126, 0.23);
}

.button.secondary {
  background: rgba(225, 0, 0, 0.1);
  color: var(--vivid-red);
  border: 2px solid var(--vivid-red);
}

.button.secondary:hover {
  background: rgba(225, 0, 0, 0.23
  );
  transform: translateY(-2px);
}

/* Hero Image Styles */
.hero-image {
  flex: 1;
  position: relative;
  height: 100%;
  max-width: 50%;
}


@media screen and (min-width: 768px) {

  .image-container {
  position: relative;
  z-index: 2;
  animation: float 6s ease-in-out infinite;
  margin: auto;
  max-width: 280px;
}

.image-container img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  /* box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); */
}


/* Floating Elements Animation */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.element {
  position: absolute;
  border-radius: 50%;
  opacity: 0.6;
  filter: blur(40px);
}

.element-1 {
  background: var(--deep-dark-blue);
  width: 200px;
  height: 200px;
  top: 20%;
  left: 10%;
  animation: float 8s ease-in-out infinite;
}

.element-2 {
  background: var(--fresh-green);
  width: 150px;
  height: 150px;
  bottom: 30%;
  right: 20%;
  animation: float 6s ease-in-out infinite;
}

.element-3 {
  background: var(--vivid-red-light);
  width: 100px;
  height: 100px;
  top: 60%;
  left: 30%;
  animation: float 7s ease-in-out infinite;
}
}


/* Features Section Styles */
.features {
  padding: 3rem 1rem;
}

.features-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 4rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  font-size: 2rem;
  background: var(--gradient-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.feature-icon i {
  font-size: 24px;
  color: white;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Responsive Design */
@media (max-width: 960px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding-top: 2rem;
  }

  .hero-content {
    max-width: 100%;
    margin-bottom: 3rem;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-image {
    max-width: 80%;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }

  .button {
    padding: 0.6rem 1.2rem;
  }
}

/* New Carousel Styles */
.carousel-section {
  padding: 2rem 2rem;
  margin: 0 auto;
}

.carousel-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  height: 400px;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  z-index: 2;
}

.carousel-button:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.8);
}

.carousel-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel-button.prev {
  left: 1rem;
}

.carousel-button.next {
  right: 1rem;
}

.carousel-dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 2;
}

.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.carousel-dot.active {
  background: white;
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .carousel-slide {
    height: 300px;
  }
  
  .carousel-button {
    width: 30px;
    height: 30px;
    font-size: 1rem;
  }
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

// Carousel data and state
const currentSlide = ref(0)
const isTransitioning = ref(false)
const autoplayInterval = ref(null)

// Navigation functions
const nextSlide = () => {
  if (isTransitioning.value) return
  
  isTransitioning.value = true
  currentSlide.value = (currentSlide.value + 1) % frontmatter.value.images.length
  
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

const prevSlide = () => {
  if (isTransitioning.value) return
  
  isTransitioning.value = true
  currentSlide.value = currentSlide.value === 0 
    ? frontmatter.value.images.length - 1 
    : currentSlide.value - 1
    
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

const goToSlide = (index) => {
  if (isTransitioning.value || currentSlide.value === index) return
  
  isTransitioning.value = true
  currentSlide.value = index
  
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

// Autoplay functionality
const startAutoplay = () => {
  autoplayInterval.value = setInterval(nextSlide, 5000)
}

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
    autoplayInterval.value = null
  }
}

// Pause autoplay on hover
const handleMouseEnter = () => stopAutoplay()
const handleMouseLeave = () => startAutoplay()

onMounted(() => {
  startAutoplay()
  
  const carousel = document.querySelector('.carousel-container')
  if (carousel) {
    carousel.addEventListener('mouseenter', handleMouseEnter)
    carousel.addEventListener('mouseleave', handleMouseLeave)
  }
})

onUnmounted(() => {
  stopAutoplay()
  
  const carousel = document.querySelector('.carousel-container')
  if (carousel) {
    carousel.removeEventListener('mouseenter', handleMouseEnter)
    carousel.removeEventListener('mouseleave', handleMouseLeave)
  }
})
</script>