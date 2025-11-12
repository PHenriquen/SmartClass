# 📡 API SPECIFICATION - SmartClass

## Base URL
```
http://localhost:5000
```

## Autenticação
- Sessão baseada em cookies
- Login obrigatório antes de acessar endpoints protegidos

---

## 🔐 Endpoints de Autenticação

### POST /login
Faz login do usuário

**Request:**
```json
{
  "username": "demo",
  "password": "demo"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Login realizado com sucesso",
  "redirect": "/dashboard"
}
```

**Response (401):**
```json
{
  "status": "error",
  "message": "Usuário ou senha incorretos"
}
```

---

### GET /logout
Faz logout do usuário

**Response (200):**
```json
{
  "status": "success",
  "message": "Logout realizado com sucesso"
}
```

---

## 📊 Endpoints de Dados

### GET /api/dados
Retorna todos os dados do dashboard

**Headers:**
```
Cookie: session=<session_id>
```

**Response (200):**
```json
{
  "presenca": 85,
  "engajamento": 72,
  "nota_media": 7.8,
  "alunos_risco": 3,
  "alertas": [
    {
      "id": 1,
      "msg": "João não está prestando atenção",
      "tipo": "Desatenção",
      "severidade": "alto",
      "data": "2025-11-12T14:30:00"
    }
  ],
  "alunos": [
    {
      "id": 1,
      "nome": "João Silva",
      "presenca": 90,
      "engajamento": 85,
      "nota": 8.5,
      "risco": false
    }
  ],
  "evolucao": [65, 70, 75, 72, 78, 80, 82, 85],
  "engajamento_turmas": [75, 68, 72, 80, 70],
  "presenca_pizza": [85, 15]
}
```

**Status Codes:**
- `200`: Dados retornados com sucesso
- `401`: Não autenticado

---

### GET /api/alertas
Retorna lista de alertas do sistema

**Response (200):**
```json
[
  {
    "id": 1,
    "msg": "Aluno dormindo em sala",
    "tipo": "Sonolência",
    "severidade": "alto",
    "data": "2025-11-12T14:30:00",
    "aluno_id": 5
  },
  {
    "id": 2,
    "msg": "Engajamento baixo detectado",
    "tipo": "Engajamento",
    "severidade": "medio",
    "data": "2025-11-12T14:25:00",
    "aluno_id": 7
  }
]
```

**Query Parameters:**
```
?severidade=alto  # Filtrar por severidade
?limite=10        # Limitar quantidade de resultados
?offset=0         # Paginação
```

---

### GET /api/camera
Retorna dados de câmera em tempo real

**Response (200):**
```json
{
  "fps": 30,
  "status": "ativo",
  "deteccoes_total": 28,
  "ultima_deteccao": "2025-11-12T14:35:42",
  "pessoas_em_sala": 25,
  "deteccoes": [
    {
      "pessoa": "João Silva",
      "confianca": 0.98,
      "x": 250,
      "y": 150,
      "width": 50,
      "height": 80,
      "hora": "14:35:42"
    }
  ]
}
```

---

## 📥 Endpoints de Exportação

### GET /api/export/pdf
Exporta relatório em PDF

**Query Parameters:**
```
?data_inicio=2025-11-01
?data_fim=2025-11-12
?aluno_id=5
```

**Response (200):**
- File Download: `relatorio.pdf`
- Content-Type: `application/pdf`

**Response (400):**
```json
{
  "status": "error",
  "message": "Parâmetros inválidos"
}
```

---

### GET /api/export/excel
Exporta dados em Excel

**Query Parameters:**
```
?tipo=alunos      # alunos, deteccoes, alertas
?mes=11
?ano=2025
```

