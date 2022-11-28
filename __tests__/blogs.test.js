const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

// Dummy user for testing
const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345',
};

describe('blog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('GET api/v1/blogs should return a list of blogs', async () => {
    const resp = await request(app).get('/api/v1/blogs');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "body": "Freegan hot chicken small batch, copper mug mustache pug JOMO. Kickstarter waistcoat actually ethical lo-fi, butcher hella stumptown. Roof party bitters woke chambray.",
          "id": "1",
          "title": "Underwater Basket Weaving - the new trend sweeping the nation",
        },
        Object {
          "body": "Shotgun approach. What are the expectations gain traction criticality dunder mifflin.",
          "id": "2",
          "title": "My Thoughts",
        },
        Object {
          "body": "I have printed it out, but the animated gif is not moving could you do an actual logo instead of a font",
          "id": "3",
          "title": "What you need to know about Crypto",
        },
      ]
    `);
  });

  it('GET api/v1/blogs/:id should return the blog with nested comments', async () => {
    const resp = await request(app).get('/api/v1/blogs/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "body": "Freegan hot chicken small batch, copper mug mustache pug JOMO. Kickstarter waistcoat actually ethical lo-fi, butcher hella stumptown. Roof party bitters woke chambray.",
        "comments": Array [
          Object {
            "detail": "Awesome blog!",
            "id": "1",
            "user_id": "1",
          },
          Object {
            "detail": "This is a terrible take.",
            "id": "2",
            "user_id": "2",
          },
          Object {
            "detail": "Love it!",
            "id": "3",
            "user_id": "3",
          },
        ],
        "id": "1",
        "title": "Underwater Basket Weaving - the new trend sweeping the nation",
      }
    `);
  });

  // it('POST /api/v1/blogs/:id/comments should create a new review when logged in', async () => {
  //   const agent = request.agent(app);
  //   await UserService.create(mockUser);
  //   await agent
  //     .post('/api/v1/users/sessions')
  //     .send({ email: mockUser.email, password: mockUser.password });
  //   const resp = await agent
  //     .post('/api/v1/blogs/1/comments')
  //     .send({ detail: 'This is a new comment' });
  //   expect(resp.status).toBe(200);
  //   expect(resp.body).toMatchInlineSnapshot();
  // });

  // it('POST /api/v1/blogs/:id/comments should return a 401 if not authenticated', async () => {
  //   const resp = await request(app)
  //     .post('/api/v1/blogs/1/comments')
  //     .send({ detail: 'this should NOT save' });
  //   expect(resp.status).toBe(401);
  // });
});
