# Cadastro de carros

**REQUISITOS FUNCIONAIS**
- Deve ser possivel cadastrar um novo carro
- Deve ser possivel listar todas as categorias
**REQUISITOS NAO FUNCIONAIS**
-
**REGRA DE NEGOCIO**
- Não deve ser possivel cadastrar um carro com uma placa já existente
- Não deve ser possivel alterar a placa de um carro já cadastrado
- O carro deve ser cadastrato com disponibilidade por default
- Somente um usuario adm pode realizar o cadastro de um carro

# Listagem de carros

**REQUISITOS FUNCIONAIS**
- Deve ser possivel listar todos os carros disponiveis
- Deve ser possivel listar todos os carros disponiveis pelo nome da categoria
- Deve ser possivel listar todos os carros disponiveis pelo nome da marca
- Deve ser possivel listar todos os carros disponiveis pelo nome do carro
**REQUISITOS NAO FUNCIONAIS**
-
**REGRA DE NEGOCIO**
- O usuario não precisa estar logado no sistema

# Cadastro de especificação do carro

**REQUISITOS FUNCIONAIS**
- Deve ser possivel cadastrar uma especificação para um carro
- Deve ser possivel listar todas as especificações
- Deve ser possivel listar todos os carros
**REQUISITOS NAO FUNCIONAIS**
-
**REGRA DE NEGOCIO**
- Não deve ser possivel cadastrar uma especificação para um carro não cadastrado
- Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro
- Somente um usuario adm pode realizar o cadastro de uma especificação

# Cadastro de imagens do carro

**REQUISITOS FUNCIONAIS**
- Deve ser possível cadastrar a imagem do carro
- Deve ser possível listar todos os carros
**REQUISITOS NAO FUNCIONAIS**
- Utilizar o multer para upload dos arquivos
**REGRA DE NEGOCIO**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- Somente um usuario adm pode realizar o cadastro de uma imagem

# Aluguel de carro

**REQUISITOS FUNCIONAIS**
- Deve ser possível cadastrar um aluguel
**REQUISITOS NAO FUNCIONAIS**
-
**REGRA DE NEGOCIO**
- O aluguel deve ter duração minima de 24hrs
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro