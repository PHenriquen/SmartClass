# Configuração do Projeto SmartClass

## Variáveis de Ambiente

### Desenvolvimento
```bash
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=dev-secret-key-change-in-production
```

### Produção
```bash
FLASK_ENV=production
FLASK_DEBUG=False
SECRET_KEY=<gerar-chave-segura>
```

## Gerar SECRET_KEY Segura

```python
import secrets
print(secrets.token_hex(32))
```

## Configurações de Servidor

### Desenvolvimento (Flask)
```bash
python app.py
# Acesso: http://localhost:5000
```

### Produção (Gunicorn)
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

## Dependências Principais

- Flask 2.x
- Werkzeug (session management)
- Chart.js 3.9.1 (CDN)
- DataTables 1.13.6 (CDN)
- Lucide Icons (CDN)
- Poppins Font (Google Fonts)

## Estrutura de Resposta da API

### Status Codes
- 200: OK
- 401: Não autenticado
- 403: Não autorizado
- 404: Não encontrado
- 500: Erro interno do servidor

### Formato de Resposta
```json
{
  "status": "success|error",
  "data": {},
  "message": "Descrição da resposta"
}
```

## Segurança

### Implementar em Produção
- [ ] HTTPS/SSL
- [ ] CSRF Protection
- [ ] Rate Limiting
- [ ] Input Validation
- [ ] SQL Injection Prevention
- [ ] XSS Protection
- [ ] Secure Cookies
- [ ] Helmet Headers

### Exemplo de Segurança em Flask
```python
from flask_talisman import Talisman
from flask_limiter import Limiter

Talisman(app)
limiter = Limiter(app)
```

## Performance

### Otimizações Implementadas
- [x] CSS Minificação (produção)
- [x] Lazy Loading de Imagens
- [x] CDN para bibliotecas externas
- [x] Cache de Assets Estáticos
- [ ] Compression de respostas
- [ ] Database Query Optimization
- [ ] Redis Cache

### Métricas
- Tempo de carregamento: < 2s
- First Contentful Paint: < 1s
- Lighthouse Score: > 90

## Testes

```bash
# Instalar pytest
pip install pytest pytest-cov

# Executar testes
pytest tests/ -v

# Com cobertura
pytest tests/ --cov=. --cov-report=html
```

## CI/CD

### GitHub Actions (exemplo)
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.9'
      - run: pip install -r requirements.txt
      - run: pytest
```

## Logs

### Configurar Logging
```python
import logging

logging.basicConfig(
    filename='app.log',
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
```

## Backup

### Banco de Dados
```bash
# SQLite
cp database.db database.db.backup

# PostgreSQL
pg_dump database_name > backup.sql
```

---

Última atualização: 12 de novembro de 2025
