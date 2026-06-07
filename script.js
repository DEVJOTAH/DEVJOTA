// Initialize Lucide icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// ... (Lucide initialization remains at the top)

const translations = {
    PT: {
        nav: ['início', 'social', 'projetos', 'contato'],
        brand: 'DEVJOTA',
        terminal: {
            loading: 'carregando perfil: ',
            status: 'status: ',
            online: 'online',
            whoami: 'whoami',
            about: 'Desenvolvedor Full Stack em constante evolução, especializado na criação de sites, APIs e plataformas web. Transformo ideias em soluções digitais funcionais, combinando desenvolvimento, design e estratégia para construir projetos modernos e eficientes.',
            hint: '[ Dica: Digite \'help\' para ver os comandos disponíveis. ]'
        },
        index: {
            viewProjects: 'Ver Projetos',
            getInTouch: 'Entre em Contato',
            explore: 'Explore meus projetos e veja o que eu tenho feito.',
            talk: 'Vamos conversar! Envie uma mensagem para discutirmos como posso ajudar.',
            btnProjects: '[ VER PROJETOS ]',
            btnContact: '[ ENTRAR EM CONTATO ]'
        },
        projects: {
            security: 'Segurança',
            webTools: 'Ferramentas Web',
            landingPages: 'Landing Pages',
            softwares: 'Softwares',
            dataAnalytics: 'Dados & Análises',
            btnWebsite: 'WEBSITE',
            btnGithub: 'GITHUB',
            descriptions: {
                

                    jonhrest: 'Plataforma criada para simplificar o acesso a APIs, documentação e ferramentas para desenvolvedores. A Jonh-Rest nasceu da ideia de transformar aprendizado e experimentação em soluções reais, reunindo tecnologia, praticidade e inovação em um único ecossistema.',
                    xmlrpc: 'Ferramenta desenvolvida para estudos de segurança, autenticação e protocolos web. Utilizada para pesquisas, auditorias autorizadas e análises controladas de aplicações WordPress.',
                    DEVJOTA: 'Meu espaço na internet. Um lugar onde compartilho projetos, experimentos e ideias, transformando aprendizado, criatividade e tecnologia em soluções reais para a web.'

}
            
        },
        contact: {
            title: 'Entre em Contato',
            labelName: 'Nome:',
            labelEmail: 'Email:',
            labelMessage: 'Mensagem:',
            btnSubmit: 'Enviar'
        }
    },
    EN: {
        nav: ['home', 'social', 'projects', 'contact'],
        brand: 'DEVJOTA',
        terminal: {
            loading: 'loading profile: ',
            status: 'status: ',
            online: 'online',
            whoami: 'whoami',
            about: 'about: Full Stack Developer passionate about building websites, APIs, and web platforms. I turn ideas into real-world digital solutions by combining technology, creativity, and strategy to deliver modern, scalable, and efficient projects.',
            hint: '[ Hint: Type \'help\' to see available commands. ]'
        },
        index: {
            viewProjects: 'View Projects',
            getInTouch: 'Get in Touch',
            explore: 'Explore my projects and see what I have been doing.',
            talk: 'Let\'s talk! Send a message to discuss how I can help.',
            btnProjects: '[ VIEW PROJECTS ]',
            btnContact: '[ GET IN TOUCH ]'
        },
        projects: {
            security: 'Security',
            webTools: 'Web Tools',
            landingPages: 'Landing Pages',
            softwares: 'Softwares',
            dataAnalytics: 'Data & Analytics',
            btnWebsite: 'WEBSITE',
            btnGithub: 'GITHUB',
          descriptions: {

                jonhrest: 'Platform built to simplify access to APIs, documentation, and developer tools. Jonh-Rest was created from the idea of turning learning and experimentation into real solutions, bringing together technology, practicality, and innovation in a single ecosystem.',

                xmlrpc: 'Python-based tool designed for studying WordPress XML-RPC authentication mechanisms and security testing. Built for authorized audits, research, and controlled security assessments.',

                DEVJOTA: 'My personal development hub, where I showcase projects, experiments, and ideas. A space dedicated to building modern web solutions, exploring new technologies, and turning concepts into real-world applications.'

}
        },
        contact: {
            title: 'Get in Touch',
            labelName: 'Name:',
            labelEmail: 'Email:',
            labelMessage: 'Message:',
            btnSubmit: 'Submit'
        }
    }
};

// Language logic
const urlParams = new URLSearchParams(window.location.search);
const langParam = urlParams.get('lang')?.toUpperCase();
let currentLang = (langParam === 'PT' || langParam === 'EN') ? langParam : (localStorage.getItem('preferred-lang') || 'PT');

// Persists if coming from URL
if (langParam) localStorage.setItem('preferred-lang', currentLang);

