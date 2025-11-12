try:
    from flask import Flask, render_template, jsonify, request, session, redirect, url_for
    from datetime import datetime, timedelta
except ImportError as e:
    raise ImportError(f"Dependências não instaladas: {e}") from None

import random
import json
from functools import wraps

app = Flask(__name__)
app.secret_key = "seu_secret_key_aqui_mude_em_producao"
# Modo de demonstração: quando True, permite acesso público ao /dashboard
# (útil para apresentações). Em produção, defina como False e proteja as rotas.
DEMO_MODE = True

# Lista da equipe — edite conforme necessário
TEAM = [
    "Pedro Henrique Nogueira",
    "Bruno Allan",
    "Arthur Bernado",
    "Gabriel Andrade",
    "Eduardo Perdigão"
]

# Dados simulados de usuários
USUARIOS_DB = {
    "professor": {"senha": "prof123", "role": "professor", "nome": "Prof. Joaquim"},
    "diretor": {"senha": "dir123", "role": "diretor", "nome": "Dir. Maria"},
    "admin": {"senha": "admin123", "role": "admin", "nome": "Admin Sistema"}
}

# Decorador para proteger rotas
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Em modo demo, permitir acesso público ao dashboard (apenas a rota HTML)
        if DEMO_MODE and request.path == '/dashboard':
            return f(*args, **kwargs)

        if 'usuario' not in session:
            # Se for uma chamada API / JSON, retornar 401 JSON; caso contrário redirecionar para a página de login
            if request.path.startswith('/api') or request.is_json:
                return jsonify({"erro": "Não autenticado"}), 401
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function


@app.route("/")
def index():
    # Redireciona diretamente para o dashboard (comportamento demonstrativo);
    # o decorator `login_required` lidará com redirecionamento para login quando necessário.
    return redirect(url_for('dashboard'))


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        usuario = request.json.get("usuario")
        senha = request.json.get("senha")
        
        # Aceita qualquer usuário/senha, atribui papel padrão
        if usuario and senha:
            session['usuario'] = usuario
            session['role'] = 'professor'  # Papel padrão
            session['nome'] = usuario.capitalize()
            return jsonify({"sucesso": True, "role": 'professor'})
        return jsonify({"erro": "Preencha usuário e senha"}), 400
    
    return render_template("login.html")


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for('login'))


@app.route("/dashboard")
def dashboard():
    # Passa a lista de equipe para o template para exibição no sidebar/footer
    return render_template("dashboard.html", usuario=session.get('nome'), role=session.get('role'), team=TEAM)


@app.route("/api/dados")
@login_required
def api_dados():
    alunos_nom = [
        "Ana Silva", "Bruno Souza", "Carla Pereira", "Diego Lima", "Eva Rocha",
        "Lucas Martins", "Mariana Alves", "Thiago Costa", "Rafael Dias", "Paula Ramos"
    ]

    alunos = []
    for i, n in enumerate(alunos_nom):
        nota = round(random.uniform(5.0, 10.0), 1)
        pres = random.randint(60, 100)
        eng = random.randint(50, 100)
        alunos.append({
            "id": i + 1,
            "nome": n,
            "presenca": pres,
            "engajamento": eng,
            "nota": nota,
            "risco": nota < 6.5 or pres < 70
        })

    dados = {
        "presenca": sum(a['presenca'] for a in alunos) // len(alunos),
        "engajamento": sum(a['engajamento'] for a in alunos) // len(alunos),
        "nota_media": round(sum(a['nota'] for a in alunos) / len(alunos), 2),
        "alunos_risco": sum(1 for a in alunos if a['risco']),
        "evolucao": [random.randint(60, 100) for _ in range(8)],
        "engajamento_turmas": [random.randint(60, 100) for _ in range(5)],
        "presenca_pizza": [random.randint(70, 100), random.randint(0, 30)],
        "alunos": alunos,
        "alertas": gerar_alertas(alunos),
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }
    return jsonify(dados)


@app.route("/api/alertas")
@login_required
def api_alertas():
    alertas = [
        {"id": 1, "tipo": "presenca", "msg": "3 alunos abaixo de 70%", "severidade": "alto", "data": datetime.now().isoformat()},
        {"id": 2, "tipo": "nota", "msg": "2 alunos com nota < 6.0", "severidade": "alto", "data": datetime.now().isoformat()},
        {"id": 3, "tipo": "engajamento", "msg": "Turma com baixo engajamento", "severidade": "medio", "data": datetime.now().isoformat()},
        {"id": 4, "tipo": "info", "msg": "Sincronização com câmera OK", "severidade": "baixo", "data": datetime.now().isoformat()},
    ]
    return jsonify(alertas)


@app.route("/api/camera")
@login_required
def api_camera():
    # Simula detecção facial com dados fictícios
    deteccoes = [
        {"pessoa": "Ana Silva", "confianca": 0.98, "hora": "09:15:32"},
        {"pessoa": "Bruno Souza", "confianca": 0.95, "hora": "09:18:45"},
        {"pessoa": "Carla Pereira", "confianca": 0.99, "hora": "09:22:10"},
    ]
    return jsonify({
        "status": "ativo",
        "fps": 24,
        "deteccoes_total": 3,
        "deteccoes": deteccoes,
        "timestamp": datetime.now().isoformat()
    })


@app.route("/api/export/<tipo>")
@login_required
def api_export(tipo):
    # Gera URLs de download para relatórios
    if tipo == "pdf":
        return jsonify({"url": "/api/export/pdf/download", "msg": "PDF gerado com sucesso"})
    elif tipo == "excel":
        return jsonify({"url": "/api/export/excel/download", "msg": "Excel gerado com sucesso"})
    return jsonify({"erro": "Tipo inválido"}), 400


def gerar_alertas(alunos):
    alertas = []
    alunos_risco = [a for a in alunos if a['risco']]
    
    if len(alunos_risco) >= 3:
        alertas.append({
            "id": 1,
            "tipo": "presenca",
            "msg": f"{len(alunos_risco)} alunos em situação de risco",
            "severidade": "alto"
        })
    
    nota_baixa = [a for a in alunos if a['nota'] < 6.0]
    if nota_baixa:
        alertas.append({
            "id": 2,
            "tipo": "nota",
            "msg": f"{len(nota_baixa)} alunos com nota insuficiente",
            "severidade": "alto"
        })
    
    return alertas


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)