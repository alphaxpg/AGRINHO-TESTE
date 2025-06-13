// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('shadow-lg');
        navbar.classList.remove('py-3');
        navbar.classList.add('py-2');
    } else {
        navbar.classList.remove('shadow-lg');
        navbar.classList.remove('py-2');
        navbar.classList.add('py-3');
    }
});

// Contact Form
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    successModal.classList.remove('hidden');
    contactForm.reset();
});

closeModal.addEventListener('click', () => {
    successModal.classList.add('hidden');
});

// Accessibility Features
const contrastBtn = document.getElementById('contrastBtn');
const fontSizeBtn = document.getElementById('fontSizeBtn');

contrastBtn.addEventListener('click', () => {
    document.body.classList.toggle('bg-black');
    document.body.classList.toggle('text-white');
});

fontSizeBtn.addEventListener('click', () => {
    const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    document.documentElement.style.fontSize = (currentSize + 1) + 'px';
});

// Quiz Functionality
const quizQuestions = [
    {
        question: "Qual é a principal causa de perda de alimentos no transporte?",
        options: ["Má qualidade dos produtos", "Falta de infraestrutura adequada", "Excesso de intermediários", "Todos os acima"],
        answer: 3
    },
    {
        question: "Que porcentagem dos alimentos frescos no Brasil vem da agricultura familiar?",
        options: ["30%", "50%", "70%", "90%"],
        answer: 2
    },
    {
        question: "Qual é a distância média que os alimentos percorrem do campo à cidade no Brasil?",
        options: ["50km", "150km", "300km", "500km"],
        answer: 2
    },
    {
        question: "O que ajuda a reduzir drasticamente o desperdício de alimentos?",
        options: ["Comprar diretamente do produtor", "Armazenamento adequado", "Transporte refrigerado", "Todas as alternativas"],
        answer: 3
    },
    {
        question: "Quanto tempo em média os alimentos levam entre a colheita e o consumo nas cidades?",
        options: ["1-2 dias", "3-4 dias", "5-7 dias", "Mais de 10 dias"],
        answer: 2
    }
];

let currentQuestion = 0;
const quizContainer = document.getElementById('quizContainer');
const quizQuestion = document.getElementById('quizQuestion');
const quizProgress = document.getElementById('quizProgress');
const nextQuestionBtn = document.getElementById('nextQuestion');

function showQuestion(questionIndex) {
    const question = quizQuestions[questionIndex];
    let optionsHTML = '';

    question.options.forEach((option, index) => {
        optionsHTML += `<button class="quiz-option bg-white p-4 rounded-lg border border-gray-200 text-left hover:border-primary transition" data-index="${index}">${option}</button>`;
    });

    quizQuestion.innerHTML = `
        <h3 class="text-xl font-bold text-primary mb-4">${questionIndex + 1}. ${question.question}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${optionsHTML}</div>
    `;

    quizProgress.textContent = `Pergunta ${questionIndex + 1} de ${quizQuestions.length}`;

    // Reset next button if it's the last question
    if (questionIndex === quizQuestions.length - 1) {
        nextQuestionBtn.textContent = "Ver Resultado";
    } else {
        nextQuestionBtn.textContent = "Próxima";
    }

    // Add event listeners to options
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove all selections
            document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('border-primary', 'bg-light');
            });

            // Select clicked option
            this.classList.add('border-primary', 'bg-light');

            // Store selected answer
            currentSelected = parseInt(this.getAttribute('data-index'));
        });
    });
}

showQuestion(0);

nextQuestionBtn.addEventListener('click', function() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    } else {
        // Show results (simplified version)
        alert('Quiz completado! Obrigado por testar seus conhecimentos sobre a jornada dos alimentos.');
        currentQuestion = 0;
        showQuestion(currentQuestion);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});