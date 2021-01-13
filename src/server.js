import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,
    models: {
      notes: Model,
    },
    seeds(server) {
      server.create('note', {
        title: 'Nulla sit amet',
        body:
          'Praesent congue erat at massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque commodo eros a enim. Nunc interdum lacus sit amet orci.',
      });
      server.create('note', {
        title: 'Curabitur suscipit suscipit',
        body:
          'Fusce risus nisl, viverra et, tempor et, pretium in, sapien. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Praesent nec nisl a purus blandit viverra.',
      });
      server.create('note', {
        title: 'Donec id justo',
        body:
          'Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Curabitur suscipit suscipit tellus. Praesent ac sem eget est egestas volutpat. Pellentesque posuere.',
      });
    },
    routes() {
      this.get('/notes', (schema, request) => {
        return schema.notes.all();
      });

      this.get('/notes/:id', (schema, request) => {
        let id = request.params.id;

        return schema.notes.find(id);
      });

      this.post('/notes', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);

        return schema.notes.create(attrs);
      });

      this.patch('/notes/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let note = schema.notes.find(id);

        return note.update(newAttrs);
      });

      this.delete('/notes/:id', (schema, request) => {
        let id = request.params.id;

        return schema.notes.find(id).destroy();
      });
    },
  });
  return server;
}
