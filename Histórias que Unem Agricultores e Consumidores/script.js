// Funções de acessibilidade
document.getElementById('contrastBtn').addEventListener('click', function() {
    document.body.classList.toggle('high-contrast');
    // Alterar ícone do botão de contraste
    const icon = this.querySelector('i');
    if (document.body.classList.contains('high-contrast')) {
        icon.classList.replace('fa-adjust', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-adjust');
    }
});

document.getElementById('fontSizeBtn').addEventListener('click', function() {
    const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const newSize = currentSize === 16 ? 20 : 16; // Alterna entre 16px e 20px
    document.documentElement.style.fontSize = newSize + 'px';
    
    // Alterar ícone do botão de tamanho da fonte
    const icon = this.querySelector('i');
    if (newSize === 20) {
        icon.classList.replace('fa-text-height', 'fa-text-width');
    } else {
        icon.classList.replace('fa-text-width', 'fa-text-height');
    }
});

// Menu mobile
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
});

// Scroll suave para links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Ajuste para o menu fixo
                behavior: 'smooth'
            });
            
            // Fechar menu mobile se aberto
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Botão voltar ao topo
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Quiz
const quizQuestions = [
    {
        question: "1. Qual porcentagem dos agricultores familiares no Brasil são responsáveis pela maior parte dos alimentos que consumimos?",
        options: ["Aproximadamente 30%", "Aproximadamente 50%", "Aproximadamente 70%", "Aproximadamente 90%"],
        correctAnswer: 2 // Corrigido para o índice da resposta correta (0-indexed)
    },
    {
        question: "2. Em média, quantos quilômetros um alimento percorre do campo até chegar na cidade grande no Brasil?",
        options: ["50-100km", "200-300km", "500-600km", "800-1000km"],
        correctAnswer: 1 // Corrigido para o índice da resposta correta (0-indexed)
    },
    {
        question: "3. Qual destes alimentos NÃO está entre os principais produzidos por agricultores familiares no Brasil?",
        options: ["Feijão", "Café", "Laranja", "Cacau"],
        correctAnswer: 3 // Corrigido para o índice da resposta correta (0-indexed)
    },
    {
        question: "4. Quantas famílias agrícolas existem no Brasil aproximadamente?",
        options: ["500 mil", "1 milhão", "3 milhões", "5,5 milhões"],
        correctAnswer: 3 // Corrigido para o índice da resposta correta (0-indexed)
    },
    {
        question: "5. Qual destas NÃO é uma vantagem da agricultura familiar para o meio ambiente?",
        options: ["Menor uso de agrotóxicos", "Maior diversidade de cultivos", "Uso intensivo de máquinas agrícolas", "Práticas mais sustentáveis"],
        correctAnswer: 2 // Corrigido para o índice da resposta correta (0-indexed)
    }
];

const quizContainer = document.getElementById('quizContainer');
const quizQuestion = document.getElementById('quizQuestion');
const quizProgress = document.getElementById('quizProgress');
const nextQuestionButton = document.getElementById('nextQuestion');

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerIndex = null; // Renomeado para evitar conflito

function loadQuestion(questionIndex) {
    const question = quizQuestions[questionIndex];
    quizQuestion.innerHTML = `
        <h3 class="text-xl font-bold text-green-600 mb-4">${question.question}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${question.options.map((option, index) => `
                <button class="quiz-option bg-white p-4 rounded-lg border border-gray-200 text-left hover:border-green-600 transition"
                    data-answer-index="${index}">${option}</button>
            `).join('')}
        </div>
    `;
    
    quizProgress.textContent = `Pergunta ${questionIndex + 1} de ${quizQuestions.length}`;
    
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', handleAnswerSelection);
        option.classList.remove('bg-green-100', 'border-green-600', 'bg-red-100', 'border-red-400', 'text-white');
    });
    
    // Resetar o texto do botão "Próxima" se não for a última pergunta
    if (questionIndex < quizQuestions.length - 1) {
        nextQuestionButton.textContent = 'Próxima';
    } else {
        nextQuestionButton.textContent = 'Ver Resultado';
    }
    selectedAnswerIndex = null; // Reiniciar a seleção para a nova pergunta
}

function handleAnswerSelection() {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.classList.remove('bg-green-100', 'border-green-600', 'text-white');
    });
    
    this.classList.add('bg-green-100', 'border-green-600', 'text-white');
    selectedAnswerIndex = parseInt(this.getAttribute('data-answer-index'));
}

nextQuestionButton.addEventListener('click', function() {
    if (selectedAnswerIndex === null) {
        alert('Por favor, selecione uma resposta antes de prosseguir.');
        return;
    }
    
    // Verificar se a resposta está correta
    if (selectedAnswerIndex === quizQuestions[currentQuestionIndex].correctAnswer) {
        score++;
    }
    
    // Passar para a próxima pergunta ou mostrar o resultado final
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        showQuizResult();
    }
});

function showQuizResult() {
    quizContainer.innerHTML = `
        <div class="text-center">
            <h3 class="text-2xl font-bold text-green-600 mb-4">Quiz Concluído!</h3>
            <p class="text-gray-600 mb-6">Você acertou ${score} de ${quizQuestions.length} perguntas.</p>
            <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition"
                id="restartQuiz">Fazer Novamente</button>
        </div>
    `;
    
    document.getElementById('restartQuiz').addEventListener('click', function() {
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion(0);
    });
}

// Carregar a primeira pergunta ao iniciar
loadQuestion(currentQuestionIndex);

// Formulário de contato
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    successModal.classList.remove('hidden');
    this.reset();
});

closeModal.addEventListener('click', function() {
    successModal.classList.add('hidden');
});

// Efeito de scroll no menu
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
});

// Animar elementos quando aparecem na tela
const animateOnScroll = function() {
    const sections = document.querySelectorAll('section'); // Seleciona todas as seções, ou adicione uma classe específica se preferir
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Adiciona a classe de animação quando a seção está visível na tela
        if (sectionTop < windowHeight - 100) { // Ajuste o '100' conforme a necessidade para a animação começar
            section.querySelectorAll('.animate-slide-up').forEach(el => el.style.animationPlayState = 'running');
        } else {
            // Opcional: Reiniciar a animação se o elemento sair da tela (depende da animação)
            // section.querySelectorAll('.animate-slide-up').forEach(el => el.style.animationPlayState = 'initial');
        }
    });
};

// Disparar a animação ao carregar a página e ao rolar
window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Executar uma vez ao carregar a página