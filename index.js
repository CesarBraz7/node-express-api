const express = require('express');
const app = express();

const alunos = [];

app.use(express.json());

app.get('/alunos', (req, res) => {
    res.json(alunos); //retornando uma lista de alunos
});

app.post('/alunos', (req, res) => {
    const aluno = req.body;
    const nextId = alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1; //caso a lista seja maior que 0, vamos pegar id do ultimo aluno e adicionar mais um, sendo o nosso novo id que vai ser atribuido. senao, o id sera 1.
    aluno.id = nextId; //atribuindo ao aluno o proximo id da lista
    alunos.push(aluno); //colocando o aluno criado dentro da lista de alunos
    res.json(alunos); //retornando o json com a lista de alunos
});

app.put('/alunos/:id', (req, res) => {
    const id = req.params.id; //recebendo o id passado como parametro na url
    const alunoAtualizado = req.body; //atributos atualizado
    const alunoIndex = alunos.findIndex(aluno => aluno.id == id); //encontrando o aluno com id igual ao id passado na url

    if (alunoIndex >= 0) {
        alunos[alunoIndex] = alunoAtualizado; //o aluno com o id escolhido receberá os novos atributos
        res.json({ message: 'Produto atualizado com sucesso!' });
    } else {
        res.status(404).json({ message: 'Produto não encontrado!' });
    }
})

app.delete('/alunos/:id', (req, res) => {
    const id = req.params.id; //recebendo o id passado como parametro na url
    const alunoIndex = alunos.findIndex(aluno => aluno.id == id); //encontrando o aluno com id igual ao id passado na url
  
    if (alunoIndex >= 0) { //se a posição do aluno for maior ou igual a 0, a condição será executada
      alunos.splice(alunoIndex, 1); //remove o aluno da lista de alunos
      res.json({ message: 'Produto excluído com sucesso!' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado!' });
    }
  });
  

app.listen(3000, ()=> {
    console.log('servidor rodando...');
})