// Terminal animation logic (simplified to support dynamic re-triggering if needed, but mostly stays the same)
function initTerminal(lang) {
    const t = translations[lang].terminal;

    setTextOrType(document.querySelector('.boot-text[id="text-1"]'), t.loading);
    setTextOrType(document.querySelector('.boot-text[id="text-6"]'), t.status);
    setTextOrType(document.getElementById('status-text'), t.online);

    const whoamiCmd = document.getElementById('whoami-cmd');
    if (whoamiCmd && whoamiCmd.classList.contains('visible')) {
        setTextOrType(whoamiCmd, t.whoami);
    }

    const typedTarget = document.getElementById('typed');
    if (typedTarget && typedTarget.classList.contains('visible')) {
        setTextOrType(typedTarget, '\n' + t.about);
    }
}

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferred-lang', lang);
    if (window.trackEvent) trackEvent("language_change", { metadata: { lang } });
    document.documentElement.lang = currentLang === 'EN' ? 'en' : 'pt-BR';
    const t = translations[lang];

    // Navigation
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach((link, idx) => {
        if (t.nav[idx]) link.textContent = t.nav[idx];
    });

    // Home Page
    const ctaHeads = document.querySelectorAll('.cta-card h2');
    if (ctaHeads.length >= 2) {
        ctaHeads[0].textContent = t.index.viewProjects;
        ctaHeads[1].textContent = t.index.getInTouch;
    }
    const ctaTexts = document.querySelectorAll('.cta-card p');
    if (ctaTexts.length >= 2) {
        ctaTexts[0].textContent = t.index.explore;
        ctaTexts[1].textContent = t.index.talk;
    }
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        if (link.textContent.includes('VER PROJETOS') || link.textContent.includes('VIEW PROJECTS')) {
            link.textContent = t.index.btnProjects;
        }
        if (link.textContent.includes('ENTRAR EM CONTATO') || link.textContent.includes('GET IN TOUCH')) {
            link.textContent = t.index.btnContact;
        }
    });

    // Projects Page — generic data-i18n lookup
    const i18nMap = {
        'cat.softwares': t.projects.softwares,
        'cat.security': t.projects.security,
        'cat.dataAnalytics': t.projects.dataAnalytics,
        'cat.webTools': t.projects.webTools,
        'cat.landingPages': t.projects.landingPages,
        'desc.axion': t.projects.descriptions.axion,
        'desc.animecaos': t.projects.descriptions.animecaos,
        'desc.xmlrpc': t.projects.descriptions.xmlrpc,
        'desc.winopt': t.projects.descriptions.winopt,
        'desc.dashboard': t.projects.descriptions.dashboard,
        'desc.caoshub': t.projects.descriptions.caoshub,
        'desc.studioschulze': t.projects.descriptions.studioschulze
    };
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18nMap[key] !== undefined) el.textContent = i18nMap[key];
    });

    // Contact Page
    const contactTitle = document.querySelector('.contact-title');
    if (contactTitle) contactTitle.textContent = t.contact.title;

    const labels = document.querySelectorAll('.form-group label');
    if (labels.length >= 3) {
        labels[0].textContent = t.contact.labelName;
        labels[1].textContent = t.contact.labelEmail;
        labels[2].textContent = t.contact.labelMessage;
    }
    const btnSubmit = document.querySelector('.btn-submit');
    if (btnSubmit) btnSubmit.textContent = t.contact.btnSubmit;

    // Terminal
    initTerminal(lang);
}

document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Initialize Language Toggle
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        const lang = option.textContent.trim();
        // Sync active class on load
        if (lang === currentLang) option.classList.add('active');
        else option.classList.remove('active');

        option.addEventListener('click', () => {
            if (option.classList.contains('active')) return;
            langOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            updateLanguage(lang);
        });
    });

    // Apply initial language
    updateLanguage(currentLang);

    // Initial Terminal Boot Script (Only runs if elements exist)
    const brandText = document.getElementById('brand-text');
    if (brandText) {
        brandText.innerHTML = '<a href="/" style="text-decoration: none; color: inherit;"></a>';
        const brandLink = brandText.querySelector('a');
        typeText(brandLink, 'DEVJOTA', 100);
    }

    const pre = document.querySelector('.prompt');
    if (pre) {
        playTerminalAnimation();
    }
});

const typeWriterActive = new Map();

function typeText(element, text, speed = 50) {
    return new Promise(resolve => {
        if (typeWriterActive.has(element)) {
            const old = typeWriterActive.get(element);
            clearInterval(old.interval);
            old.resolve();
        }

        element.textContent = '';
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                typeWriterActive.delete(element);
                resolve();
            }
        }, speed);

        typeWriterActive.set(element, { interval, resolve });
    });
}

