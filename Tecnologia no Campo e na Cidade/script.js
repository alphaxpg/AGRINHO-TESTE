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
        backToTopButton.classList.add('opacity-100');
        backToTopButton.classList.remove('opacity-0');
    } else {
        backToTopButton.classList.add('opacity-0');
        backToTopButton.classList.remove('opacity-100');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Accessibility Features
const contrastBtn = document.getElementById('contrastBtn');
const fontSizeBtn = document.getElementById('fontSizeBtn');

contrastBtn.addEventListener('click', () => {
    document.body.classList.toggle('bg-gray-900');
    document.body.classList.toggle('text-white');

    const sections = document.querySelectorAll('section, div, nav');
    sections.forEach(section => {
        section.classList.toggle('bg-gray-800');
        section.classList.toggle('text-white');
    });
});

let fontSize = 1;
fontSizeBtn.addEventListener('click', () => {
    fontSize += 0.1;
    if (fontSize > 1.5) fontSize = 1;
    document.body.style.fontSize = `${fontSize}rem`;
});

// Quiz functionality
const quizQuestions = [
    {
        question: "Qual tecnologia permite o monitoramento preciso de plantações usando imagens aéreas?",
        options: [
            "Sensores de Solo",
            "Drones Agrícolas",
            "Robôs de Colheita",
            "Irrigação por Gotejamento"
        ],
        correct: 1
    },
    {
        question: "O que significa IoT no contexto da agricultura?",
        options: [
            "Internet of Tractors",
            "Internet of Things",
            "Integrated Operation Technology",
            "International Organic Trade"
        ],
        correct: 1
    },
    {
        question: "Qual destes NÃO é um benefício da agricultura de precisão?",
        options: [
            "Redução do uso de água",
            "Aumento do uso de agrotóxicos",
            "Otimização de insumos",
            "Monitoramento em tempo real"
        ],
        correct: 1
    },
    {
        question: "Qual tecnologia urbana pode ajudar na distribuição de alimentos do campo?",
        options: [
            "Plataformas de delivery",
            "Câmeras de vigilância",
            "Sistemas de transporte público",
            "Todas as alternativas"
        ],
        correct: 3
    },
    {
        question: "O que o blockchain pode proporcionar na cadeia alimentar?",
        options: [
            "Rastreabilidade completa",
            "Pagamentos mais rápidos",
            "Contratos digitais",
            "Todas as alternativas"
        ],
        correct: 3
    }
];

const quizContainer = document.getElementById('quizContainer');
const quizQuestion = document.getElementById('quizQuestion');
const quizProgress = document.getElementById('quizProgress');
const nextQuestionBtn = document.getElementById('nextQuestion');

let currentQuestion = 0;
let score = 0;

function loadQuestion(index) {
    const question = quizQuestions[index];
    quizQuestion.innerHTML = `
        <h3 class="text-xl font-bold text-primary mb-4">${index + 1}. ${question.question}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${question.options.map((option, i) => `
                <button class="quiz-option bg-white p-4 rounded-lg border border-gray-200 text-left hover:border-primary transition" 
                        data-index="${i}">${option}</button>
            `).join('')}
        </div>
    `;
    
    quizProgress.textContent = `Pergunta ${index + 1} de ${quizQuestions.length}`;
    
    if (index === quizQuestions.length - 1) {
        nextQuestionBtn.textContent = 'Finalizar';
    } else {
        nextQuestionBtn.textContent = 'Próxima';
    }
    
    const options = quizQuestion.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(opt => opt.classList.remove('bg-secondary', 'text-white'));
            option.classList.add('bg-secondary', 'text-white');
        });
    });
}

loadQuestion(0);

nextQuestionBtn.addEventListener('click', () => {
    const selectedOption = quizQuestion.querySelector('.quiz-option.bg-secondary');
    
    if (selectedOption) {
        const selectedIndex = parseInt(selectedOption.dataset.index);
        if (selectedIndex === quizQuestions[currentQuestion].correct) {
            score++;
        }
        
        currentQuestion++;
        
        if (currentQuestion < quizQuestions.length) {
            loadQuestion(currentQuestion);
        } else {
            quizContainer.innerHTML = `
                <div class="text-center py-8">
                    <h3 class="text-2xl font-bold text-primary mb-4">Quiz Finalizado!</h3>
                    <p class="text-gray-600 mb-6">Você acertou ${score} de ${quizQuestions.length} perguntas.</p>
                    <button class="bg-primary hover:bg-dark text-white font-bold py-2 px-6 rounded-full transition" 
                            onclick="location.reload()">Refazer Quiz</button>
                </div>
            `;
        }
    } else {
        alert('Por favor, selecione uma opção antes de continuar.');
    }
});