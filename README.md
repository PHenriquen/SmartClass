# SmartClass - Dashboard SENAI 4.0

![Capa do SmartClass](static/img/cover.png)

Sistema de monitoramento em tempo real de alunos com reconhecimento facial e análise de engajamento.

## 🎯 Visão Geral

O SmartClass é um dashboard inteligente desenvolvido para monitorar o desempenho e engajamento de alunos em tempo real, utilizando tecnologias como reconhecimento facial, análise de dados e visualizações interativas.

## 👥 Equipe de Desenvolvimento

- **Pedro Henrique Nogueira** - Líder do projeto
- **Bruno Allan** - Desenvolvimento
- **Arthur Bernado** - Desenvolvimento
- **Gabriel Andrade** - Desenvolvimento
- **Eduardo Perdigão** - Desenvolvimento

## 🚀 Funcionalidades

### Dashboard Principal
- **Visão Geral**: Estatísticas em tempo real (presença, engajamento, nota média, alunos em risco)
- **Gráficos Interativos**: 
  - Evolução do desempenho semanal
  - Presença por turma (Doughnut)
  - Engajamento por turma (Bar)

### Câmera
- Feed de vídeo em tempo real
- Detecções de rostos com confiança
- Histórico de detecções
- Status do sistema

### Alunos
- Tabela completa com filtros
- Busca por nome
- Filtro por status de risco
- Indicadores visuais de desempenho

### Alertas
- Sistema de notificações com severidade
- Filtros por nível (Alto, Médio, Baixo)
- Timestamps em tempo real
- Visual feedback com cores

### Relatórios
- Exportação em PDF
- Exportação em Excel
- Análise detalhada
- Integração com APIs externas

## 📦 Requisitos

- Python 3.8+
- Flask
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## 🔧 Instalação

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/smartclass.git
cd smartclass
```

### 2. Criar ambiente virtual
```bash
python -m venv venv
```

### 3. Ativar ambiente virtual
**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 4. Instalar dependências
```bash
pip install -r requirements.txt
```

### 5. Executar aplicação
```bash
python app.py
```

A aplicação estará disponível em `http://127.0.0.1:5000`

## 📚 Estrutura do Projeto

```
smartclass/
├── app.py                    # Aplicação principal Flask
├── requirements.txt          # Dependências Python
├── templates/
│   ├── base.html            # Template base (não usado)
│   ├── login.html           # Página de login
│   └── dashboard.html       # Dashboard principal
├── static/
│   ├── css/
│   │   └── style.css        # Estilos (650+ linhas)
│   ├── js/
│   │   └── dashboard.js     # Lógica JavaScript
│   └── img/                 # Imagens e ícones
└── README.md                # Este arquivo
```

## 🔐 Autenticação

**Usuário de Demo:**
- Usuário: qualquer texto
- Senha: qualquer texto

⚠️ **Nota**: Para produção, implementar autenticação segura com hash de senhas e JWT tokens.

## 🎨 Customização

### Cores (SENAI)
Editar em `static/css/style.css`:
```css
--primary: #0057b8;      /* Azul SENAI */
--primary-dark: #004a99;
--primary-light: #42a5f5;
```

### Equipe
Editar lista `TEAM` em `app.py`:
```python
TEAM = [
    'Pedro Henrique Nogueira',
    'Bruno Allan',
    'Arthur Bernado',
    'Gabriel Andrade',
    'Eduardo Perdigão'
]
```

## 📊 APIs Disponíveis

### GET /api/dados
Retorna dados de estatísticas e alunos
```json
{
  "presenca": 85,
  "engajamento": 72,
  "nota_media": 7.8,
  "alunos_risco": 3,
  "alunos": [...],
  "alertas": [...]
}
```

### GET /api/alertas
Retorna lista de alertas do sistema

### GET /api/camera
Retorna dados de câmera e detecções

### GET /api/export/<tipo>
Exporta relatórios (pdf/excel/analise)

## 🎬 Animações e Efeitos Visuais

O projeto inclui diversos efeitos CSS modernos:
- **Entrada de Cards**: slideInRight
- **Gráficos**: scaleIn
- **Ícones**: float, rotate
- **Botões**: Ripple effect
- **Hover**: Shine effect, glow
- **Transições**: Smooth transitions (0.3s)

## 🔄 Auto-refresh

- Dados: A cada 30 segundos
- Câmera: A cada 5 segundos
- Alertas: A cada 10 segundos

## 📱 Responsividade

Breakpoints:
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: até 767px

## 🚢 Deploy

### Opções recomendadas:
1. **Render** (gratuito com GitHub)
2. **Railway** (fácil e rápido)
3. **Fly.io** (performático)
4. **PythonAnywhere** (simples)

### Procfile para deploy:
```
web: gunicorn app:app
```

## 📝 Próximos Passos

### Implementações Necessárias:
- [ ] Integração com OpenCV/MediaPipe para reconhecimento facial
- [ ] Banco de dados real (SQLite/PostgreSQL)
- [ ] Autenticação segura com JWT
- [ ] Sistema de detecção de emoções
- [ ] Exportação de relatórios em PDF
- [ ] Gráficos em tempo real com WebSockets
- [ ] Dashboard de análise avançada

## 🐛 Troubleshooting

### Porta 5000 já em uso
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5000
kill -9 <PID>
```

### Problemas com imports
```bash
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

## 📄 Licença

Este projeto foi desenvolvido como parte do programa SENAI 4.0.

## 📧 Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido com ❤️ pela equipe SENAI 4.0**

Última atualização: 12 de novembro de 2025