function setTextOrType(element, text) {
    if (!element) return;
    if (typeWriterActive.has(element)) {
        const old = typeWriterActive.get(element);
        clearInterval(old.interval);
        old.resolve();
        typeWriterActive.delete(element);
    }
    element.textContent = text;
}

async function playTerminalAnimation() {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const pre = document.querySelector('.prompt');
    if (!pre) return;

    await sleep(50);
    const npm1 = document.getElementById('npm-1');
    if (npm1) {
        npm1.classList.add('visible');
        await typeText(npm1, 'npm start', 30);
    }

    await sleep(100);
    const npm2 = document.getElementById('npm-2');
    if (npm2) {
        npm2.textContent = '> portfolio@1.0.0 start';
        npm2.classList.add('visible');
    }

    await sleep(150);
    const npm3 = document.getElementById('npm-3');
    if (npm3) {
        npm3.textContent = '> node server.js';
        npm3.classList.add('visible');
    }

    await sleep(200);

    const bootSequence = ['text-1', 'text-2', 'text-3', 'text-4', 'text-5', 'text-6'];
    const okElements = pre.querySelectorAll('.ok');

    for (let i = 0; i < bootSequence.length; i++) {
        if (okElements[i]) {
            okElements[i].classList.add('visible');
        }
        const textElement = document.getElementById(bootSequence[i]);
        if (textElement) textElement.classList.add('visible');

        if (i === 0) {
            await sleep(50);
            const profileName = document.getElementById('profile-name');
            if (profileName) {
                profileName.textContent = 'Jônatas da silva';
                profileName.classList.add('visible');
            }
        }

        if (i === bootSequence.length - 1) {
            await sleep(50);
            const statusText = document.getElementById('status-text');
            if (statusText) statusText.classList.add('visible');
        }

        await sleep(100);
    }

    await sleep(100);

    const promptLine = document.getElementById('prompt-line');
    if (promptLine) promptLine.classList.add('visible');

    await sleep(100);
    const whoamiCmd = document.getElementById('whoami-cmd');
    if (whoamiCmd) {
        whoamiCmd.classList.add('visible');
        await typeText(whoamiCmd, translations[currentLang].terminal.whoami, 40);
    }

    const blinkCursor = pre.querySelector('.blink');
    if (blinkCursor) blinkCursor.classList.add('visible');

    await sleep(50);
    const typedTarget = document.getElementById('typed');
    if (typedTarget) {
        typedTarget.classList.add('visible');
        await typeText(typedTarget, '\n' + translations[currentLang].terminal.about + '\n', 5);
    }

    await sleep(100);
    const hintTextElement = document.getElementById('hint-text');
    if (hintTextElement) {
        const hintText = translations[currentLang].terminal.hint || "[ Dica: Digite 'help' para ver os comandos disponíveis. ]";
        await typeText(hintTextElement, '\n' + hintText, 10);
    }

    await sleep(50);
    const mainBlink = document.getElementById('main-blink');
    if (mainBlink) {
        mainBlink.style.display = 'none'; // Hide the fake blinker
    }
    const interactiveTerminal = document.getElementById('interactive-terminal');
    const terminalInput = document.getElementById('terminal-input');
    if (interactiveTerminal && terminalInput) {
        interactiveTerminal.classList.remove('hidden');
        terminalInput.focus();
    }
}

// -------------------------------------------------------------
// Interactive Terminal Engine
// -------------------------------------------------------------
const terminalInput = document.getElementById('terminal-input');
const terminalHistory = document.getElementById('terminal-history');

if (terminalInput) {
    // Keep focus on terminal when clicking inside the window
    const terminalWindow = document.querySelector('.terminal');
    if (terminalWindow) {
        terminalWindow.addEventListener('click', () => {
            if (!getSelection().toString()) {
                terminalInput.focus();
            }
        });
    }

    terminalInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const cmd = this.value.trim();
            this.value = '';
            if (cmd !== '') {
                processCommand(cmd);
            }
        }
    });
}

