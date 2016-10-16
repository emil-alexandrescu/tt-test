import UserController from '../user';

describe('Server', () => describe('Controllers', () => describe('UserController', () => {
  let sandbox;
  let controller;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    controller = new UserController();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be defined', () => {
    expect(controller).to.be.defined;
  });

  it('should be able to get user info by id when user is MANAGER', (done) => {
    const findStub = sandbox.stub(controller._db.User, 'findById').returns(Promise.resolve({ id: 1 }));
    const fakeReq = {
      user: { role: 'MANAGER' }
    };
    const sendStub = sandbox.stub().returns(Promise.resolve({}));
    const fakeRes = {
      status: () => {
        send: sendStub
      }
    };
    const next = sandbox.stub().returns(Promise.resolve({}));

    controller.getByID(fakeReq, fakeRes, next, 1).then(() => {
      expect(next).to.be.called;
      expect(fakeReq.profile).to.be.defined;
      done();
    });
  });

  it('should not be able to get user info by id when user role is MANAGER and id is not same', (done) => {
    const findStub = sandbox.stub(controller._db.User, 'findById').returns(Promise.resolve({ id: 1 }));
    const fakeReq = {
      user: { role: 'USER', id: 2 }
    };
    const sendStub = sandbox.stub().returns(Promise.resolve({}));
    const fakeRes = {
      status: () => ({
        send: sendStub
      })
    };
    const next = sandbox.stub().returns(Promise.resolve({}));

    controller.getByID(fakeReq, fakeRes, next, 1).then(() => {
      expect(sendStub).to.be.called;
      expect(sendStub.args[0][0].message).to.be.eql('You are not authorized');
      done();
    });
  });
})));
