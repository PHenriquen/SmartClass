# 📋 INSTRUÇÕES PARA A EQUIPE - SmartClass

## ✅ Status do Projeto

O projeto **SmartClass** está 85% completo e pronto para ser compartilhado com a equipe!

### ✅ Concluído:
- [x] Sistema de autenticação (login/logout)
- [x] Interface do dashboard completa
- [x] 5 seções principais (Dashboard, Câmera, Alunos, Alertas, Relatórios)
- [x] Gráficos interativos com Chart.js
- [x] Tabela de alunos com filtros
- [x] Sistema de alertas com severidade
- [x] API endpoints (dados, alertas, câmera, export)
- [x] Design responsivo (mobile, tablet, desktop)
- [x] Animações e efeitos visuais elegantes
- [x] Branding SENAI (cores azul #0057b8)
- [x] Auto-refresh de dados

### 🚀 Próximos Passos (Distribuir entre membros):

## 👨‍💻 Divisão de Tarefas

### **1. Reconhecimento Facial (Com OpenCV/MediaPipe)**
**Responsável:** Escolher um membro

**Tarefas:**
- Integrar OpenCV para captura de vídeo
- Usar MediaPipe Face Detection
- Implementar detecção de rostos em tempo real
- Salvar dados de detecção
- Integrar com endpoint `/api/camera`

**Arquivos a modificar:**
- `app.py` (função `/api/camera`)
- Criar módulo `face_detection.py`

**Recursos:**
```bash
pip install opencv-python mediapipe numpy
```

---

### **2. Banco de Dados (SQLite/PostgreSQL)**
**Responsável:** Escolher um membro

**Tarefas:**
- Criar schema de banco de dados
- Implementar modelos (Alunos, Detecções, Alertas, Relatórios)
- Integrar com Flask SQLAlchemy
- Migração de dados simulados para reais
- CRUD operations

**Arquivos a criar:**
- `models.py` (SQLAlchemy models)
- `database.py` (connection)
- Pasta `migrations/`

**Recursos:**
```bash
pip install flask-sqlalchemy flask-migrate
```

---

### **3. Análise de Engajamento (IA/ML)**
**Responsável:** Escolher um membro

**Tarefas:**
- Implementar detecção de emoções (via IA)
- Algoritmo de cálculo de engajamento
- Detecção de distração/sonolência
- Scoring automático
- Integrar com sistema de alertas

**Arquivos a modificar:**
- `app.py` (função `/api/dados`)
- Criar módulo `engagement_analyzer.py`

**Recursos:**
```bash
pip install deepface tensorflow keras
```

---

### **4. Exportação de Relatórios (PDF/Excel)**
**Responsável:** Escolher um membro

**Tarefas:**
- Implementar geração de PDF com reportlab
- Implementar exportação para Excel
- Gráficos em relatórios
- Templates profissionais
- Download automático

**Arquivos a modificar:**
- `app.py` (função `/api/export/<tipo>`)
- Criar módulo `report_generator.py`

**Recursos:**
```bash
pip install reportlab openpyxl matplotlib
```

---

### **5. Integração com Banco de Dados (Backend)**
**Responsável:** Escolher um membro

**Tarefas:**
- Conectar endpoints com banco de dados
- Validação de dados
- Tratamento de erros
- Implementar autenticação segura
- Session management

**Arquivos a modificar:**
- `app.py` (todos os endpoints)
- Criar módulo `auth.py`

**Recursos:**
```bash
pip install flask-login werkzeug
```

---

## 🛠️ Como Começar

### 1. **Clonar o repositório**
```bash
git clone https://github.com/seu-usuario/smartclass.git
cd smartclass
```

### 2. **Criar sua branch**
```bash
git checkout -b feature/seu-nome-tarefa
```

### 3. **Instalar dependências**
```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

pip install -r requirements.txt
```

### 4. **Desenvolver sua feature**
```bash
python app.py
# Abrir http://localhost:5000
```

### 5. **Fazer commit e push**
```bash
git add .
git commit -m "feat: Adicionar reconhecimento facial"
git push origin feature/seu-nome-tarefa
```

### 6. **Abrir Pull Request**
- Descrever mudanças
- Referenciar issue (se houver)
- Aguardar review

---

## 📂 Estrutura de Pastas (Sugestão)

```
smartclass/
├── app.py
├── requirements.txt
├── .gitignore
├── README.md
├── CONFIG.md
├── EQUIPE.md (este arquivo)
│
├── modules/
│   ├── __init__.py
│   ├── auth.py              # Autenticação (Pedro)
│   ├── face_detection.py    # Reconhecimento facial (Equipe)
│   ├── engagement_analyzer.py # Análise de engajamento (Equipe)
│   ├── report_generator.py  # Relatórios (Equipe)
│   └── database.py          # Banco de dados (Equipe)
│
├── models/
│   ├── __init__.py
│   ├── user.py
│   ├── aluno.py
│   ├── deteccao.py
│   └── alerta.py
│
├── templates/
│   ├── base.html
│   ├── login.html
│   ├── dashboard.html
│   └── reports/
│
├── static/
│   ├── css/
│   ├── js/
│   └── img/
│
├── migrations/              # SQLAlchemy migrations
│
└── tests/
    ├── __init__.py
    ├── test_auth.py
    ├── test_face_detection.py
    └── test_reports.py
```

---

## 🔑 Credenciais de Teste

**Login:**
- Usuário: `demo`
- Senha: `demo`

(Qualquer combinação funciona no modo de desenvolvimento)

---

## 📞 Comunicação

- **Issues**: Usar GitHub Issues para reportar problemas
- **Discussões**: Usar GitHub Discussions para dúvidas
- **PRs**: Pull Requests para integração de features
- **Chat**: [Discord/WhatsApp/Email] para comunicação rápida

---

## 📅 Prazos Sugeridos

- **Semana 1**: Preparar ambiente e estudar codebase
- **Semana 2-3**: Desenvolvimento da feature principal
- **Semana 4**: Testes e correções
- **Semana 5**: Integração e deploy

---

## ✨ Boas Práticas

### Git
```bash
# Commits claros
git commit -m "feat: Adicionar autenticação com JWT"
git commit -m "fix: Corrigir bug em validação"
git commit -m "docs: Adicionar documentação de API"
```

### Python
```python
# Usar type hints
def get_student_data(student_id: int) -> dict:
    pass

# Docstrings
def calculate_attendance(dates: list) -> float:
    """
    Calcula percentual de presença.
    
    Args:
        dates: Lista de datas presentes
        
    Returns:
        Percentual de presença (0-100)
    """
    pass
```

### Code Style
```bash
# Instalar linter
pip install flake8 black

# Formatar código
black .

# Verificar estilo
flake8 .
```

---

## 🆘 Troubleshooting

### Erro ao clonar
```bash
# Usar HTTPS se SSH não funciona
git clone https://github.com/usuario/smartclass.git
```

### Conflito de merge
```bash
git pull origin main
# Resolver conflitos manualmente
git add .
git commit -m "Resolver conflitos"
```

### Porta já em uso
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5000
kill -9 <PID>
```

---

## 📚 Recursos Úteis

- [Flask Documentation](https://flask.palletsprojects.com/)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/)
- [OpenCV Docs](https://docs.opencv.org/)
- [MediaPipe](https://developers.google.com/mediapipe)
- [Chart.js](https://www.chartjs.org/)
- [Git Cheat Sheet](https://github.github.com/training-kit/)

---

## 🎓 Dúvidas Frequentes

**P: Por onde começo?**
R: Leia o README.md, clone o projeto e execute `python app.py`

**P: Como faço um pull request?**
R: Crie uma branch, faça suas mudanças, commit e push. Depois abra PR no GitHub.

**P: O que fazer se houver conflito?**
R: Git merge conflicts podem ser resolvidos manualmente. Use VS Code ou git CLI.

**P: Preciso de permissão para fazer deploy?**
R: Sim, coordene com o líder do projeto antes de fazer push para main.

---

## 🚀 Próximos Passos da Equipe

1. ✅ **Semana 1**: Dividir tarefas e preparar ambiente
2. ✅ **Semana 2-4**: Desenvolvimento das features
3. ✅ **Semana 5**: Testes integrados
4. ✅ **Semana 6**: Deploy em servidor

---

**Boa sorte, equipe! 🚀🎓**

Última atualização: 12 de novembro de 2025
Desenvolvido com ❤️ pela equipe SENAI 4.0
