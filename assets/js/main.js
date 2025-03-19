document.addEventListener("DOMContentLoaded", () => {
  const openInvitationBtn = document.getElementById("open-invitation");
  const coverSection = document.getElementById("cover");
  const mainContent = document.getElementById("main-content");
  const navigation = document.getElementById("navigation");
  const sections = document.querySelectorAll(".section");
  const navButtons = document.querySelectorAll(".nav-btn");

  // Initialize cover animations immediately
  initCoverAnimations();

  // Open invitation button click handler
  openInvitationBtn.addEventListener("click", () => {
      // Hide cover section
      coverSection.classList.remove("active");
      coverSection.style.display = "none";

      // Show main content
      mainContent.classList.remove("d-none");
      navigation.classList.remove("d-none");

      // Show all sections
      sections.forEach((section) => {
          if (section.id !== "cover") {
              section.classList.add("active");
              section.style.opacity = 1;
          }
      });

      // Add active class to first nav button
      document.querySelector('[data-section="quote"]').classList.add("active");

      // Scroll to quote section
      document.getElementById("quote").scrollIntoView({ behavior: "smooth" });

      // Initialize animations for content sections
      initContentAnimations();
  });

  // Navigation buttons click handler
  navButtons.forEach((button) => {
      button.addEventListener("click", function () {
          const sectionId = this.getAttribute("data-section");

          // Remove active class from all buttons
          navButtons.forEach((btn) => btn.classList.remove("active"));

          // Add active class to clicked button
          this.classList.add("active");

          // Scroll to the section
          document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
      });
  });

  // Add scroll event listener to handle section visibility and update active nav button
  window.addEventListener("scroll", () => {
      if (mainContent.classList.contains("d-none")) return;

      let currentSection = "";
      let minDistance = Number.POSITIVE_INFINITY;

      // Find which section is closest to the top of the viewport
      sections.forEach((section) => {
          if (section.id === "cover") return;

          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top);

          if (distance < minDistance) {
              minDistance = distance;
              currentSection = section.getAttribute("id");
          }
      });

      if (currentSection) {
          // Update active nav button
          navButtons.forEach((button) => {
              button.classList.remove("active");
              if (button.getAttribute("data-section") === currentSection) {
                  button.classList.add("active");
              }
          });
      }
  });

  // Initialize animations for cover section
  function initCoverAnimations() {
      const coverElements = coverSection.querySelectorAll(".fade-in");
      coverElements.forEach((el, index) => {
          setTimeout(() => {
              el.style.opacity = 1;
              el.style.transform = "translateY(0)";
          }, index * 200);
      });
  }

  // Initialize animations for content sections
  function initContentAnimations() {
      sections.forEach((section) => {
          if (section.id === "cover") return;

          const fadeElements = section.querySelectorAll(".fade-in");
          fadeElements.forEach((el, index) => {
              // Create an Intersection Observer to trigger animations when elements come into view
              const observer = new IntersectionObserver(
                  (entries) => {
                      entries.forEach((entry) => {
                          if (entry.isIntersecting) {
                              setTimeout(() => {
                                  el.style.opacity = 1;
                                  el.style.transform = "translateY(0)";
                              }, index * 200);
                              observer.unobserve(el);
                          }
                      });
                  },
                  { threshold: 0.1 }
              );

              observer.observe(el);
          });
      });
  }
});