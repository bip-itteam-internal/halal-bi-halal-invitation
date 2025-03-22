
const urlParams = new URLSearchParams(window.location.search);
const toValue = urlParams.get('to');
if (toValue) {
    document.getElementById('recipient').textContent = decodeURIComponent(toValue);
}else{
    document.getElementById('recipient').textContent = 'Kepada Winning Team Bharata';
}

document.addEventListener("DOMContentLoaded", () => {
	const openInvitationBtn = document.getElementById("open-invitation")
	const muteButton = document.getElementById('muteButton');
	const volumeIcon = document.getElementById('volumeIcon');
	const backgroundMusic = document.getElementById('backgroundMusic');
	const audioControl = document.getElementById('audio-control');
	const coverSection = document.getElementById("cover");
	const mainContent = document.getElementById("main-content");
	const navigation = document.getElementById("navigation");
	const sections = document.querySelectorAll(".section");
	const navButtons = document.querySelectorAll(".nav-btn");
	const confettiContainer = document.getElementById("confetti-container");
	function createConfetti() {
        const colors = ['#ffc107', '#4CAF50', '#9C27B0', '#FF9800', '#2196F3'];
        const shapes = ['square', 'circle', 'diamond', 'star'];
        
        for (let i = 0; i < 300; i++) {
          const confetti = document.createElement('div');
          confetti.classList.add('confetti');
          
          const shapeIndex = Math.floor(Math.random() * shapes.length);
          const shape = shapes[shapeIndex];
          confetti.classList.add(shape);
          
          if (shape === 'diamond') {
            confetti.style.backgroundColor = '#4CAF50'; 
          } else if (shape === 'star') {
            confetti.style.backgroundColor = '#ffc107'; 
          } else {
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          }
          
          // Position and size
          confetti.style.left = Math.random() * 100 + 'vw';
          confetti.style.top = -20 + 'px';
          
          let rotation = Math.random() * 360;
          if (shape === 'diamond') {
            rotation += 45;
          }
          confetti.style.transform = 'rotate(' + rotation + 'deg)';
          
          let size = Math.random() * 10 + 5;
          if (shape === 'star') {
            size = Math.random() * 12 + 8; 
          }
          confetti.style.width = size + 'px';
          confetti.style.height = size + 'px';
          
          confettiContainer.appendChild(confetti);
          
          const duration = Math.random() * 3 + 2;
          const delay = Math.random() * 5;
          confetti.style.animation = `
            confettiFall ${duration}s ease-in ${delay}s forwards,
            confettiSway ${duration * 0.5}s ease-in-out ${delay}s alternate infinite
          `;
        }
      }
	// Confetti animations
	const style = document.createElement('style');
	style.innerHTML = `
        @keyframes confettiFall {
        0% {
            opacity: 1;
            top: -20px;
        }
        80% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            top: 100vh;
        }
        }
        
        @keyframes confettiSway {
        0% {
            transform: translateX(-10px) rotate(0deg);
        }
        100% {
            transform: translateX(10px) rotate(360deg);
        }
        }
    `;
	document.head.appendChild(style);
	initCoverAnimations();
	openInvitationBtn.addEventListener("click", function() {
		// Play Music
		audioControl.classList.remove('hidden');
		if (backgroundMusic) {
			backgroundMusic.volume = 0.5;
			backgroundMusic.play().catch(error => console.log("Audio playback error:", error));
		}
		muteButton.addEventListener('click', function() {
			if (backgroundMusic.paused) {
				backgroundMusic.play();
				volumeIcon.classList.remove('fa-volume-mute');
				volumeIcon.classList.add('fa-volume-up');
			} else {
				backgroundMusic.pause();
				volumeIcon.classList.remove('fa-volume-up');
				volumeIcon.classList.add('fa-volume-mute');
			}
		})

		createConfetti();
		
		coverSection.classList.remove("active");
		coverSection.style.display = "none";
		mainContent.classList.remove("d-none");
		navigation.classList.remove("d-none");
		sections.forEach(section => {
			if (section.id !== 'cover') {
				section.classList.add('active');
				section.style.opacity = 1;
			}
		});
		document.querySelector('[data-section="quote"]').classList.add("active");
		document.getElementById('quote').scrollIntoView({
			behavior: 'smooth'
		});
		initContentAnimations();
	});
	navButtons.forEach(button => {
		button.addEventListener("click", function(e) {
			e.preventDefault();
			if (this.getAttribute('data-section') === null) {
                location.reload();
                return;
			}
			const sectionId = this.getAttribute('data-section');
			navButtons.forEach(btn => btn.classList.remove('active'));
			this.classList.add('active');
			document.getElementById(sectionId).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});
	window.addEventListener('scroll', function() {
		if (mainContent.classList.contains('d-none')) return;
		let currentSection = '';
		let minDistance = Infinity;
		sections.forEach(section => {
			if (section.id === 'cover') return;
			const rect = section.getBoundingClientRect();
			const distance = Math.abs(rect.top);
			if (distance < minDistance) {
				minDistance = distance;
				currentSection = section.getAttribute('id');
			}
		});
		if (currentSection) {
			navButtons.forEach(button => {
				button.classList.remove('active');
				if (button.getAttribute('data-section') === currentSection) {
					button.classList.add('active');
				}
			});
		}
	});
	window.addEventListener('scroll', function() {
		clearTimeout(window.scrollEndTimer);
		window.scrollEndTimer = setTimeout(function() {
			let currentSection = '';
			let maxVisibility = 0;
			sections.forEach(section => {
				if (section.id === 'cover') return;
				const rect = section.getBoundingClientRect();
				const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
				const visibleHeight = Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0);
				const visibility = visibleHeight / viewHeight;
				if (visibility > maxVisibility) {
					maxVisibility = visibility;
					currentSection = section.getAttribute('id');
				}
			});
			if (currentSection) {
				navButtons.forEach(button => {
					button.classList.remove('active');
					if (button.getAttribute('data-section') === currentSection) {
						button.classList.add('active');
					}
				});
			}
		}, 100);
	});
	function initCoverAnimations() {
		const coverElements = coverSection.querySelectorAll('.fade-in');
		coverElements.forEach((el, index) => {
			setTimeout(() => {
				el.style.opacity = 1;
				el.style.transform = 'translateY(0)';
			}, index * 200);
		});
	}
	function initContentAnimations() {
		sections.forEach(section => {
			if (section.id === 'cover') return;
			const fadeElements = section.querySelectorAll('.fade-in');
			fadeElements.forEach((el, index) => {
				const observer = new IntersectionObserver((entries) => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							setTimeout(() => {
								el.style.opacity = 1;
								el.style.transform = 'translateY(0)';
							}, index * 200);
							observer.unobserve(el);
						}
					});
				}, {
					threshold: 0.1
				});
				observer.observe(el);
			});
		});
	}
	// Pagination
	const itemsPerPage = 5;
	const rundownItems = document.querySelectorAll('.rundown-item');
	const totalItems = rundownItems.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const prevPageBtn = document.getElementById('prev-page');
	const nextPageBtn = document.getElementById('next-page');
	const currentPageEl = document.getElementById('current-page');
	const totalPagesEl = document.getElementById('total-pages');
	totalPagesEl.textContent = totalPages;
	let currentPage = 1;
	function initPagination() {
		showPage(currentPage);
		updatePaginationControls();
	}
	function showPage(page) {
		rundownItems.forEach(item => {
			item.classList.remove('active');
		});
		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);
		for (let i = startIndex; i <= endIndex; i++) {
			rundownItems[i].classList.add('active');
		}
		currentPageEl.textContent = page;
	}
	function updatePaginationControls() {
		prevPageBtn.disabled = currentPage === 1;
		nextPageBtn.disabled = currentPage === totalPages;
	}
	prevPageBtn.addEventListener('click', function() {
		if (currentPage > 1) {
			currentPage--;
			showPage(currentPage);
			updatePaginationControls();
		}
	});
	nextPageBtn.addEventListener('click', function() {
		if (currentPage < totalPages) {
			currentPage++;
			showPage(currentPage);
			updatePaginationControls();
		}
	});
	initPagination();
});