document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".section");
    let currentSection = 0;
  
    // Affiche la première section au démarrage
    sections[currentSection].classList.add("active");
  
    // Fonction pour afficher la section suivante
    function showNextSection() {
      sections[currentSection].classList.remove("active");
      currentSection++;
      if (currentSection < sections.length) {
        sections[currentSection].classList.add("active");
      }
    }
  
    // Gérer les boutons "Suivant"
    document.getElementById("suivant1").addEventListener("click", showNextSection);
    document.getElementById("suivant2").addEventListener("click", showNextSection);
  });
  
 
  
  