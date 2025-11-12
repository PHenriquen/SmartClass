# 🚀 QUICK START - SmartClass

## ⚡ Começar em 2 minutos

### 1️⃣ Clonar o projeto
```bash
git clone https://github.com/seu-usuario/smartclass.git
cd smartclass
```

### 2️⃣ Criar ambiente virtual
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# ou
source venv/bin/activate  # Linux/Mac
```

### 3️⃣ Instalar dependências
```bash
pip install -r requirements.txt
```

### 4️⃣ Executar
```bash
python app.py
```

### 5️⃣ Acessar
Abra o navegador em: **http://localhost:5000**

### 6️⃣ Login
- Usuário: qualquer coisa
- Senha: qualquer coisa

---

## 📂 Estrutura Rápida

```
smartclass/
├── app.py                  ← Backend Flask
├── templates/
│   ├── login.html         ← Página de login
│   └── dashboard.html     ← Dashboard
└── static/
    ├── css/style.css      ← Estilos (1300+ linhas)
    └── js/dashboard.js    ← JavaScript (456 linhas)
```

---

## 🎯 Funcionalidades

| Seção | O que faz |
|-------|-----------|
| **Dashboard** | Stats em tempo real + gráficos |
| **Câmera** | Feed de vídeo simulado |
| **Alunos** | Tabela com filtros |
| **Alertas** | Notificações com severidade |
| **Relatórios** | Exportação PDF/Excel |

---

## 🎨 O que há de especial?

✨ **12 tipos de animações**
- Entrada de cards (slideInRight)
- Flutuação de ícones (float)
- Gráficos (scaleIn)
- Notificações (slideInUp)
- E mais...

🎯 **Design SENAI**
- Cores azul SENAI (#0057b8)
- Responsivo (mobile/tablet/desktop)
- Fácil de customizar

🔧 **Pronto para expandir**
- Estrutura modular
- APIs documentadas
- Fácil adicionar features

---

## 📡 APIs Disponíveis

```bash
# Dados do dashboard
curl http://localhost:5000/api/dados

# Alertas
curl http://localhost:5000/api/alertas

# Câmera
curl http://localhost:5000/api/camera

# Exportar PDF
curl http://localhost:5000/api/export/pdf
```

---

## 🐛 Problemas Comuns

### ❌ "Port already in use"
```bash
# Windows: Matar processo na porta 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5000
kill -9 <PID>
```

### ❌ "ModuleNotFoundError"
```bash
# Reativar ambiente virtual
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Reinstalar dependências
pip install -r requirements.txt --force-reinstall
```

### ❌ "Template not found"
Verifique se está rodando a partir do diretório correto:
```bash
cd smartclass
python app.py
```

---

## 📚 Documentação Completa

Para saber mais, consulte:
- **README.md** - Visão geral completa
- **API.md** - Especificação técnica
- **CONFIG.md** - Configurações
- **EQUIPE.md** - Instruções para equipe
- **CHECKLIST.md** - O que foi feito

---

## 🎓 Arquitetura

```
┌─────────────────────────────────────────────┐
│         Frontend (Browser)                  │
│    HTML + CSS (1300 linhas) + JS (456)     │
└─────────────────────────────────────────────┘
                    ↕️ JSON
┌─────────────────────────────────────────────┐
│         Backend (Flask)                     │
│    Python (300 linhas de código)           │
│    - 7 endpoints                           │
│    - Session auth                          │
│    - Dados simulados                       │
└─────────────────────────────────────────────┘
```

---

## 💡 Dicas

1. **Customizar cores**: Edit `static/css/style.css`
2. **Adicionar alunos**: Edit `ALUNOS_DATA` em `app.py`
3. **Alterar textos**: Edit `templates/dashboard.html`
4. **Novo endpoint**: Adicione rota em `app.py`

---

## 🚀 Deploy (5 minutos)

### Render.com
1. Fazer push para GitHub
2. Conectar repo no Render
3. Adicionar Procfile:
```
web: gunicorn app:app
```
4. Deploy automático ✅

### Railway.app
1. Conectar GitHub
2. Selecionar repo
3. Deploy automático ✅

### Local (para testes)
```bash
# Instalar gunicorn
pip install gunicorn

# Rodar com gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

---

## 📞 Próximos Passos

1. ✅ Executar localmente
2. ✅ Explorar o dashboard
3. ✅ Ler documentação
4. ✅ Fazer um PR com melhorias
5. ✅ Integrar as features da equipe

---

## 🎉 Pronto?

**Você tem tudo que precisa para começar!**

Dúvidas? Consulte:
- README.md
- EQUIPE.md
- API.md

Bom coding! 🚀

---

**SmartClass · SENAI 4.0 · 2025**
