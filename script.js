/* ===========================================
   VIDEOHUT / STORYSTREAM STUDIOS - SCRIPT.JS
   Exact Replica
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Side Menu Toggle ---
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-menu-btn');
    const sideMenu = document.querySelector('.side-menu');
    const sideMenuInner = document.querySelector('.side-menu-inner');

    if (menuBtn && closeBtn && sideMenu && sideMenuInner) {
        menuBtn.addEventListener('click', () => {
            gsap.to(sideMenu, { autoAlpha: 1, duration: 0.5 });
            gsap.to(sideMenuInner, { left: 0, duration: 0.6, ease: "power4.out" });
        });

        closeBtn.addEventListener('click', () => {
            gsap.to(sideMenuInner, { left: '-100%', duration: 0.5, ease: "power4.in" });
            gsap.to(sideMenu, { autoAlpha: 0, duration: 0.5, delay: 0.1 });
        });

        // Close menu when clicking a nav link
        document.querySelectorAll('.side-nav-item').forEach(link => {
            link.addEventListener('click', () => {
                gsap.to(sideMenuInner, { left: '-100%', duration: 0.5, ease: "power4.in" });
                gsap.to(sideMenu, { autoAlpha: 0, duration: 0.5, delay: 0.1 });
            });
        });
    }

    // --- 2. Custom Cursor (Portfolio Section) ---
    const cursor = document.querySelector('.custom-cursor');
    const portfolioSection = document.querySelector('.portfolio-horizontal-wrapper');

    if (cursor) {
        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { x: e.clientX - 60, y: e.clientY - 60, duration: 0.1 });
        });
    }

    if (portfolioSection && cursor) {
        portfolioSection.addEventListener('mouseenter', () => cursor.classList.add('active'));
        portfolioSection.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    }

    // --- 3. Blog Cursor ---
    const blogCursor = document.querySelector('.blog-cursor');
    const blogsSection = document.querySelector('.blogs-section');

    if (blogCursor) {
        window.addEventListener('mousemove', (e) => {
            gsap.to(blogCursor, { x: e.clientX - 60, y: e.clientY - 60, duration: 0.1 });
        });
    }

    if (blogsSection && blogCursor) {
        blogsSection.addEventListener('mouseenter', () => blogCursor.classList.add('active'));
        blogsSection.addEventListener('mouseleave', () => blogCursor.classList.remove('active'));
    }

    // --- 4. Hero Animations ---
    gsap.to('.header-left', { opacity: 1, duration: 1, delay: 0.5 });
    gsap.to('.header-right', { opacity: 1, duration: 1, delay: 0.7 });

    // --- 5. GSAP ScrollTrigger Registration ---
    gsap.registerPlugin(ScrollTrigger);

    // --- 6. Showreel Pinning & Scaling ---
    const showreelSection = document.querySelector('.showreel-section');
    if (showreelSection) {
        const showreelTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.showreel-section',
                start: 'top top',
                end: '+=150%',
                pin: true,
                scrub: 1,
            }
        });

        showreelTl.to('.video-wrapper', {
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
            borderRadius: 0,
            duration: 2
        }, 'start')
            .to('.showreel-text', {
                scale: 4,
                opacity: 0,
                duration: 2
            }, 'start');
    }

    // --- 7. Horizontal Portfolio Scroll ---
    const portfolioTrack = document.querySelector('.portfolio-track');
    if (portfolioTrack) {
        gsap.to(portfolioTrack, {
            x: () => -(portfolioTrack.scrollWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: '.portfolio-section',
                start: 'top top',
                end: () => `+=${portfolioTrack.scrollWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });
    }

    // --- 8. Services Hover Image Reveal ---
    const serviceCards = document.querySelectorAll('.service-card');
    const revealImg = document.querySelector('.hover-reveal-img');

    if (revealImg) {
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const imgUrl = card.getAttribute('data-image');
                revealImg.style.backgroundImage = `url(${imgUrl})`;
                gsap.to(revealImg, { opacity: 1, scale: 1, duration: 0.3 });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(revealImg, { opacity: 0, scale: 0.8, duration: 0.3 });
            });

            card.addEventListener('mousemove', (e) => {
                gsap.to(revealImg, { x: e.clientX + 20, y: e.clientY - 150, duration: 0.1 });
            });
        });
    }

    // --- 9. Industries Hover Setup ---
    const industryCards = document.querySelectorAll('.industry-card');
    industryCards.forEach(card => {
        const bgImg = card.getAttribute('data-bg');
        if (bgImg) {
            card.style.setProperty('--bg-src', `url("${bgImg}")`);
        }
    });

    // --- 10. Scroll-triggered fade-in animations ---
    const fadeElements = document.querySelectorAll(
        '.brands-section, .services-section, .industries-section, .about-agency-section, .testimonials-section, .blogs-section, .marquee-section'
    );

    fadeElements.forEach(el => {
        gsap.from(el, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        });
    });

    // --- 11. Stats counter animation ---
    const statNumbers = document.querySelectorAll('.stat-bg-number');
    statNumbers.forEach(stat => {
        gsap.from(stat, {
            opacity: 0,
            scale: 0.5,
            duration: 1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        });
    });

    // --- 12. Project Modal System ---
    const projectData = {
        skillswap: {
            title: 'Skill Swap',
            subtitle: 'Full-Stack Web Application',
            image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200&auto=format&fit=crop',
            tech: ['Python', 'Flask', 'Pandas', 'NumPy', 'JavaScript', 'HTML', 'CSS', 'PostgreSQL'],
            highlights: [
                'Developed a full-stack web application using HTML, CSS, and JavaScript for the frontend and Flask (Python) for the backend.',
                'Integrated PostgreSQL for efficient data management, including user profiles and skill listings.',
                'Built and connected RESTful APIs for authentication, skill sharing, and user interactions.',
                'Implemented real-time chat, video conferencing, and community forums to enhance collaborative learning experiences.'
            ]
        },
        retinopathy: {
            title: 'Diabetic Retinopathy AI',
            subtitle: 'Deep Learning & Explainable AI',
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop',
            tech: ['TensorFlow', 'Keras', 'OpenCV', 'Scikit-learn', 'Python', 'Cloud Deployment'],
            highlights: [
                'Developed a deep learning model (CNN) for automated detection of diabetic retinopathy from retinal fundus images.',
                'Applied Explainable AI (XAI) techniques (e.g., Grad-CAM, LIME, SHAP) to improve transparency and interpretability of predictions.',
                'Implemented data preprocessing and augmentation (rotation, flips, brightness adjustment) to improve generalization.'
            ]
        },
        data: {
            title: 'Data-Driven Insights',
            subtitle: 'Data Analysis & Visualization',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
            tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'MySQL'],
            highlights: [
                'Performed exploratory data analysis (EDA) on structured datasets to uncover trends and patterns.',
                'Built data pipelines using Pandas and NumPy for cleaning, transforming, and aggregating data.',
                'Applied statistical modeling and machine learning techniques for predictive analytics.',
                'Utilized MySQL and DBMS concepts for efficient data storage and retrieval.'
            ]
        },
        api: {
            title: 'RESTful APIs',
            subtitle: 'Backend Development',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
            tech: ['Python', 'Flask', 'PostgreSQL', 'RESTful APIs', 'Git'],
            highlights: [
                'Designed and implemented RESTful API endpoints for user authentication, data retrieval, and resource management.',
                'Built scalable backend architectures using Flask with proper routing, middleware, and error handling.',
                'Integrated PostgreSQL databases with ORM patterns for efficient data operations.',
                'Implemented Git version control for collaborative development workflows.'
            ]
        }
    };

    const modal = document.getElementById('projectModal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalTech = document.getElementById('modalTech');
    const modalHighlights = document.getElementById('modalHighlights');

    function openProjectModal(projectKey) {
        const project = projectData[projectKey];
        if (!project || !modal) return;

        // Populate modal
        modalImage.src = project.image;
        modalImage.alt = project.title;
        modalTitle.textContent = project.title;
        modalSubtitle.textContent = project.subtitle;

        // Populate tech tags
        modalTech.innerHTML = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

        // Populate highlights
        modalHighlights.innerHTML = project.highlights.map(h => `<li>${h}</li>`).join('');

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Attach click to portfolio items
    document.querySelectorAll('.portfolio-item[data-project]').forEach(item => {
        item.addEventListener('click', () => {
            const key = item.getAttribute('data-project');
            openProjectModal(key);
        });
        item.style.cursor = 'pointer';
    });

    // Close modal events
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
            if (typeof closeCertModal === 'function') closeCertModal();
        }
    });

    // --- 13. Certificate Modal (opens from Education card) ---
    const certCard = document.getElementById('certCard');
    const certModal = document.getElementById('certModal');
    const certModalClose = document.querySelector('.cert-modal-close');
    const certModalBackdrop = document.querySelector('.cert-modal-backdrop');

    function openCertModal() {
        if (!certModal) return;
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCertModal() {
        if (!certModal) return;
        certModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (certCard) certCard.addEventListener('click', openCertModal);
    if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
    if (certModalBackdrop) certModalBackdrop.addEventListener('click', closeCertModal);
});