**Response (200):**
- File Download: `relatorio.xlsx`
- Content-Type: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`

---

### GET /api/export/analise
Exporta análise detalhada

**Response (200):**
```json
{
  "periodo": "2025-11-01 a 2025-11-12",
  "total_alunos": 28,
  "presenca_media": 85.5,
  "engajamento_medio": 72.3,
  "nota_media_turma": 7.6,
  "alunos_com_risco": 3,
  "evolucao_semanal": [...],
  "top_performers": [...],
  "alunos_em_risco": [...]
}
```

---

## 🎯 Padrão de Resposta

### Success (200)
```json
{
  "status": "success",
  "data": {},
  "message": "Operação realizada com sucesso"
}
```

### Error (4xx/5xx)
```json
{
  "status": "error",
  "error_code": "INVALID_REQUEST",
  "message": "Descrição do erro",
  "details": {}
}
```

---

## 🔄 Rate Limiting

**Recomendado para produção:**
```
- 100 requisições por minuto por IP
- 10 requisições por segundo para o mesmo endpoint
```

---

## 📋 Error Codes

| Code | Descrição |
|------|-----------|
| `INVALID_REQUEST` | Requisição inválida |
| `UNAUTHORIZED` | Não autenticado |
| `FORBIDDEN` | Não autorizado |
| `NOT_FOUND` | Recurso não encontrado |
| `CONFLICT` | Conflito (ex: duplicata) |
| `INTERNAL_ERROR` | Erro interno do servidor |

---

## 🧪 Exemplos com cURL

### Login
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "demo",
    "password": "demo"
  }' \
  -c cookies.txt
```

### Obter Dados
```bash
curl http://localhost:5000/api/dados \
  -b cookies.txt
```

### Exportar PDF
```bash
curl "http://localhost:5000/api/export/pdf?data_inicio=2025-11-01" \
  -b cookies.txt \
  -o relatorio.pdf
```

---

## 🧪 Exemplos com Python

```python
import requests
from requests.sessions import Session

# Criar sessão
session = Session()

# Login
response = session.post('http://localhost:5000/login', json={
    'username': 'demo',
    'password': 'demo'
})

# Obter dados
response = session.get('http://localhost:5000/api/dados')
dados = response.json()
print(dados)

# Exportar PDF
response = session.get(
    'http://localhost:5000/api/export/pdf',
    params={'data_inicio': '2025-11-01'},
    stream=True
)
with open('relatorio.pdf', 'wb') as f:
    f.write(response.content)
```

---

## 🧪 Exemplos com JavaScript

```javascript
// Login
async function login(username, password) {
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  return response.json();
}

// Obter dados
async function getDados() {
  const response = await fetch('/api/dados');
  return response.json();
}

// Exportar PDF
async function exportarPDF(dataInicio, dataFim) {
  const url = new URL('/api/export/pdf', window.location.origin);
  url.searchParams.append('data_inicio', dataInicio);
  url.searchParams.append('data_fim', dataFim);
  
  window.location.href = url;
}
```

---

## 📊 Dados de Exemplo

### Estrutura de Aluno
```json
{
  "id": 1,
  "nome": "João Silva",
  "matricula": "2024001",
  "email": "joao@email.com",
  "turma": "4º SENAI",
  "presenca": 90,
  "engajamento": 85,
  "nota": 8.5,
  "status_risco": false,
  "data_cadastro": "2025-01-15T10:30:00"
}
```

### Estrutura de Alerta
```json
{
  "id": 1,
  "aluno_id": 5,
  "tipo": "Desatenção",
  "severidade": "alto",
  "mensagem": "Aluno dormindo em sala",
  "data": "2025-11-12T14:30:00",
  "resolvido": false,
  "timestamp": 1699785000
}
```

### Estrutura de Detecção
```json
{
  "id": 1,
  "aluno_id": 1,
  "timestamp": "2025-11-12T14:35:42",
  "confianca": 0.98,
  "emocao": "neutro",
  "olhar_direcao": "frontal",
  "x": 250,
  "y": 150,
  "width": 50,
  "height": 80
}
```

---

## 🔄 Fluxo de Dados

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
   POST/GET
       │
       ▼
┌─────────────────────────┐
│   Flask Backend         │
│  - Autenticação         │
│  - Processamento        │
│  - APIs                 │
└──────┬──────────────────┘
       │
      SQL
       │
       ▼
┌─────────────────────────┐
│   Database              │
│  - Alunos               │
│  - Detecções            │
│  - Alertas              │
│  - Relatórios           │
└─────────────────────────┘
```

---

## 📈 Métricas de Performance

**Tempos de resposta esperados:**
- Login: < 200ms
- GET /api/dados: < 500ms
- GET /api/alertas: < 300ms
- GET /api/camera: < 100ms
- GET /api/export/pdf: < 5000ms (pode ser longo)

---

## 🔐 Segurança Recomendada

### Headers de Segurança
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
```

### CORS
```python
CORS(app, supports_credentials=True, 
     allow_headers=['Content-Type'],
     expose_headers=['Content-Range'])
```

---

## 📞 Suporte

Para dúvidas sobre a API, consulte:
- README.md
- CONFIG.md
- EQUIPE.md

Última atualização: 12 de novembro de 2025