function processCommand(cmd) {
    const args = cmd.split(' ');
    const mainCmd = args[0].toLowerCase();

    // Add command to history
    addHistoryEntry(`caos@root:~# ${cmd}`);
    if (window.trackEvent) trackEvent("terminal_command", { metadata: { command: mainCmd } });

    // Handle commands
    switch (mainCmd) {
        case 'help':
            const helpText = `Comandos disponíveis:
<div class="cmd-table">
    <span class="cmd-name">about</span><span>Resumo sobre mim e minha missão</span>
    <span class="cmd-name">skills</span><span>Minha stack (Off-sec, AI, Web)</span>
    <span class="cmd-name">contact</span><span>Links e formas de me encontrar</span>
    <span class="cmd-name">projects</span><span>Ver meus repositórios em destaque</span>
    <span class="cmd-name">whois</span><span>Listar dados do meu domínio ativo</span>
    <span class="cmd-name">nmap</span><span>Escaneamento de portas ativas/serviços</span>
    <span class="cmd-name">ls / dir</span><span>Listar arquivos e diretórios do host</span>
    <span class="cmd-name">cat</span><span>Ler o conteúdo de um arquivo em texto</span>
    <span class="cmd-name">clear</span><span>Limpa o terminal</span>
    <span class="cmd-name">sudo</span><span>?????</span>
</div>`;
            addOutput(helpText);
            break;

        case 'about':
            addOutput("Full Stack Developer focado em desenvolvimento web, APIs e plataformas digitais. Construo projetos modernos, transformando ideias em soluções reais através de código, criatividade e aprendizado contínuo.");
            break;

        case 'skills':
            const skillsText = `
[❖] Security: Penetration Testing, Vuln Analysis, Attk Surface
[❖] AI & GenAI: Prompt Engineering, RAG Systems, LLM Sec
[❖] Engineering: Python, TypeScript, Architecture, Clean Code, SOLID`;
            addOutput(skillsText);
            break;

        case 'contact':
            const contactText = `<div class="cmd-table">
    <span class="cmd-name">Email</span><a href="jonatas244silva23@gmail.com" class="cmd-link">henriqqw1@gmail.com</a>
    <span class="cmd-name">GitHub</span><a href="https://github.com/DEVJOTAH" target="_blank" class="cmd-link">github.com/DEVJOTAH</a>
    <span class="cmd-name">LinkedIn</span><a href="em breve" target="_blank" class="cmd-link">    </a>
</div>`;
            addOutput(contactText);
            break;

        case 'projects':
            const projectsText = `Redirecionando para as plataformas...
<a href="/projetos.html" class="cmd-link">> Clique aqui para acessar a página de Projetos</a>`;
            addOutput(projectsText);
            break;

        case 'clear':
        case 'cls':
            terminalHistory.innerHTML = '';
            break;

        case 'sudo':
        case 'su':
            addOutput("Permission denied: incident reported. User 'guest' is not in the sudoers file.", "error");
            break;

        case 'rm':
            if (args.includes('-rf') && args.includes('/')) {
                addOutput("Nice try... mas eu conteinerizei isso aqui. 🛡️", "success");
            } else {
                addOutput(`rm: missing operand`);
            }
            break;

        case 'whois':
            const whoisText = `Domain Name: DEVJOTA
Registry Domain ID: 0x1337-SEC
Registrar: Local First Knowledge
Creation Date: [Since 2024]
Tech Stack: Python, AI, Off-Sec
Status: ACTIVE_AND_LEARNING`;
            addOutput(whoisText);
            break;

        case 'nmap':
            addOutput(`PORT     STATE  SERVICE
22/tcp   open   Python (v3.12)
80/tcp   open   Web Architecture
443/tcp  open   CyberSecurity_Knowledge
8080/tcp open   RAG_Systems
MAC Address: 00:00:00:00:00:00 (Human)`);
            break;

        case 'ls':
        case 'dir':
            addOutput(`<span style="color: #0fb2fb;">drwxr-xr-x</span>  projects/   <span style="color: #0fb2fb;">drwxr-xr-x</span>  skills/   <span style="color: var(--muted)">-rw-r--r--</span>  resume.pdf   <span style="color: #ff5f57;">-rwxrwxrwx</span>  DO_NOT_RUN.sh   <span style="color: var(--muted)">-rw-r--r--</span>  secret.txt`);
            break;

        case 'cat':
            if (args[1] === 'secret.txt') {
                addOutput(`Acessando arquivo confidencial confidencial... <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" class="cmd-link">[ENCRYPTED] Click to Decrypt</a>`);
            } else if (args[1] === 'resume.pdf') {
                addOutput(`Acesse os detalhes no meu <a href=" em breve " target="_blank" class="cmd-link">LinkedIn</a>.`, 'success');
            } else if (!args[1]) {
                // Wait for input (we just exit here for simplicity)emt(`cat: ${args[1]}: No such file or directory`, 'error');
            }
            break;

        default:
            addOutput(`bash: ${mainCmd}: command not found. Digite 'help' para ver os comandos.`, 'error');
    }

    // Auto-scroll to bottom
    const terminalWindow = document.querySelector('.terminal-inner');
    if (terminalWindow) {
        terminalWindow.scrollTop = terminalWindow.scrollHeight;
        // fallback robust scroll
        setTimeout(() => {
            terminalInput.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 50);
    }
}

function addHistoryEntry(text) {
    const line = document.createElement('div');
    line.className = 'history-entry';
    line.innerHTML = `<span class="caret-line">${text}</span>`;
    terminalHistory.appendChild(line);
}

function addOutput(html, type = '') {
    const line = document.createElement('div');
    line.className = `cmd-output ${type}`;
    line.innerHTML = html;
    terminalHistory.appendChild(line);
}
