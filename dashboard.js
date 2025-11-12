// ========================================
// DASHBOARD.JS - Lógica Principal Completa
// ========================================

class Dashboard {
    constructor() {
        this.currentFilter = 'todos';
        this.charts = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDados();
        this.setupAutoRefresh();
        this.loadCamera();
        this.loadAlertas();
        // Garantir que a navegação esteja sincronizada com a seção visível ao iniciar
        this.syncNavWithSection();
    }

    setupEventListeners() {
        // Sidebar Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.showSection(section);
                this.updateActiveNavLink(link);
            });
        });

        // Sidebar Toggle Mobile
        document.getElementById('sidebarToggle')?.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('active');
        });

        // Logout
        document.getElementById('btnLogout')?.addEventListener('click', () => {
            if (confirm('Deseja sair do sistema?')) {
                window.location.href = '/logout';
            }
        });

        // Notification Button
        document.getElementById('notifBtn')?.addEventListener('click', () => {
            this.showSection('alertas');
            // Atualiza o link ativo no sidebar para refletir a navegação via botão de notificação
            const alertLink = document.querySelector('.nav-link[data-section="alertas"]');
            if (alertLink) this.updateActiveNavLink(alertLink);
        });

        // Alerts Filter
        document.querySelectorAll('.btn-small').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.btn-small').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.filterAlertas();
            });
        });

        // Search & Filter
        document.getElementById('searchAlunos')?.addEventListener('keyup', (e) => {
            this.filterAlunos(e.target.value);
        });

        document.getElementById('filterRisco')?.addEventListener('change', (e) => {
            this.filterAlunosByRisk(e.target.value);
        });

        // Reports
        document.getElementById('btnPdf')?.addEventListener('click', () => this.generatePDF());
        document.getElementById('btnExcel')?.addEventListener('click', () => this.generateExcel());
        document.getElementById('btnAnalise')?.addEventListener('click', () => this.generateAnalise());
    }

    showSection(section) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        
        // Show selected section (se não existir, volta para dashboard)
        const targetSection = document.getElementById(`section-${section}`) || document.getElementById('section-dashboard');
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Reinitialize charts when showing dashboard
            if (targetSection.id === 'section-dashboard') {
                setTimeout(() => this.initCharts(), 100);
            }
        }

        // Se estiver em mobile, fechar sidebar ao navegar
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    }

    updateActiveNavLink(link) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    }

    // Sincroniza o link ativo com a seção que estiver visível no DOM
    syncNavWithSection() {
        const activeSection = document.querySelector('.section.active');
        if (!activeSection) return;
        const id = activeSection.id.replace('section-', '');
        const link = document.querySelector(`.nav-link[data-section="${id}"]`);
        if (link) this.updateActiveNavLink(link);
    }

    async loadDados() {
        try {
            const response = await fetch('/api/dados');
            if (response.status === 401) {
                window.location.href = '/login';
                return;
            }
            
            const dados = await response.json();
            this.updateStats(dados);
            this.updateAlunos(dados.alunos);
            this.initCharts(dados);
            this.showToast('Dados carregados com sucesso', 'success');
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            this.showToast('Erro ao carregar dados', 'error');
        }
    }

    updateStats(dados) {
        document.getElementById('statPresenca').textContent = dados.presenca + '%';
        document.getElementById('statEngajamento').textContent = dados.engajamento + '%';
        document.getElementById('statNota').textContent = dados.nota_media;
        document.getElementById('statRisco').textContent = dados.alunos_risco;

        // Update notification badge
        document.getElementById('notifBadge').textContent = dados.alertas.length;
    }

    updateAlunos(alunos) {
        const tbody = document.getElementById('alunosList');
        tbody.innerHTML = alunos.map(aluno => `
            <tr>
                <td>${aluno.id}</td>
                <td><strong>${aluno.nome}</strong></td>
                <td>
                    <div style="background: #e0e0e0; height: 8px; border-radius: 4px; width: 80px; overflow: hidden;">
                        <div style="background: ${aluno.presenca >= 70 ? '#4caf50' : '#f44336'}; height: 100%; width: ${aluno.presenca}%;"></div>
                    </div>
                    ${aluno.presenca}%
                </td>
                <td>${aluno.engajamento}%</td>
                <td><strong>${aluno.nota}</strong></td>
                <td>
                    <span class="badge ${aluno.risco ? 'badge-danger' : 'badge-success'}">
                        ${aluno.risco ? 'Em Risco' : 'Normal'}
                    </span>
                </td>
            </tr>
        `).join('');
        
        // Adicionar animação aos novos elementos
        this.addStaggerAnimation('#alunosList tr');
    }

    initCharts(dados = null) {
        // Se dados for null, usar dados simulados
        if (!dados) {
            dados = {
                evolucao: [65, 70, 75, 72, 78, 80, 82, 85],
                engajamento_turmas: [75, 68, 72, 80, 70],
                presenca_pizza: [85, 15]
            };
        }

        // Destroy existing charts
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });

        // Evolução Chart
        const ctxEvolucao = document.getElementById('chartEvolucao');
        if (ctxEvolucao) {
            this.charts.evolucao = new Chart(ctxEvolucao, {
                type: 'line',
                data: {
                    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
                    datasets: [{
                        label: 'Desempenho (%)',
                        data: dados.evolucao,
                        borderColor: '#1976d2',
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5,
                        pointBackgroundColor: '#1976d2',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: { color: 'rgba(0, 0, 0, 0.05)' }
                        },
                        x: {
                            grid: { display: false }
                        }
                    }
                }
            });
        }

        // Presença Chart (Doughnut)
        const ctxPresenca = document.getElementById('chartPresenca');
        if (ctxPresenca) {
            this.charts.presenca = new Chart(ctxPresenca, {
                type: 'doughnut',
                data: {
                    labels: ['Presente', 'Ausente'],
                    datasets: [{
                        data: dados.presenca_pizza,
                        backgroundColor: ['#4caf50', '#f44336'],
                        borderColor: '#fff',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { font: { size: 12 } }
                        }
                    }
                }
            });
        }

        // Engajamento Chart (Bar)
        const ctxEngajamento = document.getElementById('chartEngajamento');
        if (ctxEngajamento) {
            this.charts.engajamento = new Chart(ctxEngajamento, {
                type: 'bar',
                data: {
                    labels: ['Turma A', 'Turma B', 'Turma C', 'Turma D', 'Turma E'],
                    datasets: [{
                        label: 'Engajamento (%)',
                        data: dados.engajamento_turmas,
                        backgroundColor: [
                            '#1976d2',
                            '#7b1fa2',
                            '#388e3c',
                            '#f57c00',
                            '#c2185b'
                        ],
                        borderRadius: 6,
                        borderSkipped: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    indexAxis: 'x',
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: { color: 'rgba(0, 0, 0, 0.05)' }
                        },
                        x: {
                            grid: { display: false }
                        }
                    }
                }
            });
        }
    }

    async loadCamera() {
        try {
            const response = await fetch('/api/camera');
            const data = await response.json();

            document.getElementById('cameraFps').textContent = data.fps;
            document.getElementById('cameraDeteccoes').textContent = data.deteccoes_total;
            document.getElementById('cameraStatus').textContent = 'Ativo';

            const deteccoesList = document.getElementById('deteccoesList');
            deteccoesList.innerHTML = data.deteccoes.map(det => `
                <div style="padding: 8px 0; border-bottom: 1px solid #eee; font-size: 12px;">
                    <strong>${det.pessoa}</strong><br>
                    <small>Confiança: ${(det.confianca * 100).toFixed(1)}%</small><br>
                    <small style="color: #999;">${det.hora}</small>
                </div>
            `).join('');
        } catch (error) {
            console.error('Erro ao carregar câmera:', error);
        }
    }

    async loadAlertas() {
        try {
            const response = await fetch('/api/alertas');
            const alertas = await response.json();
            this.renderAlertas(alertas);
        } catch (error) {
            console.error('Erro ao carregar alertas:', error);
        }
    }

    renderAlertas(alertas) {
        const alertasList = document.getElementById('alertasList');
        if (!alertasList) return;

        alertasList.innerHTML = alertas.map(alerta => `
            <div class="alert-item ${alerta.severidade}" data-severidade="${alerta.severidade}">
                <div class="alert-icon">
                    ${alerta.severidade === 'alto' ? '🔴' : alerta.severidade === 'medio' ? '🟡' : '🟢'}
                </div>
                <div class="alert-content">
                    <div class="alert-title">${alerta.msg}</div>
                    <div class="alert-msg">${alerta.tipo}</div>
                    <div class="alert-time">${new Date(alerta.data).toLocaleTimeString('pt-BR')}</div>
                </div>
            </div>
        `).join('');
        
        // Adicionar animação aos novos alertas
        this.addStaggerAnimation('.alert-item');
    }

    filterAlertas() {
        const items = document.querySelectorAll('.alert-item');
        items.forEach(item => {
            const severidade = item.dataset.severidade;
            if (this.currentFilter === 'todos' || severidade === this.currentFilter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    filterAlunos(searchTerm) {
        const rows = document.querySelectorAll('#alunosList tr');
        rows.forEach(row => {
            const nome = row.cells[1].textContent.toLowerCase();
            row.style.display = nome.includes(searchTerm.toLowerCase()) ? '' : 'none';
        });
    }

    filterAlunosByRisk(riskType) {
        const rows = document.querySelectorAll('#alunosList tr');
        rows.forEach(row => {
            const status = row.cells[5].textContent.trim();
            if (riskType === '') {
                row.style.display = '';
            } else if (riskType === 'risco' && status === 'Em Risco') {
                row.style.display = '';
            } else if (riskType === 'normal' && status === 'Normal') {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    async generatePDF() {
        this.showToast('Gerando PDF...', 'info');
        try {
            const response = await fetch('/api/export/pdf');
            const data = await response.json();
            this.showToast('PDF gerado com sucesso!', 'success');
        } catch (error) {
            this.showToast('Erro ao gerar PDF', 'error');
        }
    }

    async generateExcel() {
        this.showToast('Gerando Excel...', 'info');
        try {
            const response = await fetch('/api/export/excel');
            const data = await response.json();
            this.showToast('Excel gerado com sucesso!', 'success');
        } catch (error) {
            this.showToast('Erro ao gerar Excel', 'error');
        }
    }

    generateAnalise() {
        this.showToast('Gerando análise...', 'info');
        setTimeout(() => {
            document.getElementById('relatorioPreview').style.display = 'block';
            document.getElementById('previewContent').innerHTML = `
                <div style="background: white; padding: 20px; border-radius: 8px;">
                    <h4>Análise Mensal - Novembro 2025</h4>
                    <p><strong>Presença Média:</strong> 85%</p>
                    <p><strong>Nota Média:</strong> 7.8</p>
                    <p><strong>Engajamento:</strong> 72%</p>
                    <p><strong>Alunos em Risco:</strong> 3 alunos</p>
                    <hr>
                    <p><strong>Recomendações:</strong></p>
                    <ul>
                        <li>Acompanhar alunos em risco de evasão</li>
                        <li>Fortalecer engajamento nas turmas B e C</li>
                        <li>Revisar metodologia com nota média abaixo de 7.0</li>
                    </ul>
                </div>
            `;
            this.showToast('Análise gerada com sucesso!', 'success');
        }, 1000);
    }

    setupAutoRefresh() {
        // Atualizar dados a cada 30 segundos
        setInterval(() => {
            this.loadDados();
        }, 30000);

        // Atualizar câmera a cada 5 segundos
        setInterval(() => {
            this.loadCamera();
        }, 5000);

        // Atualizar alertas a cada 10 segundos
        setInterval(() => {
            this.loadAlertas();
        }, 10000);
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toastMsg');
        
        toastMsg.textContent = message;
        toast.classList.add('show');
        
        // Definir cor baseada no tipo
        if (type === 'success') {
            toast.style.background = '#4caf50';
        } else if (type === 'error') {
            toast.style.background = '#f44336';
        } else {
            toast.style.background = '#0057b8';
        }

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Adicionar animação de stagger aos cards
    addStaggerAnimation(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.style.animation = `slideInRight 0.5s ease-out ${index * 0.08}s backwards`;
        });
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new Dashboard();
});