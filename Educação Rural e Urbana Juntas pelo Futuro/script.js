// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Back to top button
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

// High contrast toggle
const contrastBtn = document.getElementById('contrastBtn');

contrastBtn.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
    const isHighContrast = document.body.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isHighContrast);
});

// Check for high contrast preference in localStorage on page load
if (localStorage.getItem('highContrast') === 'true') {
    document.body.classList.add('high-contrast');
}

// Font size toggle
const fontSizeBtn = document.getElementById('fontSizeBtn');
let fontSizeIncreased = localStorage.getItem('fontSizeIncreased') === 'true';

// Apply stored font size preference on load
if (fontSizeIncreased) {
    document.documentElement.style.fontSize = '110%';
}

fontSizeBtn.addEventListener('click', () => {
    fontSizeIncreased = !fontSizeIncreased;
    if (fontSizeIncreased) {
        document.documentElement.style.fontSize = '110%';
    } else {
        document.documentElement.style.fontSize = '100%';
    }
    localStorage.setItem('fontSizeIncreased', fontSizeIncreased);
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would normally send the form data to a server
    // For demo purposes, we'll just show the success modal
    successModal.classList.remove('hidden');
    contactForm.reset();
});

closeModal.addEventListener('click', () => {
    successModal.classList.add('hidden');
});

// Quiz functionality (simplified)
const quizOptions = document.querySelectorAll('.quiz-option');
const nextButton = document.getElementById('nextQuestion');
const quizProgressSpan = document.getElementById('quizProgress');
let currentQuestionIndex = 0; // Use index to match array
const quizQuestions = [
    {
        question: "1. Qual a porcentagem das escolas brasileiras está localizada em áreas rurais?",
        options: [
            "Aproximadamente 15%",
            "Aproximadamente 25%",
            "Aproximadamente 35%",
            "Aproximadamente 45%"
        ],
        correct: 2 // Assuming "Aproximadamente 35%" is the correct answer based on common knowledge
    },
    // Add more questions here if needed for a full quiz
    {
        question: "2. Qual o principal desafio da educação rural?",
        options: [
            "Falta de professores",
            "Acesso à internet",
            "Distância de casa",
            "Conteúdo desatualizado"
        ],
        correct: 1 // Assuming "Acesso à internet" is a common significant challenge
    },
    {
        question: "3. O que a educação urbana pode aprender com a rural?",
        options: [
            "Agroecologia",
            "Valorização do meio ambiente",
            "Comunidade e cooperação",
            "Todas as alternativas"
        ],
        correct: 3 // All alternatives are valid points
    },
    {
        question: "4. Qual a importância do intercâmbio entre escolas rurais e urbanas?",
        options: [
            "Troca de experiências",
            "Redução de preconceitos",
            "Ampliação de horizontes",
            "Todas as alternativas"
        ],
        correct: 3 // All alternatives are valid points
    },
    {
        question: "5. Como a tecnologia pode apoiar a educação rural?",
        options: [
            "Melhorando a infraestrutura",
            "Oferecendo cursos online",
            "Conectando com o mundo",
            "Todas as alternativas"
        ],
        correct: 3 // All alternatives are valid points
    }
];

function loadQuizQuestion(index) {
    const questionData = quizQuestions[index];
    document.getElementById('quizQuestion').innerHTML = `
        <h3 class="text-xl font-bold text-primary mb-4">${questionData.question}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${questionData.options.map((option, i) => `
                <button class="quiz-option bg-white p-4 rounded-lg border border-gray-200 text-left hover:border-primary transition" data-index="${i}">${option}</button>
            `).join('')}
        </div>
    `;
    quizProgressSpan.textContent = `Pergunta ${index + 1} de ${quizQuestions.length}`;
    
    // Re-attach event listeners to new buttons
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('bg-primary', 'text-white');
                opt.classList.add('bg-white');
            });
            this.classList.remove('bg-white');
            this.classList.add('bg-primary', 'text-white');
        });
    });

    if (index === quizQuestions.length - 1) {
        nextButton.textContent = "Ver Resultados";
    } else {
        nextButton.textContent = "Próxima";
    }
}

// Initial quiz load
loadQuizQuestion(currentQuestionIndex);

nextButton.addEventListener('click', function() {
    const selectedOption = document.querySelector('.quiz-option.bg-primary');
    if (!selectedOption) {
        alert("Por favor, selecione uma opção antes de continuar.");
        return;
    }

    // In a real quiz, you'd check if the selected answer is correct here
    // For this example, we'll just advance the question

    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuizQuestion(currentQuestionIndex);
    } else {
        alert('Quiz concluído! Obrigado por participar.'); // Or show actual results
        // Optionally reset quiz or redirect
        document.getElementById('quizContainer').innerHTML = `
            <div class="text-center py-8">
                <h3 class="text-2xl font-bold text-primary mb-4">Quiz Concluído!</h3>
                <p class="text-gray-600 mb-6">Obrigado por participar. Para refazer o quiz, recarregue a página.</p>
                <button class="bg-primary hover:bg-dark text-white font-bold py-2 px-6 rounded-full transition" onclick="location.reload()">Refazer Quiz</button>
            </div>
        `;
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed navbar
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});