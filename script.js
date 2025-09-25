document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const terminal = document.getElementById('terminal');

    const commands = {
        help: () => `
Available commands:
  <span class="command">whoami</span>      - Professional summary
  <span class="command">skills</span>      - Technical skill set
  <span class="command">experience</span>  - Work history
  <span class="command">projects</span>    - Key project highlights
  <span class="command">education</span>   - Education and certifications
  <span class="command">contact</span>     - Get in touch
  <span class="command">clear</span>       - Clear the terminal
        `,
        whoami: () => `
<span class="section-title">Professional Summary</span>
Cloud ML Engineer and Data Science Solutions Specialist with expertise in building scalable machine learning
solutions on Google Cloud Platform and multi-cloud environments. Proven track record in delivering big data
solutions, implementing recommendation systems, and providing technical consulting to drive customer success.
        `,
        skills: () => `
<span class="section-title">Technical Skills</span>
<div class="progress-bar">
    <span class="progress-bar-label">Python</span>
    <div class="progress-bar-fill" style="width: 95%;"></div>
</div>
<div class="progress-bar">
    <span class="progress-bar-label">GCP</span>
    <div class="progress-bar-fill" style="width: 90%;"></div>
</div>
<div class="progress-bar">
    <span class="progress-bar-label">TensorFlow</span>
    <div class="progress-bar-fill" style="width: 85%;"></div>
</div>
<div class="progress-bar">
    <span class="progress-bar-label">BigQuery</span>
    <div class="progress-bar-fill" style="width: 80%;"></div>
</div>
<div class="progress-bar">
    <span class="progress-bar-label">JavaScript</span>
    <div class="progress-bar-fill" style="width: 75%;"></div>
</div>
        `,
        experience: () => `
<span class="section-title">Professional Experience</span>
<div class="job">
  <span class="job-title">ML Solutions Engineer & Technical Consultant</span> | Cognizant (Dec 2024 - Present)
  <p>- Delivered AI-powered solutions for enterprise clients, achieving 30% improvement in development efficiency.</p>
  <p>- Engineered Strategic Contract Manager solution for CVS Health using distributed architecture.</p>
</div>
<div class="job">
  <span class="job-title">Data Science Consultant & ML Engineer</span> | UpWork (Dec 2024 - Present)
  <p>- Built and deployed Python-based data pipelines and recommendation systems for e-commerce clients.</p>
</div>
<div class="job">
  <span class="job-title">LLM Platform Engineer & AI Consultant</span> | yoopIQ (Jan 2024 - Mar 2024)
  <p>- Resolved critical engineering challenges in distributed LLM deployment pipeline.</p>
</div>
        `,
        projects: () => `
<span class="section-title">Key ML Solutions & Consulting Projects</span>
- <span class="project-title">Intelligent Content Recommendation System:</span> Developed advanced recommendation engine using LDA and Llama-3.2.
- <span class="project-title">Enterprise Customer Intelligence Platform:</span> Architected AI-powered customer communication system with automated classification.
- <span class="project-title">Distributed ML Analytics Platform:</span> Led team in developing distributed ML solution for network intrusion detection.
        `,
        education: () => `
<span class="section-title">Education & Certifications</span>
<div class="education-item">
  <span class="degree">Bachelor of Technology in AI & Data Science</span>
  <p>Jyothi Engineering College (Aug 2020 - May 2024)</p>
</div>
<div class="certification-item">
  <span class="cert-title">In Progress: Google Cloud Professional Machine Learning Engineer</span>
</div>
        `,
        contact: () => `
<span class="section-title">Contact Information</span>
- <span class="contact-label">Email:</span> <a href="mailto:jostencheeran@gmail.com">jostencheeran@gmail.com</a>
- <span class="contact-label">LinkedIn:</span> <a href="https://linkedin.com/in/josten-s-cheeran" target="_blank">linkedin.com/in/josten-s-cheeran</a>
- <span class="contact-label">Phone:</span> 7907935842
        `,
        clear: () => {
            output.innerHTML = '';
            return '';
        }
    };

    const executeCommand = (command) => {
        const commandOutput = document.createElement('div');
        commandOutput.classList.add('command-output');

        const prompt = `<span class="prompt">josten@portfolio:~$</span> ${command}`;
        const result = commands[command] ? commands[command]() : `Command not found: ${command}. Type 'help' for a list of commands.`;

        commandOutput.innerHTML = `${prompt}<div class="output-text">${result}</div>`;
        output.appendChild(commandOutput);
        terminal.scrollTop = terminal.scrollHeight;
    };

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            if (command) {
                executeCommand(command);
                input.value = '';
            }
        }
    });

    const welcomeMessage = `
<div class="ascii-art">
   __ _ _   _ ___  ___ _ __
  / _\` | | | / __|/ _ \\ '__|
 | (_| | |_| \\__ \\  __/ |
  \\__, |\\__,_|___/\\___|_|
     |_|
</div>
Welcome to the portfolio of Josten S Cheeran.
Type 'help' to see the available commands.
    `;
    output.innerHTML = welcomeMessage;
});