import { randomUUID } from 'node:crypto';
import { Database } from '../database.js';
import { buildRoutePath } from '../utils/build-route-path.js';

const database = new Database();

export const routes = [
  {
    path: buildRoutePath('/users'),
    method: 'GET',
    handler: (req, res) => {
      const { search } = req.query;

      const users = database.select('users', search ? {
        name: search,
        email: search,
      } : null);

      return res.end(JSON.stringify(users));
    },
  },
  {
    path: buildRoutePath('/users'),
    method: 'POST',
    handler: (req, res) => {
      const { name, email } = req.body;

      const uuid = randomUUID();

      const user = { id: uuid, name, email };

      database.insert('users', user);

      return res.writeHead(201).end();
    },
  },
  {
    path: buildRoutePath('/users/:id'),
    method: 'PUT',
    handler: (req, res) => {
      const { name, email } = req.body;
      const { id } = req.params;

      database.update('users', id, { name, email });

      return res.writeHead(204).end();
    },
  },

  {
    path: buildRoutePath('/users/:id'),
    method: 'DELETE',
    handler: (req, res) => {
      const { id } = req.params;

      database.delete('users', id);

      return res.writeHead(204).end();
    },
  },
];
