const loginForm = document.getElementById('login-form');
const origemInput = document.getElementById('origem');
const loginInput = document.getElementById('login');
const senhaInput = document.getElementById('senha');
const salvarSenhaButton = document.getElementById('salvar-senha');
const gerarSenhaEspecialButton = document.getElementById('gerar-senha-especial');
const senhaSalvaDiv = document.getElementById('senha-salva');

let senhasSalvas = [];

// Função para gerar senha aleatória com caracteres especiais
function gerarSenhaEspecial() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()_+-={}:<>?';
  const senhaLength = 12; // Tamanho da senha gerada
  let senhaEspecial = '';
  for (let i = 0; i < senhaLength; i++) {
    senhaEspecial += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return senhaEspecial;
}

gerarSenhaEspecialButton.addEventListener('click', () => {
  const senhaEspecial = gerarSenhaEspecial();
  senhaInput.value = senhaEspecial;
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const origem = origemInput.value;
  const login = loginInput.value;
  const senha = senhaInput.value;
  senhasSalvas.push({ origem, login, senha });
  const senhaSalvaItem = document.createElement('div');
  senhaSalvaItem.className = 'senha-salva-item';
  senhaSalvaItem.innerHTML = `
    <p>Origem: ${origem} - Login: ${login} - Senha: <span class="senha-oculta">********</span></p>
    <button class="copiar-senha-button" data-senha="${senha}">Copiar Senha</button>
    <button class="excluir-senha-button" data-index="${senhasSalvas.length - 1}">Excluir</button>
  `;
  senhaSalvaDiv.appendChild(senhaSalvaItem);
  origemInput.value = '';
  loginInput.value = '';
  senhaInput.value = '';
});

senhaSalvaDiv.addEventListener('click', (e) => {
  if (e.target.classList.contains('copiar-senha-button')) {
    const senha = e.target.getAttribute('data-senha');
    navigator.clipboard.writeText(senha);
    alert('Senha copiada!');
  } else if (e.target.classList.contains('excluir-senha-button')) {
    const index = e.target.getAttribute('data-index');
    const senhaSalva = senhasSalvas[index];
    if (confirm(`Você realmente deseja excluir a senha para ${senhaSalva.origem} - ${senhaSalva.login}?`)) {
      senhasSalvas.splice(index, 1);
      e.target.parentNode.remove();
      localStorage.setItem('senhasSalvas', JSON.stringify(senhasSalvas));
      alert('Senha excluída!');
    }
  }
});

salvarSenhaButton.addEventListener('click', () => {
  const origem = origemInput.value;
  const login = loginInput.value;
  const senha = senhaInput.value;
  senhasSalvas.push({ origem, login, senha });
  localStorage.setItem('senhasSalvas', JSON.stringify(senhasSalvas));
  alert('Senha salva!');
});

window.addEventListener('load', () => {
  const storedSenhas = localStorage.getItem('senhasSalvas');
  if (storedSenhas) {
    senhasSalvas = JSON.parse(storedSenhas);
    senhasSalvas.forEach((senhaSalva, index) => {
      const senhaSalvaItem = document.createElement('div');
      senhaSalvaItem.className = 'senha-salva-item';
      senhaSalvaItem.innerHTML = `
        <p>Origem: ${senhaSalva.origem} - Login: ${senhaSalva.login} - Senha: <span class="senha-oculta">********</span></p>
        <button class="copiar-senha-button" data-senha="${senhaSalva.senha}">Copiar Senha</button>
        <button class="excluir-senha-button" data-index="${index}">Excluir</button>
      `;
      senhaSalvaDiv.appendChild(senhaSalvaItem);
    });
  }
});
