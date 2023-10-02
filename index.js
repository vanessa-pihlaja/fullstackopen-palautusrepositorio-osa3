const express = require('express')
const app = express()
const morgan = require('morgan');
const cors = require('cors')

app.use(cors())


app.use(express.json());

app.use(morgan('tiny'));


morgan.token('req-body', (req) => JSON.stringify(req.body));

app.use(
  morgan(
    ':method :url :status :response-time ms - :req-body',
     {
       skip: (req) => req.method !== 'POST',
     }
  )
);

let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
      }
  ]

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
  });
  
  app.get('/api/persons', (request, response) => {
    response.json(persons);
  });

  app.get('/info', (req, res) => {
    const requestTime = new Date();
    const count = persons.length;
    res.send(`<p>Phonebook has info for ${count} people.</p><p>${requestTime}</p>`);
  });

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    };
  });

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1;
  };
  
  app.post('/api/persons', (request, response) => {
    const body = request.body;
  
    if (!body.name || !body.number ) {
      return response.status(400).json({ 
        error: 'name or numebr missing'
      });
    } else if (persons.find(person => person.name === body.name)) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    };
  
    persons = persons.concat(person);
  
    response.json(person);
  });

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);
  
    response.status(204).end();
  });
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });